import mongoose from "mongoose";
import config from "../config/config.js";

export default class MongoSingleton {

    static #instance;

    constructor() {
        mongoose.connect(
            config.mongoDB.url, 
            { useNewUrlParser: true,useUnifiedTopology: true}
        ).then(() => console.log("MongoDB connected"))
        .catch((err) => console.log(`MongoDB connection error: ${err}`));
    }

    static getInstance() {
        if (this.#instance){
            return this.#instance;
        }
        this.#instance = new MongoSingleton();
        return this.#instance;
    }
}


