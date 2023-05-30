const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique:true,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
   
    password: {
        type: String,
        required: true
    },

    is_admin:{
        type: Number,
        required: true
    }
})

const user = mongoose.model('RegisterUser',userSchema)
module.exports =user 
