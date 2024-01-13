import { userService } from "../services/users.service.js";
import { compareData } from "../utils.js";

class UserController {
    constructor() {
        this.userService = userService;
    }

    signup = async (req, res) => {
        const { first_name, last_name, birth_date, email, password, role } = req.body;
        if (!first_name || !last_name || !birth_date || !email || !password) return res.status(400).json({ error: "Faltan datos" });

        try {
            const newUser = await this.userService.createUser();
            return res.status(201).json(newUser);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    // Busqueda de usuario por ID
    findUserById = async (req, res) => {
        try {
            const { userId } = req.params;
            const user = await this.userService.findById(userId)
            return res.status(200).json({ user });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    };


    destroySession = (req, res) => {
        try {
            req.session.destroy(() => {
                res.redirect('/login')
            });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    // Creacion de sesion
    createSession = async (req, res) => {
        const { email, password } = req.body;

        try {
            const result = await this.userService.createSession(email, password);

            Object.assign(req.session, result.sessionData);

            return res.redirect(result.path);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        };
    }
}

export const userController = new UserController();


