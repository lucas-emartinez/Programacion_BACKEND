import { messagesModel } from "../models/messages.model.js";
import BaseManager from "./BaseManager.js";


class MessageManager extends BaseManager {
    constructor() {
        super(messagesModel);
    }

    // Implementacion de metodo abstracto
    async findAll(){
        try {
            const messages = await this.model.find();
            return messages;
        } catch (error) {
            return `Error al obtener los mensajes: ${error}`;
        }
    }
}

export const messageManager = new MessageManager();