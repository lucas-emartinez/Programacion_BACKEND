function verifySession(req, res, next) {
    if (req.session) {
        // session valida
        console.log(req.session)
        res.locals.user = req.session.passport.user.first_name;
        res.locals.admin = req.session.passport.user.role;
        res.locals.cart = req.session.passport.user.cart;
        next();
    } else {
        // session invalida, rediccion a pagina de login
        res.redirect('/login');
    }
}

export default verifySession;
