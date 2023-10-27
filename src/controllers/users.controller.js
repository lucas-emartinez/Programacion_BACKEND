import { cartManager } from "../dao/db/CartManager.js";
import { userManager } from "../dao/db/UserManager.js";
import { compareData, hashData } from "../utils.js";

// Creacion de usuario y asignacion de un carrito unico
const createUser = async (req, res) => {
    try {
        const { first_name, last_name, email, password, birth_date } = req.body;


        // Birth date validation
        const birthDate = new Date(birth_date);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const month = today.getMonth() - birthDate.getMonth();
        if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        if (age < 18) return res.status(400).json({ error: "Debe ser mayor de 18 años para registrarse" });
        if (age > 99) return res.status(400).json({ error: "La fecha de nacimiento es inválida" });

        // Email validation
        const userExist = await userManager.findByEmail(email);
        if (userExist) return res.status(400).json({ error: "El email ya existe" });

        // Password validation
        if (password.length < 8) return res.status(400).json({ error: "La contraseña debe tener al menos 8 caracteres" });
        
        // Encriptamos la contraseña
        const hashedPassword = await hashData(password); 
        

        const cart = await cartManager.createOne();

        const user = {
            first_name,
            last_name,
            email,
            cart: cart._id,
            birth_date,
            password: hashedPassword
        }

        const newUser = await userManager.createOne(user)

        return res.status(201).json({message: "Usuario creado", user: newUser});
    } catch (error) {
        return res.status(400).json({error: error.message});
    }
};

const destroySession = async (req, res) => {
    try {
        req.session.destroy(()=> {
            res.redirect('/login')
        });
    } catch (error) {
        return res.status(400).json({ error: error });
    }
}

// Creacion de sesion
const createSession = async (req, res) => {
    const { email, password } = req.body;
    
    try {

        if(email == "adminCoder@coder.com") {
            console.log("ok")
            const userDatabase = await userManager.findByEmail(email);
            if (!userDatabase) return res.status(404).json({ error: "Usuario no encontrado" })

            const passwordMatch = await compareData(password, userDatabase.password);
            if (!passwordMatch) return res.status(400).json({ error: "El email o la contraseña son incorrectos" });

            console.log(email, password)
            req.session["email"] = userDatabase.email;
            req.session["first_name"] = userDatabase.first_name;
            req.session["cart"] = userDatabase.cart._id;
            req.session["isAdmin"] = userDatabase.role === 'admin' ? true : false;

            return res.redirect('/products');
        } else {

            if (req.body.password !== "adminCod3r123") return res.status(400).json({ error: "El email o la contraseña son incorrectos" });

            req.session["email"] = req.body.email;
            req.session["first_name"] = 'Coder Admin';
            req.session["isAdmin"] = true

            return res.redirect('/realtimeproducts');
        }
        
        
    } catch (error) {
        console.log(error)
        return res.status(400).json({ error: error });
    }
   
};



export default {
    createSession,
    destroySession,
    createUser
}