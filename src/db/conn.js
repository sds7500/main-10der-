const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://somya:KAVITA@cluster0.16dj8.mongodb.net/10DER?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).then(()=>{
    console.log("connection successful");
}).catch((e)=>{
    console.log("couldnt not be connected");
})