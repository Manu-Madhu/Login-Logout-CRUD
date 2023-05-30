const express = require('express');
const Session = require('express-session');
const cookiePaser = require('cookie-parser');
const adminRoute = express();
const dotenv = require('dotenv');
  
// VIEW ENGINE SETTING
adminRoute.set("view engine","ejs");

// DEFUALT VIEW ENGINE SETTING
dotenv.config({ path: '../src/config.env' })
const secretKey = process.env.SECRET_CODE2;
adminRoute.use(cookiePaser());
adminRoute.use(express.urlencoded({ extended: false }));
adminRoute.use(
    Session({
        name: 'admin.sid',
        secret: secretKey,
        saveUninitialized: false,
        cookie: { maxAge: 1000 * 60 * 60 * 24 },
        resave: false
    })
)
adminRoute.use(function (req, res, next) {
    if (!req.user)
    res.setHeader('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    next();
});

//ADMIN ROUTE START
const adminController = require('../controller/adminController');
const adminSide = require('../middleweare/adminSide')

adminRoute.get('/', adminSide.isloging, adminController.adminLoginpage);
adminRoute.post('/', adminController.verifyingAdmin);

adminRoute.get('/logout', adminController.adminLogout);

adminRoute.get('/adminPannel', adminSide.logout, adminController.adminPannel);

adminRoute.get('/addUser', adminSide.logout, adminController.addUser)
adminRoute.post('/addnewUser', adminController.addnewUser)

adminRoute.get('/updateUser', adminSide.logout, adminController.updateUser)
adminRoute.post('/updatedUser', adminController.UpdateUservalue)

adminRoute.get('/deleteUser', adminController.deleteUser)

adminRoute.get('*', function (req, res) {
    res.redirect('/admin');
})

module.exports = adminRoute;