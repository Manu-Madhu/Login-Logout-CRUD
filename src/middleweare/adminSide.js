const isloging = async (req, res, next) => {
    try {
        if (req.session.admin) {
            res.redirect('/admin/adminPannel')
        } else {
            next()
        }
    } catch (error) {
        console.log(error)
    }
}

const logout = async (req, res, next) => {
    try {
       if(req.session.admin){
           next()
       }else{
          res.redirect('/');
       }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    isloging,
    logout
}

