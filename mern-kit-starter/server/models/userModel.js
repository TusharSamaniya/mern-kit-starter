import mongoose, { Schema } from "mongoose";


// create a user schema 
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        default: 'data:image/jpeg;base64,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'
    },
    verifiedUser: {
        type: Boolean,
        required: true,
        default: false,
    },
    verificationToken: {
        type: String,
    },
    refreshToken: {
        type: String
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
    receiveEmails: {
        type: Boolean,
        default: true,
    },
    twoFactorAuth: {
        type: Boolean,
        default: false,
    },
    receiveNotification: {
        type: Boolean,
        default: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
        immutable: true
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    otp: {
        code: String,
        expiresAt: Date
    },
},
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
        versionKey: false
    });


// index user for faster retrieval
UserSchema.index({ email: 1 });
UserSchema.index({ phone: 1 });
UserSchema.index({ verificationToken: 1 });


// Middleware to remove expired OTP
UserSchema.pre("save", function (next) {
    if (this.otp.expiresAt && this.otp.expiresAt < new Date()) {
        this.otp.code = null;
        this.otp.expiresAt = null;
    }
    next();
});

// Methods to check if the OTP is valid
// In User model (e.g., User.js)
UserSchema.methods.isOtpValid = function (submittedOtp) {
    // Check if OTP matches and hasn't expired
    return (
        this.otp === submittedOtp &&
        Date.now() <= this.otpExpires
    );
};


// create a model from user schema 
export const userModel = mongoose.model('user', UserSchema);
