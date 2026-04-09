import mongoose from "mongoose"; 


export interface User extends mongoose.Document {
    name: string;
    email: string;
    password: string;
    role: string;
    isVerified: boolean;
    otp: string | null;
    otpExpiresAt: Date | null;
    isActive: boolean;
    refreshToken: string | null;
}

const userSchema = new mongoose.Schema<User>({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
       min: 6,
    },
    role:{
        type: String,
        default: "user",
    },
    isVerified: {
        type: Boolean,
        default: true,
    },
    otp: {
        type: String,
        default: null,
    },
    otpExpiresAt: {
        type: Date,
        default: null,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    refreshToken: {
        type: String,
        default: null,
    }
},
{
    timestamps: true,
});

export const User = mongoose.model<User>("User", userSchema);