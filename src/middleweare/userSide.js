const isLogout = (req, res, next) => {
    try {
        if (req.session.user) {
            res.redirect('/userHome')
        } else if (req.session.admin_id) {
            res.redirect('/admin/adminPannel')
        } else {
            next();
        }
    } catch (error) {
        console.log(error)
    }
}

const islogin = async (req, res, next) => {
    try {
        if (req.session.user) {
            next()
        } else {
            res.redirect('/')
        }

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    isLogout,
    islogin
}