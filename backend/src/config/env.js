import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Guarantee dotenv loads backend/.env before any other ES module evaluates
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const envPath = path.resolve(__dirname, '../../.env');
dotenv.config({ path: envPath });

export default process.env;
