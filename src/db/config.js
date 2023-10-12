import mongoose from "mongoose";

const URI = //POR CHAT DE CODER


mongoose
    .connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('DB is connected'))
    .catch(e => console.log(`DB is not connected, error: ${e}`));


