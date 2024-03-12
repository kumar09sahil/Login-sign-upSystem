import React, { useState} from 'react'
import { useNavigate } from 'react-router-dom'
const SignUp = () => {
    const [credentials, setcredentials] = useState({Username:"", email:"", phoneNumber:"", password:"", confirmPassword:""})
    let Navigate = useNavigate()
    const signup = async() =>{
        try {
            const response = await fetch('http://localhost:5000/api/v1/auth/signup', {
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    Username:credentials.Username,
                    email:credentials.email,
                    phoneNumber:credentials.phoneNumber,
                    password:credentials.password,
                    confirmPassword:credentials.confirmPassword
                })
            })
    
            const json = await response.json();
            console.log(json)
            if(json.status === 'success')
            {
                localStorage.setItem('token',json.token)
                setcredentials({Username:"", email:"", phoneNumber:"", password:"", confirmPassword:""})
                Navigate('/user')
            }
            else
            {
                alert(json.message)
            }
        } catch (error) {
            console.log("error: ", error)
        }
       

    }
    const handleChange = (e) =>{
        setcredentials({...credentials, [e.target.name] : e.target.value})
    }
  return (
    <>
         <div className="image-container">
            <img src='https://i.pinimg.com/564x/6f/6b/bb/6f6bbb16aec97391aefe120ec5a4e6a2.jpg' className='image' alt="" />
        </div>
      <div className="content">
         <input type="text"  onChange={handleChange} placeholder="username" id="username" name='Username' value={credentials.Username} require='true' />
         <input type="tel"  onChange={handleChange} placeholder="phone number" id="telephonenumber" name='phoneNumber' value={credentials.phoneNumber} require='true' />
        <input type="email" onChange={handleChange} placeholder="email@company.com" id="sign-up-email" name='email' value={credentials.email} require='true' />
        <input type="password"  onChange={handleChange} placeholder="password" id="password" name='password' value={credentials.password} require='true' />
        <input type="password"  onChange={handleChange} placeholder="confirm password" id="c-password" name='confirmPassword' value={credentials.confirmPassword} require='true' />
        <button style={{marginTop:'0px', padding: "12px"}} onClick={signup} className="btn">Create Account </button>
      </div>
    </>
  )
}

export default SignUp
