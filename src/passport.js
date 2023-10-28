import passport from "passport";
import { userManager } from "./dao/db/UserManager.js";
import { Strategy as GithubStrategy } from "passport-github2";	
import { Strategy as LocalStrategy } from "passport-local";
import { cartManager } from "./dao/db/CartManager.js";
import { compareData } from "./utils.js";


///////// LOCAL STRATEGY //////////

// SIGN UP
passport.use("signup", new LocalStrategy(
    { 
        usernameField: "email",
        passReqToCallback: true
    },
    async (req, email, password, done) => {
        try {
            const { first_name, last_name, birth_date } = req.body;
            
            const userExist = await userManager.findByEmail(email);
            if (userExist) return done(null, false, { message: "El email ya existe" });

            const hashedPassword = await userManager.hashData(password);

            const user = {
                first_name,
                last_name,
                email,
                birth_date,
                hashedPassword
            }
            
            const newUser = await userManager.createOne(user);
            return done(null, newUser);
        } catch (error) {
            return done(error);
        }
    })
);

// LOGIN
passport.use("login", new LocalStrategy(
    { 
        usernameField: "email",
    },
    async (email, password, done) => {
        const adminEmail = "adminCoder@coder.com"
        const adminPw = "adminCod3r123"
        try {
            if(email === adminEmail) {
                if(password === adminPw) return done(null, {
                    _id: "DEFAULT_ADMIN",
                    email: adminEmail, 
                    first_name: "Coder Admin", 
                    role: "admin",
                    cart: "653bb65e8619f8ed2c4864aa"
                })
                return done(null, false, { message: "El email o la contraseña son incorrectos" });
            } else{
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
    clientID: 'Iv1.1e4c3d1ebe00b034',//process.env.GITHUB_CLIENT_ID,
    clientSecret: 'b73a27d1d59877312d2d0a83e21dac23e1a78f3a', //process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:8080/api/users/auth/github/callback"
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const user = await userManager.findByEmail(profile._json.email);
        if(user){
            if (user.from_github) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        }
        
        const cart = await cartManager.createOne({})
        const newUser = await userManager.createOne({
            first_name: profile._json.name ? profile._json.name : profile._json.login,
            last_name: '',
            cart: cart._id,
            email: profile._json.email,
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
    done(null, {_id: user._id, first_name: user.first_name, last_name: user.last_name, email: user.email, cart: user.cart, role: user.role} );
});

// Deserializacion del usuario
passport.deserializeUser(async (data, done) => {
   try {
        if (data._id === "DEFAULT_ADMIN") return done(null, data); // SI ES EL CODERADMIN NO BUSCO EN LA BASE DE DATOS

        const user = await userManager.findById(data._id);
        done(null, user);
   } catch (error) {
        done(error);
   }
    
});

