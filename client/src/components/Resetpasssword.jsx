import React from 'react'
import '../App.css'
import { useState } from 'react'
import Axios from 'axios';
import { useNavigate,useParams } from 'react-router-dom'


const Resetpassword = () => {


const [password, setPassword] = useState('')
const {token}=useParams()

const navigate=useNavigate()




const handleSubmit = (e) => {

    e.preventDefault()
    Axios.post("http://localhost:4000/auth/resetpassword/"+token,{
        password,
    }).then(response=>{
        if(response.data.status){
            navigate('/login')
        }
        console.log(response.data)
    }).catch(err=>{
        console.log(err)
    })
}




  return (
    <div className='signupcontainer'>
       
        <form className="formsinup" onSubmit={handleSubmit}>
            <h2>Reset Password</h2>



            <label htmlFor="password">New Password:</label>
            <input
             type="password" placeholder='*******'
            onChange={(e)=>setPassword(e.target.value)} 
            />

            <button type='submit'>Send</button>
        </form>
    </div>
  )
}


export default Resetpassword
