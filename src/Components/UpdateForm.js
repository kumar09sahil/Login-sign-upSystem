import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../Context/UserContext/UserContext'

const UpdateForm = ({setuserstyle,style,setstyle}) => {
    const [newDetails, setnewDetails] = useState({Username:'',email:'',phoneNumber:'',photo:''})
    const context = useContext(UserContext)
    const {userDetails, updateDetails } = context
   
    useEffect(() => {
        setnewDetails(userDetails)
    }, [userDetails])

    const updateUser = async() =>{
    
        const response = await updateDetails(newDetails)
        console.log(response)
        if(response !== 'fail')
        {
            setuserstyle({
                opacity:'1',
                zIndex:'1'
            })
            setstyle({
                opacity:'0',
                zIndex:'-1'
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
            zIndex:'-1'
        })
    }

    const handleChange = (e) => {
        if (e.target.name === 'photo') {
            // Handle file upload
            const file = e.target.files[0];
            const reader = new FileReader();
    
            reader.onloadend = () => {
                setnewDetails({ ...newDetails, photo: reader.result });
            };
    
            if (file) {
                reader.readAsDataURL(file);
            }
        } else {
            // For other input fields
            setnewDetails({ ...newDetails, [e.target.name]: e.target.value });
        }
    };
  return (
    <div className='UpdateForm' style={{...style}}>
      <input type="text" name='Username' onChange={handleChange} value={newDetails.Username} />
      <input type="email" name='email' onChange={handleChange} value={newDetails.email}/>
      <input type="tel" name='phoneNumber'onChange={handleChange}  value={newDetails.phoneNumber} pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required={true}/>

      {/* <input type="file" name='photo'onChange={handleChange}  /> */}
      <div className='butt'>
        <button className="btns" onClick={closeform}>close</button>
        <button className="btns" onClick={updateUser}>update</button>
      </div>
    </div>
  )
}

export default UpdateForm
