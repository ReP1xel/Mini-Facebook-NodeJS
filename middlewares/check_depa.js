module.exports = async function check_depa(req, res, next) {
    let user = req.user
    if (user.role != "department") {
        req.session.flash = { type: "error", title: "Error", content: "Access denied" }
        res.redirect('/login')
    } else {
        next()
    }
};