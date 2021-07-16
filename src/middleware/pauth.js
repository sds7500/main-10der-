const jwt = require('jsonwebtoken');
const Provider = require('../models/providers');

const pauth=async(req,res,next)=>{
    try{
        const token=req.cookies.jwt;
        const verifyUser=jwt.verify(token,process.env.SECRET_KEY);

        const user=await Provider.findOne({_id:verifyUser._id})
        req.token=token
        req.user=user
        next();
    }
    catch(error){
        res.status(401).send(error);
    }
}
module.exports=pauth;