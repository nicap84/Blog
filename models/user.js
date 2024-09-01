import mongoose from "mongoose";
import bcrypt from "bcrypt";
import uniqueValidator from "mongoose-unique-validator";

// collection
const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
});

userSchema.plugin(uniqueValidator);

userSchema.pre('save', function(next){
    const user = this
    bcrypt.hash(user.password, 10, (error, hash) => {
    user.password = hash
    next()
    })
})

export const userModel = mongoose.model('User', userSchema);