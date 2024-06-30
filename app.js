require('dotenv').config();
const express=require('express');
const expressLayout=require('express-ejs-layouts');
const app=express();
const cookieParser=require('cookie-parser');
const MongoStore=require('connect-mongo');
const methodOverride=require('method-override')

const connectDB=require('./server/config/db');
const session = require('express-session');

const {isActiveRoute}=require('./server/helpers/routerHelpers');

const port=5000 || process.env.port;


connectDB();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));

app.use(session({
    secret:'keyboard cat',
    resave:false,
    saveUninitialized:true,
    store:MongoStore.create({
        mongoUrl:process.env.MONGODB_URI
    })
    
}))

app.use(express.static('public'));
app.use(expressLayout);
app.set('layout','./layouts/main');
app.set('view engine','ejs');

app.locals.isActiveRoute= isActiveRoute;


app.use('/',require('./server/routes/main'));
app.use('/',require('./server/routes/admin'));

app.listen(port,()=>{
    console.log(`App listening on port ${port}`);
});