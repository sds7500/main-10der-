const mongoose=require('mongoose')
const jwt = require('jsonwebtoken');

const providerSchema=new mongoose.Schema({
    name:{
        type:String ,
        required:true ,
    },
    email:{
        type:String ,
        required:true,
        unique:true
    },
    number:{
        type:String ,
        required:true,
        unique:true
    },
    password:{
        type:String ,
        required:true
    },
    Category:{
        type:String,
        required:true
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
})

providerSchema.methods.genrateAuth=async function(){
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

const Provider=new mongoose.model("Provider",providerSchema);

module.exports=Provider