import { cartManager } from "../dao/managers/CartManager.js";
import { userManager } from "../dao/managers/UserManager.js"
import { compareData, hashData } from "../utils.js";

class UserService {

    constructor() {
        this.userManager = userManager;
        this.cartManager = cartManager;
    }


    async findAll() {
        return await this.userManager.findAll();
    }

    async findByEmail(email) {
        return await this.userManager.findByEmail(email);
    }

    findById = async (id) => {
        return await this.userManager.findById(id);
         
    }

    async createUser() {
        const userExist = await this.userManager.findByEmail(email);
        if (userExist) return res.status(400).json({ error: "El email ya existe" });

        const hashedPassword = await hashData(password);
        const cart = await this.cartManager.createOne({ products: [] });
        const user = {
            first_name,
            last_name,
            email,
            birth_date,
            password: hashedPassword,
            cart: cart._id,
        }
        const newUser = this.userManager.createOne(user);
        return newUser
    }

    createSession = async (email, password) => {
        if (email !== "adminCoder@coder.com") {
            const userDatabase = await this.userManager.findByEmail(email);
            if (!userDatabase) throw new Error("Usuario no encontrado");

            const passwordMatch = await compareData(password, userDatabase.password);
            if (!passwordMatch) throw new Error("El email o la contraseña son incorrectos");

            return {
                path: '/products',
                sessionData: {
                    email: userDatabase.email,
                    first_name: userDatabase.first_name,
                    cart: userDatabase.cart._id,
                    role: userDatabase.role,
                    isAdmin: userDatabase.role === 'admin'
                }
            };
        } else {
            if (password !== "adminCod3r123") throw new Error("El email o la contraseña son incorrectos");

            return {
                path: '/realtimeproducts',
                sessionData: {
                    email: email,
                    first_name: 'Coder Admin',
                    cart: '653bb65e8619f8ed2c4864aa',
                    role: 'admin',
                    isAdmin: true
                }
            };
        }
    }
}

export const userService = new UserService();