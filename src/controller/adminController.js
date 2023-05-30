const user = require('../models/user');
const bcrypt = require('bcrypt')

const adminLoginpage = (req, res) => {
    res.render('admin')
}
const verifyingAdmin = async (req, res) => {
    try {
        const adEmail = req.body.adminEmail;
        const adPwd = req.body.adminPassword;
        const adData = await user.findOne({ email: adEmail })
        if (adData) {
            let pwdMatch = await bcrypt.compare(adPwd, adData.password);
            if (pwdMatch) {
                if (adData.is_admin != 0) {
                    // req.session.admin_id = adData._id
                    req.session.admin = adData.name
                    console.log(req.session)
                    res.redirect('/admin/adminPannel')
                } else {
                    res.render('admin', { message: "Please Check u r Credentials" })
                }
            } else {
                res.render('admin', { message: "Please Check u r Credentials" })
            }

        } else {
            res.render('admin', { message: "Please Check u r Credentials" })
            console.log("error")
        }

    } catch (error) {
        console.log(error.message)
    }
}


const pwdEncription = async (password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 15)
        return hashedPassword
    } catch (error) {
        console.log(error)
    }
}

const addUser = (req, res) => {
    res.render('addUser')
}
const addnewUser = async (req, res) => {
    try {
        const enPwd = await pwdEncription(req.body.password);
        // /*DD*/ let newData = user.updateOne({password:req.body.password},{$set:{password:enPwd}});
        req.body.password = enPwd
        req.body.is_admin = 0
        await user.create(req.body)
        res.render('addUser', { succ: "User SuccessFully Registerd..." });
    }
    catch (error) {
        console.log(error)
        res.render('addUser', { message: "Please use a uniqe email Id" })
    }
}

const updateUser = async (req, res) => {
    try {
        const id = req.query.id
        const userData = await user.findById({ _id: id })
        if (userData) {
            res.render('updateUser', { user: userData })
        } else {
            res.redirect('/admin/adminPannel')
        }
    } catch (error) {
        console.log(error)
    }
}

const UpdateUservalue = async (req, res) => {
    try {
        // console.log(req.body.id)
        // const id = req.query.id
        // console.log(id)
        await user.findByIdAndUpdate(
            { _id: req.body.id },
            {
                $set: {
                    name: req.body.name,
                    email: req.body.email,
                    phone: req.body.phone
                }
            })
        // console.log(userdata)
        res.redirect('/admin/adminPannel')
    } catch (error) {
        console.log(error.message)
    }
}

const adminPannel = async (req, res) => {
    try {
        let search = '';
        if (req.query.search) {
            search = req.query.search
        }
        const userData = await user.find({
            is_admin: 0,
            $or: [
                { name: { $regex: ".*" + search + ".*" } },
                { email: { $regex: ".*" + search + ".*" } },
                { mobile: { $regex: ".*" + search + ".*" } },
            ]
        })
        res.render('adminPannel', { msg: req.session.name, users: userData })
    } catch (error) {
        console.log(error)
    }
}

const deleteUser = async (req, res) => {
    try {
        const id = req.query.id
        await user.deleteOne({ _id: id })
        res.redirect('/admin/adminPannel')
    } catch (error) {
        console.log(error)
    }
}

const adminLogout = (req, res) => {
    if (req.session.admin) {
        // Clear the user session
        req.session.admin = null;
        req.session.save((err) => {
            if (err) {
                console.error('Error saving session:', err);
            }
            res.clearCookie('admin.sid');
            res.redirect('/');
        });
    } else {
        res.redirect('/');
    }
}

module.exports = {
    adminLoginpage,
    verifyingAdmin,
    adminPannel,
    adminLogout,
    addUser,
    addnewUser,
    updateUser,
    UpdateUservalue,
    deleteUser
}