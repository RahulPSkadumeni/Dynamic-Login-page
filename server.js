const express=require('express');
const path=require('path');
const bodyParser = require('body-parser');
const session=require("express-session");
const{v4:uuidv4}=require('uuid');

const router=require('./router');
const { title } = require('process');

const app=express();

const port=process.env.port||4000 

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use(session({
  secret:uuidv4(),
  resave:false,
  saveUninitialized:true
}));
app.use((req,res,next)=>{
  res.set('cache-control','no-store')
  next()
})
app.use('/',router,)
app.set('view engine','hbs')



app.listen(port,()=>{console.log('server runnning................!!!');});
