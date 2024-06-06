import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { ACCESS_KEY, SECRET_ACCESS_KEY } from '../../config.js';

const client = new DynamoDBClient({
    region: 'eu-west-1',
    credentials: {
        accessKeyId: ACCESS_KEY,
        secretAccessKey: SECRET_ACCESS_KEY
    }
});

const db = DynamoDBDocumentClient.from(client);

const userTable = 'forms-bot-users';
const resTable = 'forms-bot-additional-resources';

export { db, userTable, resTable };