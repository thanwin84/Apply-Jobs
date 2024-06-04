import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    lastName: {
        type: String,
        default: 'lastName'
    },
    location: {
        type: String,
        default: "my city"
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: "user"
    }
})

userSchema.pre('save', async function(next){
    if (this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10)
        next()
    } else {
        next()
    }
})

userSchema.methods.isPasswordCorrect = async function(password){
    const response = await bcrypt.compare(password, this.password)
    return response
}

userSchema.methods.generateToken = function(){
    return jwt.sign(
        {
            userId:this._id,
            role: this.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN
        }
    )
}
export const User = mongoose.model('User', userSchema)