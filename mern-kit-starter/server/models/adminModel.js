import mongoose, { Schema } from "mongoose";

// Create an admin schema 
const adminSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phone: {
            type: Number,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            enum: ["superAdmin", "userManager", "marketingManager"],
            required: true, 
        },
        refreshToken: {
            type: String
        }
    },
    {
        timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' },
        versionKey: false,
    }
);

// Index admin for faster retrieval
adminSchema.index({ email: 1 });
adminSchema.index({ phone: 1 });

// Create a model from the admin schema 
export const adminModel = mongoose.model('Admin', adminSchema);
