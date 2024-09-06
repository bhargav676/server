const express=require('express');
const app=express();
app.listen(4000,()=>{
    console.log("server started sucessfully");
})
app.get('/app',(req,res)=>{
    res.send("bhargav")
})