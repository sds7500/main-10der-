const mongoose=require('mongoose')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema=new mongoose.Schema({
    name:{
        type:String ,
        required:true ,
        unique:true
    },
    email:{
        type:String ,
        required:true,
        unique:true
    },
    Phone:{
        type:String ,
        required:true,
        unique:true
    },
    password:{
        type:String ,
        required:true
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }],
    resetToken:String,
    expireToken:Date
})

userSchema.methods.genrateAuthToken=async function(){
    try{
        const token=jwt.sign({_id:this._id},process.env.SECRET_KEY);
        this.tokens=this.tokens.concat({token:token})
        await this.save()
        return token
    }
    catch(error){
        
        res.send(error)
    }
}

userSchema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password=await bcrypt.hash(this.password,10)
    }
    next();
})

//creating collection

const Register=new mongoose.model("Register",userSchema);

module.exports=Register 