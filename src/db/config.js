import mongoose from "mongoose";
import config from "../config/config.js";

mongoose
    .connect(config.mongoDB.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('DB is connected'))
    .catch(e => console.log(`DB is not connected, error: ${e}`));


