const express = require("express");
const user_Router = express()
const session = require('express-session')
const cookiePaser = require('cookie-parser')
const dotenv = require('dotenv');

// VIEW ENGINE SETTING
user_Router.set("view engine","ejs");

// SECRET CODE SETTING 
dotenv.config({path:'../src/config.env'})
const SecretKey = process.env.SECRET_CODE;
user_Router.use(cookiePaser());
user_Router.use(express.urlencoded({extended:false}));
user_Router.use(
    session({
        name: 'user.sid',
        secret: SecretKey,
        saveUninitialized: false,
        cookie: {maxAge:1000 * 60 * 60 * 24 },
        resave: false
    })
)
user_Router.use(function(req, res, next) {
    if (!req.user)
        res.setHeader('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    next();
  });

//  USER ROUTERS
const userMWHome = require('../middleweare/userSide')
const userControl=require('../controller/userController')

user_Router.get("/",userMWHome.isLogout,userControl.loginPage);
user_Router.post("/",userControl.verifyingUser);

user_Router.get("/logOut",userControl.logOut);

user_Router.get("/register",userMWHome.isLogout,userControl.register);
user_Router.post("/register",userControl.registerUser);

user_Router.get("/userHome",userMWHome.islogin,userControl.userHome);


module.exports= user_Router;  