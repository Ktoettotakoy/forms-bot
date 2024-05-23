import { ACCESS_KEY, SECRET_ACCESS_KEY } from '../../config.js'
import AWS from 'aws-sdk'


AWS.config.update({
    region: "eu-west-1",
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY
})

const db = new AWS.DynamoDB.DocumentClient()

const Table = 'forms-bot-users'

export {
    db,
    Table
}