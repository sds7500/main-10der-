require("./db/conn")
require('dotenv').config();
const express = require('express');
const app=express()
const path = require('path');
const hbs = require('hbs');
const PORT=process.env.PORT||8000;
const cookieParser = require('cookie-parser');
const pauth = require('./middleware/pauth');
const jwt = require('jsonwebtoken');
const Provider = require('./models/providers');
const Tender=require('./models/tender')
const Bid=require('./models/bid')


app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())

app.use(express.static(path.join(__dirname,"../public")))

app.set('view engine','hbs');
app.set('views','../templates/views')
hbs.registerPartials('../templates/partials')

app.get('/',(req,res)=>{
    res.render('index',{
        login:'Login',
        register:'Register',
        login_h:'/login',
        register_h:'/login'
    })
})

app.get('/login',(req,res)=>{
    res.render('plogin')
})

app.post('/create_bid',pauth,async(req,res)=>{
    try{
        const tender_id=req.body.tid;
        const bid_amt=req.body.bid_amount;
        const bdesc=req.body.bid_desc;
        const result=await Tender.findOne({$and:[{_id:tender_id},{End_Date : {$gte:Date.now()}}]});
        if(result==null){
            res.send("There is no active tender with the given id");
        }
        else{
            const registerBid=new Bid({
                Bidded_by: req.user._id,
                Bidded_name:req.user._name,
                tender_id:tender_id ,
                Description:bdesc ,
                Amount:bid_amt,
                Bidding_Date:Date.now(),
                bidding_date:new Date().toISOString().slice(0, 10),
            })
            const registered=await registerBid.save();
            res.status(201).render('patender');
        }
    }
    catch(err){
        res.status(400).send(err)
    }
})

app.post('/enter',async(req,res)=>{
    try{
        const name=req.body.login_name;
        const pwd=req.body.login_password;

        const username=await Provider.findOne({$or :[{email:name},{number:name}]})

        const token=await username.genrateAuth();

        res.cookie("jwt",token,{
            httpOnly:true
        });
        const registered=await username.save();

        if(pwd===username.password){
            res.status(201).render('index',{
                login:username.name,
                register:'logout',
                login_h:'/cart',
                register_h:'/logout'
            });
        }
    }
    catch(err){
        res.status(400).send(err)
    }
})

app.get('/cart',pauth,async(req,res)=>{
    res.render('pcart')
})

app.get('/patender',pauth,async(req,res)=>{
    try {
        const result=await Tender.find({$and:[{Category:req.user.Category},{End_Date : {$gte:Date.now()}}]});
        res.render('patender',{
            Tender:result
        })
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})



app.get('/team',(req,res)=>{
    res.render('team');
})

app.listen(PORT,()=>{
    console.log(`server is running at port no :${PORT}`);
})