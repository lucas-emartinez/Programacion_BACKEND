import { messageManager } from "../dao/mongoDAO/MessageManager.js";


class MessageService {
  constructor() {
    this.messageManager = messageManager
  }

  createOne(message) {
    this.messageManager.createOne(message);
  }

  findAll() {
    return this.messageManager.findAll();
  }

}

export const messageService = new MessageService();