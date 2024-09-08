const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const registeruser = require('./model');
const jwt=require('jsonwebtoken');
const middleware=require('./middlewar')
app.use(cors({origin:"*"}));
app.use(express.json());

mongoose.connect("mongodb+srv://322103312083:951509290@cluster0.8iess.mongodb.net/movie")
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });
app.post('/register',async(req,res)=>{
    try{
       const {name,email,password}=req.body
       const exist=await registeruser.findOne({email})
       if(exist){
        return res.status(400).send('user alredy exist')
       }
       let newreg=new registeruser({
        name,
        email,
        password
       })
       await newreg.save();
       res.status(200).send('register sucessfully:');
    }
    catch(err){
      console.log(err)
    }
})
app.post('/login',async(req,res)=>{
    try{
        const {email,password}=req.body
        const exist=await registeruser.findOne({email});
        if(!exist){
            return res.status(404).send("user not found");
        }
        if(exist.password !== password){
            return res.status(404).send("invalid credentials");
        }
        const payload={
            user:{
                id:exist.id
            }
        }
        jwt.sign(payload, 'jwtsecret', { expiresIn: 360000 }, (err, token) => {
            if (err) throw err;
            return res.json({ token });
        });
    }
    catch(err){
        res.status(500).send('internal server error')
    }
}) 
app.get('/myprofile',middleware,async(req,res)=>{
    try{
      let exist=await registeruser.findById(req.user.id)
      if(!exist){
        return res.status(400).send('user not found')
      }
      res.json(exist);
    }
    catch(err){
        res.status(500).send('internl server error');
    }
})
app.get('/hello',(req,res)=>{
res.send("hello world")

})

app.listen(4000, () => {
    console.log("Server started successfully on port 4000");
});
