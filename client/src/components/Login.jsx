import React from 'react'
import '../App.css'
import { useState } from 'react'
import Axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'


const Login = () => {

const [email, setEmail] = useState('')
const [password, setPassword] = useState('')

const navigate=useNavigate()


Axios.defaults.withCredentials=true;
const handleSubmit = (e) => {

    e.preventDefault()
    Axios.post("http://localhost:4000/auth/login",{
        email,
        password,
    }).then(response=>{
        if(response.data.status){
            navigate('/home')
        }
    }).catch(err=>{
        console.log(err)
    })
}




  return (
    <div className='signupcontainer'>
       
        <form className="formsinup" onSubmit={handleSubmit}>
            <h2>Login</h2>

            <label htmlFor="email">Email:</label>
            <input type="email" autoComplete='off' placeholder='Email' 
            onChange={(e)=> setEmail(e.target.value)}/>

            <label htmlFor="password">Password:</label>
            <input type="password" placeholder='*******'
            onChange={(e)=>setPassword(e.target.value)} />

            <button type='submit'>Login</button>
            <p>Forgot Password?<Link to ="/forgotpassword">Click here</Link></p>
            <p>Dont Have an account?<Link to ="/signup">SignUp</Link></p>
        </form>
    </div>
  )
}


export default Login
