module.exports = async function check_admin(req, res, next) {
    let user = req.user
    if (user.role != "admin") {
        req.session.flash = { type: "error", title: "Error", content: "Access denied" }
        res.redirect('/login')
    } else {
        next()
    }
};