import dotenv from 'dotenv';

dotenv.config();

const TOKEN = process.env.TOKEN;
const ADMINS = process.env.ADMIN_ID.split(',').map(id => parseInt(id.trim()));
const ADMIN_CHAT_ID = process.env.ADMIN_CHAT_ID
const ACCESS_KEY = process.env.ACCESS_KEY;
const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY;

export { TOKEN, ADMINS, ADMIN_CHAT_ID, ACCESS_KEY, SECRET_ACCESS_KEY };

