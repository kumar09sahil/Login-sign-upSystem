import React, { useContext, useState } from 'react'
import UserContext from '../Context/UserContext/UserContext'
import { useNavigate } from 'react-router-dom'


const ForgotPassword = () => {
    let Navigate = useNavigate()
    const [email,setemail] = useState('')
    const context = useContext(UserContext)
    const {forgotpassword} =context;
    const handleclick = async() =>{
        forgotpassword(email)
        setemail('')
    }
    const handlechage = (e) =>{
        setemail(e.target.value)
    }
    const close = () =>{
        Navigate('/')
    }
  return (
    <>
        <div className="forgotContainer">
            <label htmlFor="">Email</label>
            <input type="email" onChange={handlechage} required='true' value={email} placeholder='company@gmail.com'/>
            <div className="butt">
                <div onClick={close}  className="btns">close</div>
                <div onClick={handleclick} className="btns">Send Mail</div>
            </div>
        </div>
    </>
  )
}

export default ForgotPassword
