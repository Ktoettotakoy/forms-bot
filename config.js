import dotenv, { config } from 'dotenv';

dotenv.config();
module.exports = {
    TOKEN: process.env.TOKEN,
    botAPI: process.env.botURL + TOKEN,
    webhookURL: process.env.webhookURL
}


