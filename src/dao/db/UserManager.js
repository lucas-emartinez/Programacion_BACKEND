import { usersModel } from '../models/users.model.js'
import BaseManager from './BaseManager.js'


class UserManager extends BaseManager {
    constructor() {
        super(usersModel)
    }

    // Metodo abstracto implementado
    async findAll() {
        try {
            const users = await this.model.find();
            return users;
        } catch (error) {
            return `Error al obtener los usuarios: ${error}`;
        }
    }

    // Busca un usuario por email
    async findByEmail(email) {
        try {
            const user = await this.model.findOne({ email });
            return user;
        } catch (error) {
            return `Error al obtener el usuario: ${error}`;
        }
    }
}

export const userManager = new UserManager();

