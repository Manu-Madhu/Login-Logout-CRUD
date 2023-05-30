const user = require('../models/user');
const bcrypt = require('bcrypt')

const loginPage = (req, res, next) => {
    res.render('login', { title: "Login" });
}

const pwdEncription = async (password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 15)
        return hashedPassword
    } catch (error) {
        console.log(error)
    }
}
const register = (req, res, next) => {
    res.render('register', { title: "Register" });
}
const registerUser = async (req, res) => {
    try {
        const enPwd = await pwdEncription(req.body.password);
        // /*DD*/ let newData = user.updateOne({password:req.body.password},{$set:{password:enPwd}});
        req.body.password = enPwd
        req.body.is_admin = 0
        await user.create(req.body)
        res.render('register', { succ: "User SuccessFully Registerd..." });
    }
    catch (error) {
        console.log(error)
        res.render('register', { message: "Please use a uniqe email Id" })
    }
}

const verifyingUser = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const userData = await user.findOne({ email: email });
        if (userData) {
            let pwdMatch = await bcrypt.compare(password, userData.password);
            if (pwdMatch) {
                req.session.user = userData.name;
                console.log(req.session)
                res.redirect('/userHome')
            } else {
                res.render('login', { msg: "Please Enter the Currect Password" })
                console.log("password error")
            }
        } else {
            res.render('login', { msg: "Please Enter the Currect Email" })
            console.log("email error")
        }

    } catch (error) {
        console.log(error.message)
    }

}

const userHome = (req, res, next) => {
    res.render('userHome', { title: "Home", user: req.session.user })
}

// const logOut = (req, res) => {
//     req.session.user = null;
//     req.session.destroy((err) => {
//         if (err) {
//             console.log(err)
//         } else {
//             res.clearCookie('user.sid')
//             res.redirect('/')
//         }
//     });
// }

const logOut = (req, res) => {
    if (req.session.user) {
        // Clear the user session
        req.session.user = null;
        console.log(req.session)
        req.session.destroy((err) => {
            if (err) {
                console.error('Error saving session:', err);
            }
            res.clearCookie('user.sid');
            res.redirect('/');
        });
    } else {
        res.redirect('/');
    }
};
module.exports = {
    loginPage,
    register,
    registerUser,
    userHome,
    verifyingUser,
    logOut
}