import dotenv from 'dotenv';
import { __dirname } from '../utils.js';
import path from 'path';
import program from '../commander.js';

const mode = program.opts().mode;

dotenv.config({
    path: path.join(__dirname, '..', `.env.${mode}`),
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
    },
    PORT: process.env.PORT,
}
