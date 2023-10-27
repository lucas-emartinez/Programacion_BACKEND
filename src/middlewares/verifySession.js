function verifySession(req, res, next) {
    if (req.session && req.session.email) {
        // session valida
        res.locals.user = req.session.first_name;
        res.locals.admin = req.session.isAdmin === true ? 'admin' : 'usuario';
        next();
    } else {
        // session invalida, rediccion a pagina de login
        res.redirect('/login');
    }
}

export default verifySession;
