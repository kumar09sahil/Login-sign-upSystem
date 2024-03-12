const express = require('express')
const User = require('../Modals/UserModal');
const user = require('../Modals/UserModal');

const filterobj = (obj, ...allowedfields) =>{
    const newobj = {}
    Object.keys(obj).forEach(prop => {
        if(allowedfields.includes(prop))
        {
            newobj[prop] = obj[prop];
        }
    });

    return newobj
}

exports.updateDetails = async (req, res) => {
    try {
        const curruser = await User.findById( req.user._id );
        if (!curruser) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not found'
            });
        }

        if (req.body.password || req.body.confirmPassword) {
            return res.status(400).json({
                status: 'fail',
                error: 'Password and confirmPassword cannot be changed by this endpoint'
            });
        }

        const newobj = filterobj(req.body, 'email', 'Username', 'phoneNumber','photo');
        const updateuser = await User.findByIdAndUpdate(req.user._id, newobj, { runValidators: true, new:true });   
        
        res.status(200).json({
            status: 'success',
            data: {
                updateuser 
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error.message
        });
    }
}


exports.deleteMe = async(req,res)=>{
    try {
        const curruser = await user.findByIdAndUpdate(req.user._id)
        if(!curruser)
        {
            throw new Error('user not present')
        }
        curruser.active=false;
        await curruser.save({validateBeforeSave:false});
        res.status(400).json({
            status:'success',
            message:'account deleted succesfully'
        })
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error.message
        });
    }

}

exports.updatePassword = async(req,res)=>{
    try {
        const curruser = await User.findById(req.user._id).select('+password')
        const currpassword = req.body.currentPassword
        const confirmPassword = req.body.confirmPassword
        const newPassword = req.body.newPassword
        console.log(curruser)
        console.log(curruser.password)
        const match = await curruser.comparePassword(currpassword,curruser.password)
        if(!match)
        {
            throw new Error('password do not match as previous')
        }
        curruser.password = newPassword
        curruser.confirmPassword = confirmPassword
        curruser.passwordChangedAt = Date.now()
        await curruser.save()
        res.status(200).json({
            status:'success',
            message:'password changed succesfully'
        })

    } catch (error) {
        res.status(500).json({
            status: 'fail',
            message: error.message
        });
    }
}

exports.fetchDetails = async (req, res) => {
    try {
        const curruser = await User.findById(req.user._id);
        if (!curruser) {
            throw new Error('not found .. please login again');
        }
        res.status(200).json({
            status: 'success',
            data: {
                curruser
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message,
            data: {
                error
            }
        }); // Closing parenthesis was missing here
    }
};
