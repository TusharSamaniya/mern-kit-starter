import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import nodemailer from 'nodemailer';
import crypto from "crypto";
import dotenv from 'dotenv';
dotenv.config();

const baseUrl = process.env.BASE_URL;

// JWT Token Creation
export const createAuthToken = async (user) => {
    const accessToken = jwt.sign({ id: user._id, email: user.email },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_LIFETIME }
    );
    const refreshToken = jwt.sign({ id: user._id, email: user.email },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_LIFETIME }
    );

    return {
        accessToken,
        refreshToken,
    };
};

// Hash Password
export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

// Generate Verification Token
export const createVerificationToken = async () => uuidv4();

// Generate OTP
export const generateOtp = async () => {
    const otp = crypto.randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // Valid for 5 minutes
    return { otp, expiresAt };
};

// Reusable Email Sending Function
export const sendMail = async (receiverMail, mailType, data) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
        tls: {
            rejectUnauthorized: false,
        },
    });

    const subjects = {
        accountVerification: "Account Verification",
        forgotPassword: "Reset Your Password",
        blockUser: "Your Account Has Been Blocked",
        twoFactor: "Your Two-Factor Authentication Code",
        deleteAccount: "Account Deletion Confirmation",
        changeMail: "Email Change Confirmation",
        changePhone: "Phone Number Change Confirmation",
        loginOtp: "Your Login OTP Code",
        requestForgotPassword: "Forgot Password Request",
        adminReplyMessage: "Thanks for Your reaching out!",
        autoReplyMessage: "Thanks for Your reaching out!",
    };

    const templates = {
        accountVerification: `
            <h2>Verify Your Account</h2>
            <p>Thank you for signing up! Please verify your account by clicking the link below:</p>
            <a href="${baseUrl}/verify/${data.token}" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none;">Verify Account</a>
            <br><br>
            <p>If the button doesn't work, click this link: <a href="${baseUrl}/verify/${data.token}">${baseUrl}/verify/${data.token}</a></p>
        `,
        forgotPassword: `
            <h2>Reset Your Password</h2>
            <p>You can reset your password by clicking the link below:</p>
            <a href="${baseUrl}/forgotPassword/${data.token}" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none;">Reset Password</a>
            <br><br>
            <p>If the button doesn't work, click this link: <a href="${baseUrl}/forgotPassword/${data.token}">${baseUrl}/forgotPassword/${data.token}</a></p>
        `,
        blockUser: `
            <h2>Account Blocked</h2>
            <p>Your account has been blocked due to ${data.reason}. If you believe this is a mistake, please <a href="${baseUrl}/support/">${baseUrl}/verify/${data.token} contact support.</a></p>
        `,
        twoFactor: `
            <h2>Two-Factor Authentication Code</h2>
            <p>Your one-time verification code is:</p>
            <h3>${data.code}</h3>
            <p>This code will expire in 5 minutes. If you did not request this, please contact support immediately.</p>
        `,
        deleteAccount: `
            <h2>Account Deleted</h2>
            <p>Your account has been successfully deleted as per your request. If this was not initiated by you, please contact support immediately.</p>
        `,
        changeMail: `
            <h2>Email Change Confirmation</h2>
            <p>Your email address has been updated to: <b>${data.newEmail}</b>. If you did not request this change, please contact support immediately.</p>
        `,
        changePhone: `
            <h2>Phone Number Change Confirmation</h2>
            <p>Your phone number has been updated to: <b>${data.newPhone}</b>. If you did not request this change, please contact support immediately.</p>
        `,
        loginOtp: `
            <h2>Login OTP</h2>
            <p>Your one-time password for login is:</p>
            <h3>${data.otp}</h3>
            <p>This OTP will expire in 5 minutes. If you did not request this, please contact support immediately.</p>
        `,
        requestForgotPassword: `
        <h2>Forgot Password Request</h2>
        <p>You have requested to reset your password. Please click the link below to initiate the reset process:</p>
        <a href="${baseUrl}/forgotPassword/${data.token}" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none;">Reset Password</a>
        <br><br>
        <p>If you did not request this, please ignore this email.</p>
    `,
        autoReplyMessage: `
       <h2>Thank You for Reaching Out!</h2>
       <p>We have received your message and appreciate you contacting us. Our team is reviewing your inquiry and will get back to you as soon as possible.</p>
       <br><br>
       <p>If this was not you or you have any additional information to share, please feel free to reply to this email.</p>

    `,
        adminReplyMessage: `
        <h2>Response to Your Inquiry</h2>
        <p>Dear ${data.username},</p>
        <p>${data.repliedMessage}</p>
        <a href="${baseUrl}/contactUsSupport" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none;">Visit Support</a>
        <br><br>
        <p>If you have further questions or need additional assistance, feel free to reply to this email.</p>

    `,

    };

    try {
        await transporter.sendMail({
            from: `${process.env.YOUR_APP_NAME} <${process.env.EMAIL}>`,
            to: receiverMail,
            subject: subjects[mailType],
            html: templates[mailType],
        });
        console.log(`Email sent to ${receiverMail} for ${mailType}`);
    } catch (error) {
        console.error(`Error sending ${mailType} email:`, error);
    }
};

// Specific Email Actions
export const sendAccountVerificationMail = async (receiverMail, token) => {
    await sendMail(receiverMail, "accountVerification", { token });
};
export const sendRequestForgotPasswordMail = async (receiverMail, token) => {
    await sendMail(receiverMail, "requestForgotPassword", { token });
};

export const sendForgotPasswordMail = async (receiverMail, token) => {
    await sendMail(receiverMail, "forgotPassword", { token });
};

export const sendBlockUserMail = async (receiverMail, reason) => {
    await sendMail(receiverMail, "blockUser", { reason });
};

export const sendTwoFactorMail = async (receiverMail, code) => {
    await sendMail(receiverMail, "twoFactor", { code });
};

export const sendDeleteAccountMail = async (receiverMail) => {
    await sendMail(receiverMail, "deleteAccount", {});
};

export const sendChangeMailConfirmation = async (receiverMail, newEmail) => {
    await sendMail(receiverMail, "changeMail", { newEmail });
};

export const sendChangePhoneConfirmation = async (receiverMail, newPhone) => {
    await sendMail(receiverMail, "changePhone", { newPhone });
};

export const sendLoginOtpMail = async (receiverMail, otp) => {
    await sendMail(receiverMail, "loginOtp", { otp });
};
export const sendAutoReplyMessage = async (receiverMail,) => {
    await sendMail(receiverMail, "autoReplyMessage", {});
};
export const sendAdminReplyMessage = async (receiverMail, repliedMessage, username) => {
    await sendMail(receiverMail, "adminReplyMessage", { repliedMessage, username });
};