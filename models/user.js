import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName: String,
    password: String,
});

export const userModel = mongoose.model('User', userSchema);