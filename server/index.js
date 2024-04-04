require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser=require('cookie-parser')
const { mongoose } = require('mongoose')
const router=require('../server/routes/user')


const app = express();

app.use(express.json())
app.use(cors({
  origin:["http://localhost:3000"],
  credentials:true
}))
app.use(cookieParser())
app.use('/auth',router)



mongoose.connect('mongodb://127.0.0.1:27017/authentication')




app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });