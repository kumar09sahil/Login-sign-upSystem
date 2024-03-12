import React, { useContext, useState } from 'react'
import UserContext from '../Context/UserContext/UserContext'
import {useNavigate} from 'react-router-dom'
import { useParams } from 'react-router-dom'

const ResetPassword = () => {
    const {id} = useParams()
    let Navigate = useNavigate();
    const [data,setdata] = useState({password:'',confirmPassword:''})
    const context = useContext(UserContext)
    const {resetPassword} = context
    const reset = () =>{
        console.log(id)
        resetPassword(data,id)
        // Navigate('/')
    }
    const handleclick = (e)=>{
        setdata({...data, [e.target.name]:e.target.value})
    }
  return (
    <div className='resetpassword'>
      <input type="password" onChange={handleclick} placeholder='password' name='password'  />
      <input type="password" onChange={handleclick}  placeholder='confirm password' name='confirmPassword'  />
      <button className='btns' onClick={reset}>update</button>
    </div>
  )
}

export default ResetPassword
