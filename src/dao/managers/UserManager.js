import { usersModel } from '../models/users.model.js'
import BaseManager from './baseManager.js'


class UserManager extends BaseManager {
    constructor() {
        super(usersModel, { path: 'cart', populate: { path: 'products.product' } })
    }

    // Metodo abstracto implementado
    async findAll() {
        const users = await this.model.find().populate(this.populateOption);
        if (!users) throw new Error('No hay usuarios');
        return users;
    }

    // Busca un usuario por email
    async findByEmail(email) {
        const user = await this.model.findOne({ email }).populate(this.populateOption);
        if (!user) throw new Error('El usuario no existe');
        return user;
    }
}

export const userManager = new UserManager();

