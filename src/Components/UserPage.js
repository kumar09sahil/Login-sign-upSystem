import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../Context/UserContext/UserContext'
import { useNavigate } from 'react-router-dom'
import UpdateForm from './UpdateForm'
import UpdatePassword from './UpdatePassword'


const UserPage = () => {
  let Navigate = useNavigate()
  const context = useContext(UserContext)
  const {userDetails, fetchUserDetails, deleteUser,updateDetails} = context
  const [userstyle,setuserstyle] = useState('')
  const [formstyle,setformstyle] = useState('')
  const [passstyle,setpassstyle] = useState('')
  useEffect( () =>{
    if(localStorage.getItem('token'))
    {
      fetchUserDetails()
    }
    else
    {
      Navigate('/')
    }
  }, [])

  const updateUser = () =>{
      setuserstyle({
        opacity:'0.8',
        zIndex:'-2'
      })
      setformstyle({
        opacity:'1',
        zIndex:'0'
      })
  }

  const passwordupdate = () =>{
    setuserstyle({
      opacity:'0.8',
      zIndex:'-3'
    })
    setpassstyle({
      opacity:'1',
      zIndex:'0'
    })
  }

  const accountDelete = () =>{
    deleteUser();
  }
  const logOut = () =>{
    Navigate('/')
  }
  
  return (
    <>
            <button className='btn lbtn' onClick={logOut}> log out </button>
        <div className='body'>
            <div className="usercontainer" style={{...userstyle}}>
                <img src={userDetails.photo} alt="" className="userimg"/>
                <h2 style= {{ position:'relative',
                textAlign: 'center',
                top: '41%'}}>{userDetails.Username}</h2>

                <h4 style={{position: 'relative',
                textAlign: 'center',
                bottom: '2%',
                color: '#4CAF50'}}>{userDetails.email}</h4>
                <p>contact : {userDetails.phoneNumber}</p>
            
                
                <div className="box">GitHub</div>
                <div className="box">Frontend Mentor</div>
                <div className="box" onClick={updateUser}>updateDetails</div>
                <div className="box" onClick={passwordupdate}>updatePassword</div>
                <div className="box" onClick={accountDelete}>Delete Account</div>
            </div>
            <UpdateForm  setuserstyle={setuserstyle} style={formstyle} setstyle={setformstyle}/>
            <UpdatePassword setuserstyle={setuserstyle} style={passstyle} setstyle={setpassstyle}/>
        </div>
    </>
  )
}

export default UserPage
