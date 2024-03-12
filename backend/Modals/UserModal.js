const mongoose = require('mongoose')
const express = require('express')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
    Username:{
        type:String,
        required:[true,'please enter your username'],
        min:[5, 'username should at least be of 5 characters'],
        trim:true
    },
    email:{
        type:String,
        required:[true, 'please enter your email'],
        unique:true,
        lowercase:true,
        validate : [validator.isEmail, "please enter a valid email"]
    },
    photo:{
        type:String,
        default:"https://i.pinimg.com/564x/6f/6b/bb/6f6bbb16aec97391aefe120ec5a4e6a2.jpg"
    },
    phoneNumber: {
        type: String, // Store phone number as string
        required: [true, 'please enter your number'],
        validate: {
            validator: function(val) {
                return validator.isNumeric(val) && val.length === 10;
            },
            message: 'please enter a valid 10-digit number'
        }
    },
    
    password:{
        type:String,
        required:[true,' please enter your password'],
        minLength:[5, 'password should be of atleast 5 characters'],
        select:false
    },
    confirmPassword:{
        type:String,
        required:[true,' please enter your password'],
        validate:{
            validator : function(val){
                return val === this.password
            },
            message:'password and confirm password does not match '
        }
    },
    passwordChangedAt:Date,
    passwordResetToken:String,
    tokenExpire:Date,
    passwordChangedAt:Date,
    active:{
        type:Boolean,
        default:true
    }
})

userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) return next()

    this.password =await bcrypt.hash(this.password,12)
    this.confirmPassword = undefined;
    next()
})

userSchema.pre(/^find/, function(next) {
    // Modify the regular expression pattern and filter active users
    this.find({ active: true });
    next();
});

userSchema.methods.comparePassword = async function (pswd, dbpswd){
    return bcrypt.compare(pswd,dbpswd)
}

userSchema.methods.ResetPasswordToken =  function (){
    const resetToken = crypto.randomBytes(32).toString('hex')
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')
    this.tokenExpire = Date.now() +10 *60*1000
    console.log(resetToken, this.passwordResetToken)

    return resetToken
}


const user = mongoose.model('user',userSchema)
module.exports = user