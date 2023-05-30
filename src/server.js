const express =require('express');
const path = require('path')
const app = express();
const mongoose = require("mongoose");
const userRoute = require('./routers/user');
const adminRoute = require('./routers/admin');
const dotenv = require('dotenv');

dotenv.config( {path:'config.env'} )
const PORT =process.env.PORT||4000
// CSS PATH
app.use(express.static(path.join(__dirname,'public')))

// DATABASE
let url = process.env.URL
mongoose.connect(url);

// ROUTES 
app.use('/',userRoute);
app.use('/admin',adminRoute);
// ROUTES END HERE

app.listen(PORT,()=>{
    console.log(`server rinning successfully http://localhost:${PORT}/`)
})