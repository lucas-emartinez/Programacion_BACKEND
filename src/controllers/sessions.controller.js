import { userService } from "../services/users.service.js";
import { compareData, generateToken } from "../utils.js";


class SessionController {
    constructor() {
        this.userService = userService
    }

    githubLogin = async (req, res) => {
        const token = await generateToken({email: req.user.email, role: req.user.role, cart: req.user.cart});
        return res
                .status(200)
                .cookie('token', token, {
                    httpOnly: true,
                    maxAge: 600000
                })
                .redirect('/products');  
    }
    
    googleLogin = async (req, res) => {
        const token = await generateToken({email: req.user.email, role: req.user.role, cart: req.user.cart});
        return res
                .status(200)
                .cookie('token', token, {
                    httpOnly: true,
                    maxAge: 600000
                })
                .redirect('/products');
    }
    
    login = async (req, res) => {
        const { email, password } = req.body;
        const adminEmail = "adminCoder@coder.com"
        const adminPw = "adminCod3r123"
        if (!email || !password) return res.status(400).json({ error: "Faltan datos" });
    
        let token = null;
        if (email === adminEmail && password === adminPw) {
            token = generateToken({email, role: 'admin', cart: '653bb65e8619f8ed2c4864aa'});
            return res
                    .status(200)
                    .cookie('token', token, {
                        httpOnly: true,
                        secure: false,
                        sameSite: 'strict',
                        maxAge: 600000
                    })
                    .json({ token, redirect: '/realtimeproducts' });
        } else {
            try {
                const user = await userService.findByEmail(email);
                if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
            
                const passwordMatch = await compareData(password, user.password);
                if (!passwordMatch) return res.status(400).json({ error: "El email o la contraseña son incorrectos" });
                
                const token = await generateToken({email, role: user.role, cart: user.cart._id});
                return res
                        .status(200)
                        .cookie('token', token, {
                            httpOnly: true,
                            secure: false,
                            sameSite: 'strict',
                            maxAge: 600000
                        })
                        .json({ token, redirect: '/products' });
            } catch (error) {
                return res.status(500).json({ error: error.message });
            }
        }
        
    }
    
    logout = async (req, res) => {
        res.clearCookie('token')
        return res.status(200).redirect('/login');
    }
}

export const sessionController = new SessionController();