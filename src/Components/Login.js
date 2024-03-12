import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

const Login = () => {
    const [credentials, setcredentials] = useState({email:"",password:""})
    let Navigate = useNavigate();
    const login = async () =>{
        try {
                const response = await fetch('http://localhost:5000/api/v1/auth/login',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    email: credentials.email,
                    password: credentials.password
                })
            })

            const json = await response.json()
            if(json.status === 'success')
            {
                localStorage.setItem('token',json.token)
                setcredentials({email:"",password:""})
                Navigate('/user')
                
            }
            else
            {
                alert(json.message)
            }
        } catch (error) {
            console.log('error occured :',error)
        }
        
    }

    const handleChange = (e) =>{
        setcredentials({...credentials,[e.target.name]:e.target.value})
    }
  return (
    <>
         <div className="mess" >
              <label style={{padding: "15px 0px 8px 0px "}} htmlFor="email"><b>Email address</b></label>
              <p style={{padding: "15px 0px 8px 0px "}} className="err"><b>valid email required</b></p>
          </div>
            <input type="email" onChange={handleChange} placeholder="email@company.com" id="login-email" value={credentials.email} name='email' require='true' />
            <label style={{alignSelf: "baseline", padding: "15px 0px 8px 0px "}} htmlFor="password" ><b>password</b></label>
            <input type="password" onChange={handleChange} placeholder="password" id="login-password" name='password' value={credentials.password} require='true' />
            <Link className='forgotPassword' to="/forgotPassword">forgot password</Link>
            <button className="btn" onClick={login}>sign-in</button>
    </>
  )
}

export default Login
