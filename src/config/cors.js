
const whitelist = ['http://localhost:8080'];
export const corsOptions = {
    origin: (origin, callback) => {
        // Habilita el acceso al servidor de cualquier origen
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    }
}