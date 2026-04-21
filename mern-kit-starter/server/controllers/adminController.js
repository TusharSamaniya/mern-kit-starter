import { userModel as User } from "../models/userModel.js"
import { adminModel as Admin } from "../models/adminModel.js"
import { createAuthToken, hashPassword, sendAdminReplyMessage, sendBlockUserMail, sendDeleteAccountMail } from './utils/utils.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import { messageModel } from "../models/messageModel.js";


// @desc fetch all users from db
// @route POST /api/admin/getAllUserByAdminController
// @access adminOnly
export const getAllUserByAdminController = async (req, res) => {
    try {
        const user = await User.find()
        return res.status(200).json({
            success: true,
            message: 'all users fetched successfully',
            data: user,
            error: null
        })
    } catch (error) {

        return res.status(500).json(
            {
                success: false,
                message: error.message,
                error: error,
                data: null
            }
        )
    }
}

// @desc fetch users by id from db
// @route POST /api/admin/getUserById
// @access adminOnly
export const getUserById = async (req, res) => {
    const { id } = req.params
    try {
        const user = await User.findOne({ _id: id })
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'user not found',
                error: 'user not found'
            })
        };
        return res.status(200).json({
            success: true,
            message: 'user details fetched successfully',
            data: user,
            error: null
        })
    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: error.message,
                error: error,
                data: null
            }
        )
    }
}

// @desc Login Admin page
// @route POST /api/admin/login
// @access adminOnly
export const adminLoginController = async (req, res) => {
    // extracting data from request body
    const { email, password } = req.body;

    // converting email to lowercase to handle type o error
    const emailLower = email.toLowerCase();

    // checking all the pramerets are there or not
    if (!emailLower || !password) {
        return res.status(400).json({
            success: false,
            message: "Email and Password are mandatory",
            error: 'Email and Password are mandatory',
            data: null
        });
    };
    try {
        // find the admin
        const admin = await Admin.findOne({ email: emailLower });
        if (!admin) {
            return res.status(404).json({
                success: false,
                message: "User not found! Please create a new user with the same email",
                error: 'No user belongs to this email address',
                data: null
            });
        };
        // checking the password
        const match = await bcrypt.compare(password, admin.password);
        // logging in user if password matches
        if (match) {
            const options = {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
            }
            const { accessToken, refreshToken } = await createAuthToken(admin)
            // save refresh token in db 
            await Admin.updateOne({ _id: admin._id }, { refreshToken });

            return res.status(200)
                .cookie('accessToken', accessToken, options)
                .cookie('refreshToken', refreshToken, options)
                .json({
                    success: true,
                    message: "Logged in successfully",
                    data: null,
                    error: null
                })
        };
        // if password is invalid
        return res.status(401).json({
            success: false,
            message: "Invalid username or password please try again with correct credentials",
            data: null,
            error: 'Email or Password in not correct'
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
            error: error,
            data: null
        }
        )
    }
}

// @desc Login Admin page
// @route POST /api/admin/login
// @access adminOnly
export const getAdminController = async (req, res) => {
    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: 'login first',
            data: null,
            error: 'user not authenticated'
        });
    }

    const { id, email } = req.user;

    try {
        const admin = await Admin.findById(id).select(['-password']);
        return res.status(200).json(
            {
                success: true,
                message: 'User details retrieved',
                data: admin,
                error: null
            }
        );
    } catch (error) {
        return res.status(501).json({
            success: false,
            message: error.message,
            error: error,
            data: null
        });
    }
}

// @desc admin delete user
// @route POST /api/admin/deleteUser/:id
// @access adminOnly
export const adminDeleteUserController = async (req, res) => {
    const { id } = req.params
    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'User not found',
                data: null,
                error: 'User not found'
            });
        }

        await user.deleteOne({ id })
        sendDeleteAccountMail(user.email)
        return res.status(200).json({
            success: true,
            message: `${user.email} deleted successfully`,
            data: null,
            error: null
        })

    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: error.message,
                error: error,
                data: null
            }
        )
    }
}


// @desc Admin update user 
// @route POST /api/admin/updateUser/:id
// @access adminOnly
export const adminUpdateUserController = async (req, res) => {
    const { name, email, phone, verifiedUser, receiveEmails, receiveNotification, twoFactorAuth, isBlocked } = req.body;

    try {
        // Find the user by ID
        const user = await User.findById(req.params.id);

        // If user not found, send a 404 response
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
                data: null,
                error: 'user not found'
            });
        }

        // Update the user fields with the provided values
        if (verifiedUser !== undefined) user.verifiedUser = verifiedUser;
        if (receiveEmails !== undefined) user.receiveEmails = receiveEmails;
        if (receiveNotification !== undefined) user.receiveNotification = receiveNotification;
        if (twoFactorAuth !== undefined) user.twoFactorAuth = twoFactorAuth;
        if (isBlocked !== undefined) user.isBlocked = isBlocked;

        // Save the updated user
        await user.save();
        if (user.isBlocked) {
            sendBlockUserMail(user.email,)
        }
        // Respond with the updated user data
        return res.status(200).json({
            success: true,
            message: 'User updated successfully',
            data: user,
            error: null
        });
    } catch (error) {
        // Handle server error
        return res.status(500).json({
            success: false,
            message: error.message,
            error: error,
            data: null
        });
    }
};


// @desc admin create user
// @route POST /api/admin/createUser
// @access adminOnly
export const adminCreateAdminController = async (req, res) => {
    // Extracting data from request body
    const { name, email, phone, password, role } = req.body;
    const emailLower = email.toLowerCase();
    try {
        // Checking if all required fields are provided
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, Email, Password, Role are mandatory",
                data: null,
                error: 'Name, Emai and Password must be filled'
            });
        }

        // Check if user already exists
        let admin = await Admin.findOne({ email: emailLower });
        if (admin) {

            return res.status(409).json({
                success: false,
                message: `${email} is already registered`,
                data: null,
                error: `${email} is already registered`,
            });
        }

        // Check if phone number is already registered
        if (await Admin.findOne({ phone })) {
            return res.status(409).json({
                success: false,
                message: `${phone} is already registered`,
                error: `${phone} is already registered`,
                data: null
            });
        }

        // Create hashed password
        const hashedPassword = await hashPassword(password);

        // Create new user
        admin = await Admin.create({
            name,
            email: emailLower,
            phone,
            role: role,
            password: hashedPassword
        });
        return res.status(200).json({
            success: true,
            message: `${email} is created Admin for ${role}`,
            data: null,
            error: null
        });


    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
            error: error,
            data: null
        });
    }
};



// @desc admin refresh token 
// @route POST /api/admin/refreshToken
// @access adminOnly
export const refreshTokenController = async (req, res) => {

    const incomingRefreshToken = req.cookies.refreshToken;

    if (!incomingRefreshToken) {
        return res.status(403).json({
            success: false,
            message: 'Refresh token is required',
            error: 'refresh token is not available',
            data: null
        });
    }

    try {
        // Decode the refresh token
        const decoded = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);

        if (!decoded) {
            return res.status(403).json({
                success: false,
                message: 'Token is invalid'
            });
        }

        const { email, id } = decoded;

        // Retrieve user from the database
        const admin = await Admin.findById(id);
        if (!admin) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        if (incomingRefreshToken !== admin.refreshToken) {
            return res.status(401).json({
                success: false,
                message: 'Invalid refresh token'
            });
        }

        // Options for cookies
        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict'
        };

        // Generate new tokens
        const { accessToken, refreshToken } = await createAuthToken(admin);

        // Update the refresh token in the database
        await admin.updateOne({ refreshToken });

        return res.status(200)
            .cookie('accessToken', accessToken, options)
            .cookie('refreshToken', refreshToken, options)
            .json({
                success: true,
                message: "Token refreshed successfully"
            });

    } catch (error) {

        return res.status(403).json({
            success: false,
            message: error.message,
            error: error,
            data: null
        });
    }
};


// @desc admin logout controller
// @route POST /api/admin/logout
// @access adminOnly
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
                message: "User logged out successfully",
                data: null,
                error: null
            });
    }
    try {
        await Admin.findOneAndUpdate({ _id: id }, { refreshToken: null });

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
                message: "User logged out successfully",
                data: null,
                error: null
            });
    } catch (error) {
        return res.status(403).json({
            success: false,
            message: error.message,
            error: error.name,
            data: null
        })
    }
};


// @desc admin get all messages sent by user
// @route POST /api/admin/getAllMessages
// @access adminOnly
export const adminGetAllMesagesController = async (req, res) => {
    try {

        const messages = await messageModel.find()

        return res.status(200).json({
            success: true,
            message: 'All mesages fetched successfully',
            data: messages,
            error: null
        })
    } catch (error) {
        return res.status(403).json({
            success: false,
            message: error.message,
            error: error.name,
            data: null
        })
    }
};



// @desc admin get message by id
// @route POST /api/admin/getMessage/:id
// @access adminOnly
export const adminGetMesageByIdController = async (req, res) => {
    const { id } = req.params

    try {
        const getMessageById = await messageModel.findById(id).populate('repliedBY', 'email')

        if (!getMessageById) {
            return res.status(404).json({
                success: false,
                message: 'Message details not found',
                data: null,
                error: 'Invalid Message ID'
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Message details fetched successfully',
            data: getMessageById,
            error: null
        })
    } catch (error) {
        return res.status(403).json({
            success: false,
            message: error.message,
            error: error.name,
            data: null
        })
    }
};


// @desc admin send reply user's message reply
// @route POST /api/admin/replyMessage
// @access adminOnly
export const adminReplyMesageController = async (req, res) => {
    const { id, repliedMessage } = req.body
    try {
        const message = await messageModel.findById(id)
        if (!message) {
            return res.status(404).json({
                success: false,
                message: 'Message not found',
                data: null,
                error: 'Invalid message ID'
            })
        }

        await message.updateOne({ repliedBY: req.user.id, repliedMessage, status: 'Replied' })
        sendAdminReplyMessage(message.email, repliedMessage, message.name)
        return res.status(200).json({
            success: true,
            message: 'Message Status Updated successfully',
            data: message,
            error: null
        })

    } catch (error) {
        return res.status(403).json({
            success: false,
            message: error.message,
            error: error.name,
            data: null
        })
    }
};



