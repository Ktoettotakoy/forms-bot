import dotenv from 'dotenv';

dotenv.config();

const TOKEN = process.env.TOKEN;
const ADMINS = process.env.ADMIN_ID.split(',').map(id => parseInt(id.trim()));
const botAPI = process.env.botURL + TOKEN;
const webhookURL =  process.env.webhookURL;
const ACCESS_KEY = process.env.ACCESS_KEY;
const SECRET_ACCESS_KEY = process.env.SECRET_ACCESS_KEY;

export { TOKEN, ADMINS, botAPI, webhookURL, ACCESS_KEY, SECRET_ACCESS_KEY };

