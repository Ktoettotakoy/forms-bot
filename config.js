import dotenv from 'dotenv';

dotenv.config();

const TOKEN = process.env.TOKEN;
const ADMINS = process.env.ADMIN_ID.split(',').map(id => parseInt(id.trim()));
const botAPI = process.env.botURL + TOKEN;
const webhookURL =  process.env.webhookURL;

export { TOKEN, ADMINS, botAPI, webhookURL };

