import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import fs from "fs"
import { userModel as User } from '../models/userModel.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import dotenv from 'dotenv';
dotenv.config();
import {
    createAuthToken,
    createVerificationToken,
    generateOtp,
    hashPassword,
    sendAccountVerificationMail,
    sendChangeMailConfirmation,
    sendChangePhoneConfirmation,
    sendDeleteAccountMail,
    sendLoginOtpMail,
    sendRequestForgotPasswordMail
} from './utils/utils.js';
import logger from '../logger/index.js';

// @desc  Login user with password
// @method POST
// @route /api/auth/login
// @access public
export const loginController = async (req, res) => {
    // extracting data from request body
    const { email, password } = req.body;
    // logging information
    logger.auth({
        event: 'Login',
        status: 'attempted',
        reason: 'User login attempt',
        user: req.user?.email || req.body?.email || 'none'
    });
    // converting email to lowercase to handle type o error
    const emailLower = email.toLowerCase();

    // checking all the pramerets are there or not
    if (!emailLower || !password) {
        // logging information
        logger.auth({
            event: 'Login',
            status: 'Failed',
            reason: 'Missing email, name, or password',
            user: req.user?.email || req.body?.email || 'unknown'
        });
        return res.status(404).json({
            success: false,
            message: "Email and Password are mandatory"
        });
    };
    try {
        // find the user
        const user = await User.findOne({ email: emailLower });
        if (!user) {
            // logging information
            logger.auth({
                event: 'Login',
                status: 'Failed',
                reason: 'user not found',
                user: req.user?.email || req.body?.email || 'none'
            });
            return res.status(404).json({
                success: false,
                message: "User not found! Please create a new user with the same email"
            });
        };
        // check is the user is verified or not
        if (user.verifiedUser === false) {
            // if user is not verified then send him a verification email again
            // logging information
            logger.auth({
                event: 'Login',
                status: 'Failed',
                reason: 'user is not verified',
                user: req.user?.email || req.body?.email || 'none'
            });
            return res.status(404).json({
                success: false,
                message: "Please verify user via link sent on your email"
            });
        }
        // checking the password
        const match = await bcrypt.compare(password, user.password);
        // logging in user if password matches
        if (!match) {
            // if password is invalid
            // logging information
            logger.auth({
                event: 'Login',
                status: 'Failed',
                reason: 'password is invalid',
                user: req.user?.email || req.body?.email || 'none'
            });
            return res.status(401).json({
                success: false,
                message: "Invalid username or password please try again with correct credentials"
            });
        };
        const cookieOtions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
        }
        if (user.isBlocked) {
            // logging information
            logger.auth({
                event: 'Login',
                status: 'Failed',
                reason: 'user is blocked',
                user: req.user?.email || req.body?.email || 'none'
            });
            return res.status(403).json({
                success: false,
                message: `User belongs to ${user.email} has been blocked by Admin! Please Contact Admin`
            })
        }
        if (user.twoFactorAuth) {
            // generate otp 
            const { otp, expiresAt } = await generateOtp()
            // create a verification token for user sending as cookies for auth
            const verificationToken = await createVerificationToken();
            // update user db after generating otp
            await user.updateOne({ otp: { code: otp, expiresAt: expiresAt }, verificationToken: verificationToken });
            // send otp to mail
            await sendLoginOtpMail(user.email, otp)
            // logging information
            logger.auth({
                event: 'Login',
                status: 'transfered',
                reason: 'otp sent successfully to mail',
                user: req.user?.email || req.body?.email || 'none'
            });
            return res.status(200)
                .cookie('verificationToken', verificationToken, cookieOtions)
                .json({
                    success: true,
                    message: `otp send to ${user.email}`,
                    step: 'OTP_PENDING'
                })
        }


        const { accessToken, refreshToken } = await createAuthToken(user)
        // update refresh token in user db
        await User.updateOne({ _id: user._id }, { refreshToken });
        // logging information
        logger.auth({
            event: 'Login',
            status: 'successful',
            reason: 'User logged in successfully',
            user: req.user?.email || req.body?.email || 'none'
        });
        return res.status(200)
            .cookie('accessToken', accessToken, cookieOtions)
            .cookie('refreshToken', refreshToken, cookieOtions)
            .json({
                success: true,
                message: "Logged in successfully",
                step: 'LOGIN_COMPLETE'
            })

    } catch (error) {
        // logging information
        logger.auth({
            event: `Login`,
            status: 'failed',
            reason: error.message,
            user: req.user?.email || req.body?.email || 'none'
        });
        return res.status(501).json({
            success: false,
            message: error.message,
            error: error.name
        })
    }

};

// @desc  verify otp and login
// @method POST
// @route /api/auth/verifyOtp
// @access private
export const otpLoginController = async (req, res) => {
    const { otp } = req.body;
    const { verificationToken } = req.cookies
    // logging information
    logger.auth({
        event: 'two factor authentication',
        status: 'attempted',
        reason: 'user attempted login with otp',
        user: req.user?.email || req.body?.email || 'none'
    });
    try {
        const user = await User.findOne({ verificationToken: verificationToken });
        if (!user) {
            // logging information
            logger.auth({
                event: 'two factor authentication',
                status: 'failed',
                reason: 'User not found',
                user: req.user?.email || req.body?.email || 'none'
            });
            return res.status(404).json({
                success: false,
                message: "User not found! Please create a new user with the same email"
            });
        };

        // Check if the OTP is valid and not expired

        if (user.otp.code == otp) {

            const { accessToken, refreshToken } = await createAuthToken(user)
            await user.updateOne({ refreshToken, otp: 'null' })

            const options = {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
            }
            // logging information
            logger.auth({
                event: 'two factor authentication',
                status: 'successful',
                reason: 'User logged in successfully',
                user: req.user?.email || req.body?.email || 'none'
            });
            return res.status(200)
                .cookie('accessToken', accessToken, options)
                .cookie('refreshToken', refreshToken, options)
                .json({
                    success: true,
                    message: "Logged in successfully",
                    step: 'LOGIN_COMPLETE'
                })
        }

        // logging information
        logger.auth({
            event: 'two factor authentication',
            status: 'failed',
            reason: 'invalid otp or expired',
            user: req.user?.email || req.body?.email || 'none'
        });
        return res.status(400).json({
            success: false,
            message: "Invalid or expired OTP."
        });
    } catch (error) {
        // logging information
        logger.auth({
            event: `two factor authentication`,
            status: `failed`,
            message: error.message,
            user: req.user?.email || req.body?.email || 'none'
        });
        return res.status(500).json({
            success: false,
            message: error.message,
            error: error.name
        });
    }
};


// @desc  Login user with password
// @method POST
// @route /api/auth/signup
// @access public
export const signupController = async (req, res) => {

    // Parse the request body (if sent as a string) into an object
    req.body = JSON.parse(req.body.creds);
    // logging information
    logger.auth({
        event: 'Signup',
        status: 'Failed',
        reason: 'User signup attempt',
        user: req.user?.email || req.body?.email || 'none'
    });

    // Extracting data from request body
    const { name, email, phone, password } = req.body;

    const emailLower = email.toLowerCase();
    try {
        // Checking if all required fields are provided
        if (!name || !email || !password) {
            if (req.file && req.file.path) {
                fs.unlinkSync(req.file.path); // Remove the uploaded file if it exists
            }
            // logging information
            logger.auth({
                event: 'Signup',
                status: 'Failed',
                reason: 'Missing name or email or password',
                user: req.user?.email || req.body?.email || 'none'
            });
            return res.status(400).json({
                success: false,
                message: "Name, Email, and Password are mandatory"
            });
        }

        // Check if user already exists
        let user = await User.findOne({ email: emailLower });
        if (user) {
            if (req.file && req.file.path) {
                fs.unlinkSync(req.file.path); // Remove the uploaded file if it exists
            }
            // logging information
            logger.auth({
                event: 'Signup',
                status: 'Failed',
                reason: 'User email already registered',
                user: req.user?.email || req.body?.email || 'none'
            });
            return res.status(409).json({
                success: false,
                message: `${email} is already registered`
            });
        }

        // Check if phone number is already registered
        if (await User.findOne({ phone })) {
            if (req.file && req.file.path) {
                fs.unlinkSync(req.file.path); // Remove the uploaded file if it exists
            }
            // logging information
            logger.auth({
                event: 'Signup',
                status: 'Failed',
                reason: 'User phone already registered',
                user: req.user?.email || req.body?.email || 'none'
            });
            return res.status(409).json({
                success: false,
                message: `${phone} is already registered`
            });
        }

        // Create hashed password
        const hashedPassword = await hashPassword(password);
        // create verification token
        const verificationToken = await createVerificationToken();

        // Default profile image
        let profileImageUrl;

        // If a profile image is uploaded, upload it to Cloudinary
        if (req.file && req.file.path) {
            const uploadedImage = await uploadOnCloudinary(req.file.path);
            profileImageUrl = uploadedImage.secure_url;

            fs.unlinkSync(req.file.path);

        }

        // Create new user
        user = await User.create({
            name,
            email: emailLower,
            phone,
            profileImage: profileImageUrl,
            verificationToken,
            password: hashedPassword
        });

        // Send account verification email
        await sendAccountVerificationMail(email, verificationToken);
        // logging information

        logger.auth({
            event: 'Signup',
            status: 'successful',
            reason: 'user registered and link sent',
            user: req.user?.email || req.body?.email || 'none'
        });
        return res.status(200).json({
            success: true,
            message: `Verification link sent to ${email}`
        });

    } catch (error) {
        // logging information
        logger.auth({
            event: 'Signup',
            status: 'Failed',
            reason: error.message,
            user: req.user?.email || req.body?.email || 'none'
        });
        return res.status(500).json({
            success: false,
            message: error.message,
            error: error.name
        });
    }
};



// @desc verify mail
// @method POST
// @route /api/auth/verify
// @access public
export const verifyTokenController = async (req, res) => {
    // extracting data from request body
    const token = req.params.token
    try {
        // find the user using token 
        const user = await User.findOne({ verificationToken: token });
        // check the user is exists or not
        if (!user) {

            // logging information
            logger.auth({
                event: 'Token verificaiton',
                status: 'Failed',
                reason: 'User not found',
                user: req.user?.email || req.body?.email || 'none'
            });
            return res.status(403).json({
                success: false,
                message: 'Invalid token please try to signup first.'
            });
        }
        // check if user is already verified or not
        if (user.verifiedUser === true) {

            // logging information
            logger.auth({
                event: 'Token verificaiton',
                status: 'Failed',
                reason: 'User already verified',
                user: req.user?.email || req.body?.email || 'none'
            });
            return res.status(401).json({
                success: false,
                message: 'User already verified! Please login'
            });
        }
        // update the user verified status
        await user.updateOne({ verifiedUser: true, verificationToken: null });

        // logging information
        logger.auth({
            event: 'Token verificaiton',
            status: 'Success',
            reason: 'User verified successfully',
            user: req.user?.email || req.body?.email || 'none'
        });
        return res.status(200).json({
            success: true,
            message: 'User verified successfully',
        })
    } catch (error) {

        // logging information
        logger.auth({
            event: 'Token verificaiton',
            status: 'Failed',
            reason: error.message,
            user: req.user?.email || req.body?.email || 'none'
        });
        return res.status(501).json({
            success: false,
            message: error.message,
            error: error.name
        });
    }
};


// @desc update user password
// @method POST
// @route /api/auth/changePassword
// @access private 
export const changePasswordController = async (req, res) => {
    const { password, newPassword } = req.body;
    const email = req.user.email
    // logging information
    logger.auth({
        event: 'Change password',
        status: 'attempt',
        reason: 'user attempted change password',
        user: req.user?.email || req.body?.email || 'none'
    });
    if (!password || !newPassword || !email) {

        // logging information
        logger.auth({
            event: 'Change password',
            status: 'failed',
            reason: 'missing details password , new password or email',
            user: req.user?.email || req.body?.email || 'none'
        });
        return res.status(500).json({
            success: false,
            message: 'Password, New Password must be required'
        })
    };

    if (newPassword === password) {

        // logging information
        logger.auth({
            event: 'Change password',
            status: 'Failed',
            reason: 'User signup attempt',
            user: req.user?.email || req.body?.email || 'none'
        });
        return res.status(500).json({
            success: false,
            message: 'Old password and new password must be different'
        });
    }
    const user = await User.findOne({ email: email });
    if (!user) {

        // logging information
        logger.auth({
            event: 'Change password',
            status: 'Failed',
            reason: 'User not found',
            user: req.user?.email || req.body?.email || 'none'
        });
        return res.status(403).json({
            success: false,
            message: "User does not exist"
        });
    };
    const match = await bcrypt.compare(password, user.password);
    if (!match) {

        // logging information
        logger.auth({
            event: 'Change password',
            status: 'Failed',
            reason: 'current password is invalid',
            user: req.user?.email || req.body?.email || 'none'
        });
        return res.status(500).json({
            success: false,
            message: 'Current password is incorrect'
        });
    };
    try {
        const hashedPassword = await hashPassword(newPassword);
        const updatePassword = await User.updateOne({ email: email }, { password: hashedPassword });
        if (updatePassword) {

            // logging information
            logger.auth({
                event: 'Change password',
                status: 'success',
                reason: 'password change successful',
                user: req.user?.email || req.body?.email || 'none'
            });
            return res.status(200).json({
                success: true,
                message: 'Password Changed successfully'
            });
        }

    } catch (error) {

        // logging information
        logger.auth({
            event: 'change password',
            status: 'Failed',
            reason: error.message,
            user: req.user?.email || req.body?.email || 'none'
        });
        return res.status(501).json({
            success: false,
            message: error.message,
            error: error.name
        });
    };
};


// @desc request for reset user password
// @method POST
// @route /api/auth/forgotPassword
// @access public
export const requestForgotPasswordController = async (req, res) => {
    const { email } = req.body;
    // logging information
    logger.auth({
        event: 'Forgot password request',
        status: 'Attempt',
        reason: 'User request for forgot password',
        user: req.user?.email || req.body?.email || 'none'
    });
    if (!email) {

        // logging information
        logger.auth({
            event: 'Forgot password request',
            status: 'Failed',
            reason: 'missing field email',
            user: req.user?.email || req.body?.email || 'none'
        });
        return res.status(401).json({
            success: false,
            message: 'Please enter your registered email address'
        });
    };
    try {
        const user = await User.findOne({ email: email });
        if (!user) {

            // logging information
            logger.auth({
                event: 'Forgot password request',
                status: 'Failed',
                reason: 'User not found',
                user: req.user?.email || req.body?.email || 'none'
            });
            return res.status(401).json({
                success: false,
                message: 'Account not found with this email address'
            });
        };
        const generatedToken = await createVerificationToken();
        const storeToken = await User.updateOne({ email: email }, { verificationToken: generatedToken })
        const sendMailRequest = await sendRequestForgotPasswordMail(email, generatedToken);

        // logging information
        logger.auth({
            event: 'Forgot password request',
            status: 'Success',
            reason: 'Forgot password request received and link sent successfully',
            user: req.user?.email || req.body?.email || 'none'
        });
        return res.status(200).json({
            success: true,
            message: 'Check your email for reset password link'
        });
    } catch (error) {

        // logging information
        logger.auth({
            event: 'request forgot password link',
            status: 'Failed',
            reason: error.message,
            user: req.user?.email || req.body?.email || 'none'
        });
        return res.status(501).json({
            success: false,
            message: error.message,
            error: error.name
        });
    }


};


// @desc reset user password with token
// @method POST
// @route /api/auth/forgotPassword/:token
// @access private 
export const forgotPasswordController = async (req, res) => {
    const token = req.params.token;
    const { newPassword } = req.body;
    try {
        const hashedPassword = await hashPassword(newPassword);
        const updateUserPassword = await User.findOneAndUpdate({ verificationToken: token }, { password: hashedPassword, verificationToken: null });
        if (updateUserPassword) {
            // logging information
            logger.auth({
                event: 'Forgot password',
                status: 'Success',
                reason: 'Password reseted successfully',
                user: req.user?.email || req.body?.email || 'none'
            });
            return res.status(200).json({
                success: true,
                message: 'Password changed successfully',
            });
        };
        // logging information
        logger.auth({
            event: 'Forgot password',
            status: 'Failed',
            reason: 'Invalid user',
            user: req.user?.email || req.body?.email || 'none'
        });
        return res.status(401).json({
            success: false,
            message: 'Invalid User'
        });

    } catch (error) {

        // logging information
        logger.auth({
            event: 'Forgot password',
            status: 'Failed',
            reason: error.message,
            user: req.user?.email || req.body?.email || 'none'
        });
        return res.status(501).json({
            success: false,
            message: error.message,
            error: error.name
        });
    }



};


// @desc get logged in user details
// @method POST
// @route /api/auth/getUser
// @access private 
export const getUserController = async (req, res) => {
    const { id, email } = req.user;

    try {
        const userDetails = await User.findById(id).select(['-password', '-verificationToken', '-refreshToken']);
        return res.status(200).json(
            {
                success: true,
                message: 'User details retrieved',
                data: userDetails
            }
        );
    } catch (error) {

        // logging information
        logger.auth({
            event: 'get user details',
            status: 'Failed',
            reason: error.message,
            user: req.user?.email || req.body?.email || 'none'
        });
        return res.status(501).json({
            success: false,
            message: error.message,
            error: error.name
        });
    }
};


// @desc refresh expired access token
// @method POST
// @route /api/auth/refreshToken
// @access private
export const refreshTokenController = async (req, res) => {

    const incomingRefreshToken = req.cookies.refreshToken
    if (!incomingRefreshToken) {
        // logging information
        logger.auth({
            event: 'refresh token',
            status: 'Failed',
            reason: 'missing refresh token',
            user: req.user?.email || req.body?.email || 'none'
        });
        return res.status(403).json({
            success: false,
            message: 'Refresh token is required'
        })
    }
    try {
        // decode the refresh token
        const decoded = await jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);

        if (!decoded) {
            // logging information
            logger.auth({
                event: 'refresh token',
                status: 'Failed',
                reason: 'unable to decode refresh token',
                user: req.user?.email || req.body?.email || 'none'
            });
            return res.status(403).json({
                success: false,
                message: 'Token is invalid'
            })
        };
        // extract user and userId from the decoded token
        const { email, id } = decoded
        // retrieve user from db
        const user = await User.findById(id);
        // if user's incoming refresh token and stored token are not same, then
        if (incomingRefreshToken !== user.refreshToken) {

            // logging information
            logger.auth({
                event: 'refresh token',
                status: 'Failed',
                reason: 'token mismatch',
                user: req.user?.email || req.body?.email || 'none'
            });
            return res.status(401).json({
                success: false,
                message: 'Invalid refresh token'
            })
        }
        // user incoming refresh token and stored token are same
        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
        };
        // creating new tokens and store token in db 
        const { accessToken, refreshToken } = await createAuthToken(user)
        await user.updateOne({ refreshToken: refreshToken })

        return res.status(200)
            .cookie('accessToken', accessToken, options)
            .cookie('refreshToken', refreshToken, options)
            .json({
                success: true,
                message: "Token refreshed successfully",

            });

    } catch (error) {
        // logging information
        logger.auth({
            event: 'refresh token',
            status: 'Failed',
            reason: error.message,
            user: req.user?.email || req.body?.email || 'none'
        });
        return res.status(403).json({
            success: false,
            message: error.message,
            error: error.name
        })
    }
};


// @desc logout user
// @method POST
// @route /api/auth/logout
// @access private
export const logoutController = async (req, res) => {
    const { id } = req.body
    if (!id) {


        return res.status(200)
            .clearCookie('accessToken', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production'
            })
            .clearCookie('refreshToken', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production'
            })
            .json({
                success: true,
                message: "User logged out successfully"
            });
    }
    try {
        await User.findOneAndUpdate({ _id: id }, { refreshToken: null });

        return res.status(200)
            .clearCookie('accessToken', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production'
            })
            .clearCookie('refreshToken', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production'
            })
            .json({
                success: true,
                message: "User logged out successfully"
            });
    } catch (error) {

        // logging information
        logger.auth({
            event: 'Logout',
            status: 'Failed',
            reason: error.message,
            user: req.user?.email || req.body?.email || 'none'
        });
        return res.status(403).json({
            success: false,
            message: error.message,
            error: error.name
        })
    }
};


// @desc upadte user profile
// @method POST
// @route /api/auth/updateProfile
// @access private
export const updateprofileController = async (req, res) => {
    const { id, email } = req.user;
    req.body = JSON.parse(req.body.creds);

    try {
        const user = await User.findById(id);
        if (!user) {
            if (req.file && req.file.path) {
                fs.unlinkSync(req.file.path);
            }
            // logging information
            logger.auth({
                event: 'Update Profile',
                status: 'Failed',
                reason: 'User not found',
                user: req.user?.email || req.body?.email || 'none'
            });
            return res.status(404).json({
                success: false,
                message: 'User not found',
                data: null,
                error: 'User not found'
            });
        }

        // Upload profile image if provided
        let profileImageUrl = user.profileImage;
        // If a profile image is uploaded, upload it to Cloudinary
        if (req.file && req.file.path) {
            const uploadedImage = await uploadOnCloudinary(req.file.path);
            profileImageUrl = uploadedImage?.secure_url || profileImageUrl;

            // Delete local file after upload
            fs.unlinkSync(req.file.path);
        }
        // Update user fields
        user.set({
            name: req.body.name,
            profileImage: profileImageUrl
        });

        await user.save(); // Save changes

        // logging information
        logger.auth({
            event: 'Update Profile',
            status: 'Success',
            reason: 'Profile updated successfully',
            user: req.user?.email || req.body?.email || 'none'
        });
        return res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            data: user,
            error: null
        });

    } catch (error) {

        if (req.file && req.file.path) {
            fs.unlinkSync(req.file.path);
        }
        // logging information
        logger.auth({
            event: 'Update profile',
            status: 'Failed',
            reason: error.message,
            user: req.user?.email || req.body?.email || 'none'
        });
        return res.status(500).json({
            success: false,
            message: error.message,
            error: error.name,
        });
    }
};


// @desc upadte user settings
// @method POST
// @route /api/auth/updateSettings
// @access private
export const updateSettingsController = async (req, res) => {
    const { id, email } = req.user;
    const { receiveEmails, receiveNotification, twoFactorAuth } = req.body
    try {
        const user = await User.findById(id);
        if (!user) {
            // logging information
            logger.auth({
                event: 'Update settings',
                status: 'Failed',
                reason: 'User not found',
                user: req.user?.email || req.body?.email || 'none'
            });
            return res.status(404).json({
                success: false,
                message: 'User not found',
                error: 'User not found',
                data: null

            })
        }
        await user.updateOne({ receiveEmails, receiveNotification, twoFactorAuth });
        // logging information
        logger.auth({
            event: 'Update settings',
            status: 'Success',
            reason: 'Settings update successful',
            user: req.user?.email || req.body?.email || 'none'
        });
        return res.status(200).json({
            success: true,
            message: 'Settings updated successfully',
            data: user,
            error: null,
        })

    } catch (error) {

        // logging information
        logger.auth({
            event: 'update settings',
            status: 'Failed',
            reason: error.message,
            user: req.user?.email || req.body?.email || 'none'
        });
        return res.status(500).json({
            success: false,
            message: error.message,
            error: error.name,
            data: null
        });
    }
};

// @desc change phone
// @method PATCH
// @route /api/auth/changePhone
// @access private
export const changePhoneController = async (req, res) => {
    const { id } = req.user
    const { phone, password } = req.body
    try {


        const user = await User.findById(id)
        if (!user) {
            // logging information
            logger.auth({
                event: 'Update Phone',
                status: 'Failed',
                reason: 'User not found',
                user: req.user?.email || req.body?.email || 'none'
            });
            return res.status(404).json({
                success: true,
                message: 'User not Found',
                data: null,
                error: null
            })
        }
        const checkPhone = await User.findOne({ phone })
        if (phone === user.phone || checkPhone) {
            // logging information
            logger.auth({
                event: 'Update Phone',
                status: 'Failed',
                reason: 'Phone already exists',
                user: req.user?.email || req.body?.email || 'none'
            });
            return res.status(403).json({
                success: true,
                message: `${phone} is already in use`,
                data: null,
                error: null
            })
        }


        await user.updateOne({ phone })
        sendChangePhoneConfirmation(user.email, phone)
        // logging information
        logger.auth({
            event: 'Update Phone',
            status: 'Success',
            reason: 'Phone update successful',
            user: req.user?.email || req.body?.email || 'none'
        });
        return res.status(200).json({
            success: true,
            message: 'Email updated successfully',
            data: null,
            error: null
        })

    } catch (error) {

        // logging information
        logger.auth({
            event: 'update phone',
            status: 'Failed',
            reason: error.message,
            user: req.user?.email || req.body?.email || 'none'
        });
        return res.status(500).json({
            success: false,
            message: error.message,
            error: error.name,
            data: null
        });
    }
}

// @desc change mail
// @method PATCH
// @route /api/auth/changeEmail
// @access private
export const changeMailController = async (req, res) => {
    const { id } = req.user
    const { email } = req.body
    try {
        const user = await User.findById(id)
        if (!user) {
            // logging information
            logger.auth({
                event: 'Update Mail',
                status: 'Failed',
                reason: 'User not found',
                user: req.user?.email || req.body?.email || 'none'
            });
            return res.status(40).json({
                success: true,
                message: 'User not Found',
                data: null,
                error: null
            })
        }
        const checkEmail = await User.findOne({ email })
        if (email === user.email || checkEmail) {
            // logging information
            logger.auth({
                event: 'Update Mail',
                status: 'Failed',
                reason: 'Already already used',
                user: req.user?.email || req.body?.email || 'none'
            });
            return res.status(403).json({
                success: true,
                message: `${email} is already in use`,
                data: null,
                error: null
            })
        }

        sendChangeMailConfirmation(user.email, email)
        // const token = createVerificationToken()
        await user.updateOne({ email })

        // logging information
        logger.auth({
            event: 'Update Mail',
            status: 'Success',
            reason: 'Mail updated successfully',
            user: req.user?.email || req.body?.email || 'none'
        });
        return res.status(200).json({
            success: true,
            message: 'Email updated successfully',
            data: null,
            error: null
        })

    } catch (error) {

        // logging information
        logger.auth({
            event: 'update mail',
            status: 'Failed',
            reason: error.message,
            user: req.user?.email || req.body?.email || 'none'
        });
        return res.status(500).json({
            success: false,
            message: error.message,
            error: error.name,
            data: null
        });
    }
}


// @desc delete user account
// @method DELETE
// @route /api/auth/delete
// @access private
export const deleteUserController = async (req, res) => {

    const { id, email } = req.user
    const { password } = req.body
    try {

        const user = await User.findById(id)
        if (!user) {

            // logging information
            logger.auth({
                event: 'Delete Account',
                status: 'Failed',
                reason: 'User not found',
                user: req.user?.email || req.body?.email || 'none'
            });
            return res.status(40).json({
                success: true,
                message: 'User not Found',
                data: null,
                error: null
            })
        }

        const match = await bcrypt.compare(password, user.password);

        if (match) {
            await user.deleteOne()
            sendDeleteAccountMail(user.email)

            // logging information
            logger.auth({
                event: 'Delete Account',
                status: 'Failed',
                reason: 'Account deleted successfully',
                user: req.user?.email || req.body?.email || 'none'
            });
            return res.status(200).json({
                success: true,
                message: 'Account deleted successfully',
                data: null,
                error: null
            })
        }
        // logging information
        logger.auth({
            event: 'Delete Account',
            status: 'Failed',
            reason: 'Invalid password',
            user: req.user?.email || req.body?.email || 'none'
        });
        return res.status(401).json({
            success: false,
            message: "Invalid password please try again with correct credentials",
            data: null,
            error: null
        });
    } catch (error) {

        // logging information
        logger.auth({
            event: 'Delete account',
            status: 'Failed',
            reason: error.message,
            user: req.user?.email || req.body?.email || 'none'
        });
        return res.status(500).json({
            success: false,
            message: error.message,
            error: error.name,
            data: null
        });
    }
}
