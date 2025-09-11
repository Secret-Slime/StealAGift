import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    picked: {
        type: Boolean,
        default: false
    },
    receiver: {
        type: String,
    },
    gifts: {
        type: Array,
        default: []
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
});

export const User = mongoose.model("User", userSchema);
