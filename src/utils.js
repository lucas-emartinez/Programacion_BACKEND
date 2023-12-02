import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const JWT_SECRET = 'JWTSecret';
export const __dirname = dirname(fileURLToPath(import.meta.url));

export const hashData = async (data) => {
    const hash = await bcrypt.hash(data, 10);
    return hash
};

export const compareData = async (data, hash) => {
    const result = await bcrypt.compare(data, hash);
    return result
};

export const generateToken = (user) => {
    const token = jwt.sign(
        {
            id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            role: user.role
        },
        JWT_SECRET,
        { expiresIn: '1h' }
    );
    return token
}

export const mongoIdRegex = new RegExp("^[0-9a-f]{24}$");

