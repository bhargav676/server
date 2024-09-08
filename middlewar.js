const jwt=require('jsonwebtoken');

module.exports=function(req,res,next){
    try{
       const token=req.header('x-token');
       if(!token){
        return res.status(400).send('token is not found');
       }
       let decode= jwt.verify(token,'jwtsecret');
       req.user=decode.user
       next();
    }
    catch(err){
     console.log(err);
    }
}