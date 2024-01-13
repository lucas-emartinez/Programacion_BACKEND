import passport from "passport";
import jwt from "passport-jwt"
import { Strategy as GithubStrategy } from "passport-github2";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { compareData } from "./utils.js";
import config from "./config/env.js";
import { cartService } from "./services/carts.service.js";
import { userService } from "./services/users.service.js";

///////// LOCAL STRATEGY //////////

const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;



const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) token = req.cookies.token;
    return token;
}

// JWT STRATEGY - COOKIE EXTRACTOR
passport.use("jwt", new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]), // Extractor
    secretOrKey: config.JWT_SECRET,
}, async (jwt_payload, done) => {
    try {
        return done(null, jwt_payload);
    } catch (error) {
        return done(error);
    }
}));

passport.use('google', new GoogleStrategy({
    clientID: config.google.clientID,
    clientSecret: config.google.clientSecret,
    callbackURL: config.google.callbackURL,
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const user = await userService.findByEmail(profile._json.email);
        if (user) {
            if (user.from_google) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        }

        const cart = await cartService.createOne({})
        const newUser = await userService.createUser({
            first_name: profile._json.given_name,
            last_name: profile._json.family_name,
            cart: cart._id,
            email: profile._json.email,
            password: profile._json.sub,
            from_google: true,
        });
        return done(null, newUser);
    } catch (error) {
        return done(error);
    }
}));

// LOGIN
passport.use("login", new LocalStrategy(
    {
        usernameField: "email",
    },
    async (email, password, done) => {
        const adminEmail = "adminCoder@coder.com"
        const adminPw = "adminCod3r123"
        try {
            if (email === adminEmail) {
                if (password === adminPw) return done(null, {
                    _id: "DEFAULT_ADMIN",
                    email: adminEmail,
                    first_name: "Coder Admin",
                    role: "admin",
                    cart: "653bb65e8619f8ed2c4864aa"
                })
                return done(null, false, { message: "El email o la contraseña son incorrectos" });
            } else {
                const userDatabase = await userManager.findByEmail(email);
                if (!userDatabase) return done(null, false, { message: "Usuario no encontrado" });
                const passwordMatch = await compareData(password, userDatabase.password);
                if (!passwordMatch) return done(null, false, { message: "El email o la contraseña son incorrectos" });
                return done(null, userDatabase);
            }

        } catch (error) {
            return done(error);
        }
    })
);

///////// GITHUB STRATEGY //////////

passport.use("github", new GithubStrategy({
    clientID: config.github.clientID,//process.env.GITHUB_CLIENT_ID,
    clientSecret: config.github.clientSecret, //process.env.GITHUB_CLIENT_SECRET,
    callbackURL: config.github.callbackURL //process.env.GITHUB_CALLBACK_URL
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const user = await userService.findByEmail(profile._json.email);
        if (user) {
            if (user.from_github) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        }

        const cart = await cartService.createOne({})
        const newUser = await userService.createOne({
            first_name: profile._json.name ? profile._json.name : profile._json.login,
            last_name: '',
            cart: cart._id,
            email: profile._json.email ? profile._json.email : profile._json.login,
            password: profile._json.node_id,
            from_github: true,
        });

        return done(null, newUser);
    } catch (error) {
        return done(error);
    }
}));


// Serializacion del usuario
passport.serializeUser((user, done) => {
    done(null, { _id: user._id, first_name: user.first_name, last_name: user.last_name, email: user.email, cart: user.cart, role: user.role });
});

// Deserializacion del usuario
passport.deserializeUser(async (data, done) => {
    try {
        if (data.email === "adminCoder@coder.com") return done(null, data); // SI ES EL CODERADMIN NO BUSCO EN LA BASE DE DATOS
        const user = await userService.findByEmail(data.email);
        done(null, user);
    } catch (error) {
        done(error);
    }

});
