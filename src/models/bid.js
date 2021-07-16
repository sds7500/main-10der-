const mongoose=require('mongoose')

const bidSchema=new mongoose.Schema({
    Bidded_by:{
        type:String,
        required:true
    },
    Bidder_name:{
        type:String,
        required:true
    },
    tender_id:{
        type:String ,
        required:true 
    },
    Description:{
        type:String,
    },
    Amount:{
        type:Number,
        required:true
    },
    Bidding_Date:Date,
    bidding_date:String,
})


const Bid=new mongoose.model("Bid",bidSchema);

module.exports=Bid;