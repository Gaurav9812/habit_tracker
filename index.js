const express=require('express');

const port =8000;
const app=express();

const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose');
let ejs = require('ejs');
const flash=require('connect-flash');
const customMiddleware=require('./config/middleware');
const session=require('express-session');

app.use(express.urlencoded());

app.use(expressLayouts);

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

//setting up view engine
app.set('view engine','ejs');
app.set('views','./views');

app.use(session({ cookie: { maxAge: 60000 }, 
    secret: 'woot',
    resave: false, 
    saveUninitialized: false}));
    
app.use(express.static('./assets'));

app.use(flash());
app.use(customMiddleware.setFlash);

app.use('/',require('./routes/index'));
app.listen(port,function(err)
{
    if(err)
    {
        console.log(`error in setting up server`);
        return ;
    }
    console.log(`server is running on port :${port}`);
});