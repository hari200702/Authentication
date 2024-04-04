const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User=require('../models/User')
const jwt=require('jsonwebtoken')


router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    const user=await User.findOne({email})
    if(user){
      return res.json({message:"user already there"})
    }

    const hashpassword=await bcrypt.hash(password,10)
    const newUser=new User({
  
      username,
      email,
      password:hashpassword,
    })

    await newUser.save()
    return res.json({message:"recorded"})
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user= await User.findOne({email})
  if(!user){
    return res.json({message:"User does not exist"})
  }

  const validpassword= await bcrypt.compare(password, user.password)
  if(!validpassword){
    return res.json({message:"Incorrect password"})
  }


  const token= jwt.sign({username:user.username},process.env.KEY,{expiresIn:'24h'})
  res.cookie('token',token,{ httpOnly:true, maxAge:360000})
  return res.json({status:true,message: "login successfully"})

})


router.post('/forgotpassword', async (req, res) => {
  const {email} = req.body;
  try{
    const user=await User.findOne({email})
    if(!user){
      return res.json({message:"user not registered"})
    }
const token=jwt.sign({id:user._id},process.env.KEY,{expiresIn:'5m'})

var nodemailer=require('nodemailer')


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'hpdeveloper2007@gmail.com',
    pass: 'pytcawzvexymkyto'
    
  }
});
const encodedtoken=encodeURIComponent(token).replace(/\./g,"%2E")
var mailOptions = {
  from: 'hpdeveloper2007@gmail.com',
  to: email,
  subject: 'Reset password',
  text: `http://localhost:3000/resetpassword/${encodedtoken}`
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    return res.json({message: 'error sending mail'})
  } else {
    return res.json({status: true,message: 'email sent'})
  }
});
  }
  catch(err){
    console.log(err)
  }
})

router.post('resetpassword/:token',async (req,res)=>{
  const token=req.params;
  const {password}=req.body
  try{
    const decoded =await jwt.verify(token,process.env.KEY)
    const id=decoded.id;
    const hashpassword=await bcrypt.hash(password,10)
    await User.findByIdAndUpdate({_id:id},{password:hashpassword})
    return res.json({status:true,message:"update password"})
  }
  catch(err){
    return res.json("invalid token")
  }
})
module.exports=router
