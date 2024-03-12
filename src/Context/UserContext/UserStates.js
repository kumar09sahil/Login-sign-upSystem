import React, { useState } from 'react'
import UserContext from './UserContext';
import validator from 'validator';
import { useNavigate } from 'react-router-dom';

const UserStates = (props) => {
    let Navigate = useNavigate()
    const [userDetails, setuserDetails] = useState({Username:'',email:'',phoneNumber:'',photo:''})
    const fetchUserDetails = async() =>{
        try {
            const response = await fetch('http://localhost:5000/api/v1/user/fetchDetails', {
            method : "GET",
            headers:{
                'Content-Type':'application/json',
                'authorization':`Bearer ${localStorage.getItem('token')}`
            }
        })
        const currdata = await response.json()
        const details = currdata.data.curruser
        console.log(currdata.data.curruser.Username)
        
        setuserDetails({
            Username:details.Username,
            email:details.email,
            phoneNumber:details.phoneNumber,
            photo:details.photo
        })
        if(currdata.status === 'fail')
        {
            alert(currdata.message)
        }
        } catch (error) {
            console.log('error occured ',error)
        }
    }

    const updateDetails = async (obj) =>{
        try {
            if(!validator.isEmail(obj.email))
            {
                alert('please enter a valid email')
                    return 'fail';
            }
            const number = obj.phoneNumber.trim(); 
            if (!validator.isNumeric(number) || !validator.isLength(number, { min: 10, max: 10 })) {
                alert('Please enter a valid phone number');
                return 'fail';
            }
            const response = await fetch('http://localhost:5000/api/v1/user/updateDetails', {
                method:"PATCH",
                headers:{
                    'Content-Type':'application/json',
                    'authorization':`Bearer ${localStorage.getItem('token')}`
                },
                body:JSON.stringify({
                    Username:obj.Username,
                    email:obj.email,
                    phoneNumber:obj.phoneNumber,
                    photo:obj.photo
                })
            } )
            const currdata = await response.json();
            const details = currdata.data.updateuser            
            console.log(details)
            setuserDetails({
            Username:details.Username,
            email:details.email,
            phoneNumber:details.phoneNumber,
            photo:details.photo
        })
        console.log(currdata)
        if(currdata.status === 'fail')
        {
            alert(currdata.message)
            return 'fail';
        }
            alert('userUpdated')
            Navigate('/user')
            return 'success'
            
        } catch (error) {
            console.log('error occured ',error.message)
        }
    }

    const deleteUser = async () =>{
        try {
            const response = await fetch('http://localhost:5000/api/v1/user/DeleteMe',{
                method:"PATCH",
                headers:{
                    'Content-Type':'application/json',
                    'authorization':`Bearer ${localStorage.getItem('token')}`
                }
            })
            const data = await response.json();
            
            console.log(data)
            setuserDetails({Username:'',email:'',phoneNumber:'',photo:''})
            alert('userDeleted')
            Navigate('/')
        } catch (error) {
            console.log("error occured ",error)
        }
    }

    const updatePassword = async(obj) =>{
        try {
            const response = await fetch('http://localhost:5000/api/v1/user/updatePassword',{
                method:"PATCH",
                headers:{
                    'Content-Type':'application/json',
                    'authorization':`Bearer ${localStorage.getItem('token')}`
                },
                body :JSON.stringify({
                    currentPassword :obj.currentPassword,
                    newPassword: obj.newPassword,
                    confirmPassword : obj.confirmPassword
                })
            })
            const data = await response.json();
            console.log(data)
            if(data.status === 'fail')
            {
                return data;
                // alert(data.message)
            }
            else
            {
                alert('password updated')
                Navigate('/user')
            }
        } catch (error) {
            
            console.log("error occured ",error)
        }
    }

    const forgotpassword = async (email) => {
        try {
            if (!validator.isEmail(email)) {
                alert('Please enter a valid email');
            }
            const response = await fetch('http://localhost:5000/api/v1/auth/forgotPassword', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ email: email })
            });
            const data = await response.json();
                if(data.status === 'fail')
                {
                    alert(data.message)
                    return;
                }
            console.log(data);
            alert('Email sent successfully. Please click on reset link in your mail');
        } catch (error) {
            console.log("Error occurred ", error);
        }
    }

    const resetPassword = async(obj,id) =>{
        try {
            console.log(id)
            console.log(obj)
            const response = await fetch(`http://localhost:5000/api/v1/auth/resetPassword/${id}`,{
            method:'PATCH',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password:obj.password,
                confirmPassword:obj.confirmPassword
            })
        })
        const data = response.json();
        
        console.log(data)
        alert('password changed succesfully')
        Navigate('/')
        } catch (error) {
            console.log("Error occurred ", error);
        }
        
    }
    
  return (
   
        <UserContext.Provider
            value={{ userDetails, fetchUserDetails, updateDetails, deleteUser, updatePassword,forgotpassword, resetPassword }}
        >
            {props.children}
        </UserContext.Provider>
  )
}

export default UserStates


