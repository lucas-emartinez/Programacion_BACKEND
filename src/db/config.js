import mongoose from "mongoose";

export const URI = "mongodb+srv://lucasemartinez:DgveGoxDyMjqWHro@cursobackend.kttj3g1.mongodb.net/ecommerce?retryWrites=true&w=majority"


mongoose
    .connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('DB is connected'))
    .catch(e => console.log(`DB is not connected, error: ${e}`));


