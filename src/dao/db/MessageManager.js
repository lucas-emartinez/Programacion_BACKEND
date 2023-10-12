import { messagesModel } from "../models/messages.model.js";
import BaseManager from "./BaseManager.js";


class MessageManager extends BaseManager {
    constructor() {
        super(messagesModel);
    }
}

export const messageManager = new MessageManager();