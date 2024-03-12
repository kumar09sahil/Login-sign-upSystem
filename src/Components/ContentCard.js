import React from 'react'
import SignUp from './SignUp'
import Login from './Login'
import CoverImg from '../Components/CoverImg'

const ContentCard = () => {


  return (
    <>
      <CoverImg/>
      <div className="main-card">
      <div className="content-card">
        <SignUp/>
      </div>
      <div  className="login-page">
        <div className="login-card">
            <Login/>
        </div>
        
        </div>
      
      </div>
    </>
  )
}

export default ContentCard
