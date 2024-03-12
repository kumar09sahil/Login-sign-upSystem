const User = require('../Modals/UserModal');
const jwt = require('jsonwebtoken')
const sendEmail = require('../utils/SendEmail')
const crypto = require('crypto')
const util = require('util')

const signinResponse = (user,statuscode,res)=>{
    const token = jwt.sign({id:user._id},process.env.SECRET_STR,{
        algorithm:'HS256',
        expiresIn: process.env.EXPIRES_IN
    })
    res.status(statuscode).json({
        status:'success',
        token,
        data:{
            user
        }
    })
}

exports.signUp = async(req,res) =>{
    try {
        const newUser = await User.create(req.body)
        signinResponse(newUser,200,res)
    } catch (error) {
        console.log('error message : ',error.message)
        res.status(500).json({
            status: 'fail',
            message: error.message
        });
    }
}

exports.login = async(req,res) =>{
    try{
        const email = req.body.email
        const pswd = req.body.password;
        if(!email || !pswd)
        {
             throw new Error('please enter email and password')
        }
        const curruser = await User.findOne({email}).select('+password')
        if(!curruser)
        {
            throw new Error('please enter a valid credentials')
        }
        const match = await curruser.comparePassword(pswd,curruser.password)
        if(!match)
        {
            throw new Error('please enter a valid credentials')
        }

        signinResponse(curruser,200,res)
        
    } catch(error){
        console.log("error occured : ",error.message)
        res.status(400).json({
            status:'fail',
            message:`logged in failed: ${error.message}`
    })
}
}

exports.forgotPassword = async(req,res)=>{
    let curruser
    try{
        const email = req.body.email
        if(!email)
        {
            throw new Error('please enter your email')
        }
        curruser = await User.findOne({email})
        if(!curruser)
        {
            throw new Error('user not found: bad credentials')
        }
        const resetToken = curruser.ResetPasswordToken();
        await curruser.save({validateBeforeSave:false})
        const url = `http://localhost:3000/resetPassword/${resetToken}`
        const message = `please click on the link below to reset your password 
                        \n\n ${url} \n\n link expires in 10 minutes`
        const option = {
            email:curruser.email,
            subject:"for reset of password ",
            content:message
        }

        await sendEmail(option);

        res.status(200).json({
            status:"success",
            message:"email sent succesfully"
        })

    }catch(error)
    {
        if(curruser)
        {
            curruser.passwordResetToken=undefined
            curruser.passwordResetToken=undefined
            curruser.save({validateBeforeSave:false})
        }
        console.log("some error occured : ",error.message)
        res.status(200).json({
            status:"fail",
            message:error.message
        })
    }
}

exports.resetPassword = async(req,res)=>{
    try {
        const password = req.body.password
        const confirmPassword = req.body.confirmPassword 

        if(!password || !confirmPassword)
        {
            throw new Error ('please enter the password and confirm password')
        }

        if(password!==confirmPassword)
        {
            throw new Error('password and confirm password do not match')
        }

        const Token = crypto.createHash('sha256').update(req.params.token).digest('hex')
        const curruser = await User.findOne({passwordResetToken:Token, tokenExpire:{$gt:Date.now()}})
        if(!curruser)
        {
            throw new Error('invalid token or token expired')
        }
        curruser.password = password
        curruser.confirmPassword = confirmPassword
        curruser.passwordChangedAt = Date.now()
        curruser.passwordResetToken=undefined
        curruser.tokenExpire = undefined
        await curruser.save()
    
        signinResponse(curruser,200,res)
        
    }  catch (error) {
        res.status(400).json({
            status:'fail',
            message:error.message
        })
    }

}


exports.protect = async(req,res,next)=>{
    try {
        let testoken = req.headers.authorization
        let token
        if(testoken && testoken.startsWith('Bearer'))
        {
            token = testoken.split(' ')[1]
        }
        if(!token)
        {
            throw new Error('please log in first')
        }

   
        const decodeToken = await util.promisify(jwt.verify)(token,process.env.SECRET_STR)
        console.log(decodeToken)
    
        const curruser = await User.findById(decodeToken.id)
    
        if(!curruser)
        {
            throw new Error('user not found')
        }
    
        req.user = curruser
        next()
    } catch (error) {
        res.status(400).json({
            status:'fail',
            data:{
                message:error.message
            }
        })
    }
   
}
