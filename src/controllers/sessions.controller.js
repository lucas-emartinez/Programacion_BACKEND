import { cartManager } from "../dao/db/CartManager.js";
import { userManager } from "../dao/db/UserManager.js";
import { compareData, generateToken, hashData } from "../utils.js";


const signup = async (req, res) => {
    const { first_name, last_name, birth_date, email, password, role } = req.body;
    if (!first_name || !last_name || !birth_date || !email || !password) return res.status(400).json({ error: "Faltan datos" });
    try {
        const userExist = await userManager.findByEmail(email);
        if (userExist) return res.status(400).json({ error: "El email ya existe" });

        const hashedPassword = await hashData(password);
        const cart = await cartManager.createOne({});
        const user = {
            first_name,
            last_name,
            email,
            birth_date,
            password: hashedPassword,
            cart: cart._id,
        }
        const newUser = await userManager.createOne(user);
        return res.status(201).json(newUser);
    } catch (error) {
        return res.status(500).json({ error: error });
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const user = await userManager.findByEmail(email);
        if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
    
        const passwordMatch = await compareData(password, user.password);
        if (!passwordMatch) return res.status(400).json({ error: "El email o la contraseña son incorrectos" });
        
        const token = generateToken({email, role: user.role, cart: user.cart._id});
        return res
                .status(200)
                .cookie('token', token, {
                    httpOnly: true,
                    secure: false,
                    sameSite: 'strict',
                    maxAge: 600000
                })
                .json({ token });
    } catch (error) {
        return res.status(500).json({ error: error });
    }
}

export default { login, signup };