const mongoose=require('mongoose')

const tenderSchema=new mongoose.Schema({
    Username:String,
    Title:{
        type:String ,
        required:true 
    },
    Description:{
        type:String
    },
    Category:{
        type:String,
        required:true
    },
    Start_Date:Date,
    Start_date:String,
    End_Date:{
        type:Date,
        required:true
    }
})


const Tender=new mongoose.model("Tender",tenderSchema);

module.exports=Tender 