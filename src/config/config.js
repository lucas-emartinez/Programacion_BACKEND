import dotenv from 'dotenv';
import { __dirname } from '../utils.js';
import path from 'path';

dotenv.config({
    path:  path.join(__dirname, '..', '.env')
});

export default {
    mongoDB: {
        url: process.env.MONGO_URI,
    },
    google: {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    github: {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL,
    }
}
