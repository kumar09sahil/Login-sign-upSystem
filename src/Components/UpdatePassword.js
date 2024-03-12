import React, { useContext, useState } from 'react'
import UserContext from '../Context/UserContext/UserContext'

const UpdatePassword = ({setuserstyle,style,setstyle}) => {
    const [data,setdata] = useState({currentPassword:'', newPassword:'', confirmPassword:''})
    const context = useContext(UserContext)
    const { updatePassword} = context
    const passwordupdate = async() =>{
            const response = await updatePassword(data)
            console.log(response)
            if(response && response.status==='fail')
            {
                alert(response.message)
            }
            else
            {
                setuserstyle({
                    opacity:'1',
                    zIndex:'1'
                })
                setstyle({
                    opacity:'0',
                    zIndex:'-2'
                })
            }
     
    }

    const closeform = () =>{
        setuserstyle({
            opacity:'1',
            zIndex:'1'
        })
        setstyle({
            opacity:'0',
            zIndex:'-2'
        })
    }

    const handlechange = (e) =>{
        setdata({...data, [e.target.name]:e.target.value})
    }

  return (
    <>
    <div className='updatePass' style={{...style}}>
      <input type="password" onChange={handlechange} name='currentPassword' placeholder='current Password'/>
      <input type="password" onChange={handlechange} name='newPassword' placeholder='new Password'/>
      <input type="password" onChange={handlechange} name='confirmPassword' placeholder='confirm new Password'/>
        <div className='butt'>
            <button className="btns" onClick={closeform}>close</button>
            <button className="btns" onClick={passwordupdate}>update</button>
        </div>
    </div>
    </>
  )
}

export default UpdatePassword
