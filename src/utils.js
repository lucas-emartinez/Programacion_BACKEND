import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';

export const __dirname = dirname(fileURLToPath(import.meta.url));

export const hashData = async (data) => {
    const hash = await bcrypt.hash(data, 10);
    return hash
};

export const compareData = async (data, hash) => {
    const result = await bcrypt.compare(data, hash);
    return result
};


