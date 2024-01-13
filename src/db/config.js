import mongoose from "mongoose";
import config from "../config/env.js";

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
            console.log("Ya existe una instancia de Mongo");
            return this.#instance;
        }
        this.#instance = new MongoSingleton();
        return this.#instance;
    }
}


