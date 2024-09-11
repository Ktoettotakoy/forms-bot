# Forms Bot on Node.js + Amazon

## Overview
This project is a Telegram bot developed using Node.js. It integrates with various AWS services to handle forms and user interactions effectively. The primary purpose of this bot is to manage and respond to user commands and inputs, storing and processing data via AWS services.

## Services Used
- **API Gateway**: Used to handle HTTP requests and trigger the AWS Lambda function.
- **DynamoDB**: A NoSQL database used to store user data and bot configurations.
- **AWS Lambda**: Used to run the bot's backend code in a serverless environment.

## Project Structure
```
src/
|-- database/
|   |-- db-config.js
|   |-- db-commands.js
|-- handlers/
|   |-- command-handler.js
|   |-- echo-handler.js
|   |-- fsm-handler.js
|-- resources/
|   |-- keyboards.js
|   |-- phrases.js
config.js
index.js
package.json
add .env here as well!
```

## Startup
To start you have to 
```
git clone https://github.com/Ktoettotakoy/forms-bot.git
```
Then 
```
cd forms-bot
```
Then check if you have node installed (node -v in a terminal)
```
npm install
``` 
It should install all the packages specified in package.json
The last step is to add .env file. In my case it is 
```
touch .env
```
It should contain 5 env variables specified further. 

## Detailed File Description

### Environment Configuration (config.js)

The `config.js` file is responsible for loading environment variables using the `dotenv` module.

### Bot Initialization and Event Handling (index.js)

The `index.js` file contains the main logic for handling incoming events and processing bot commands. The `handler` function is the entry point for the AWS Lambda function. Depending on whether the incoming message is a command or a regular message, the function routes the message to the appropriate command handler or finite state machine (FSM) handler, respectively. Once processing is complete, the function constructs a response object with a status code and message, indicating the processing status. It's pretty bad written, but works fine. 

### Handlers
- **command-handler.js**: Handles various bot commands like `/start`, `/help`, `/add_option_button`, etc.
- **echo-handler.js**: Handles the default state where the bot echoes user messages.
- **fsm-handler.js**: Manages finite state machine transitions based on user inputs for different states (e.g., waiting for service choice, address, or phone number).

### Database
- **db-config.js**: Contains configuration for connecting to the DynamoDB database. Note, names for databases are hardcoded!
- **db-commands.js**: Contains commands for interacting with the database, such as retrieving user data and checking operation success.

### Resources
- **keyboards.js**: Manages the creation and configuration of custom keyboards for the bot.
- **text.js**: Contains various text responses and templates used by the bot.

### Environment Variables
The bot relies on several environment variables for its configuration. These should be defined in a `.env` file at the root of the project:

- `TOKEN`: Telegram bot token.
- `ADMIN_ID`: Comma-separated list of admin IDs.
- `ADMIN_CHAT_ID`: Chat ID of the admin.
- `ACCESS_KEY`: AWS access key.
- `SECRET_ACCESS_KEY`: AWS secret access key.

## Build and Deployment
To build the project, run:

```npm run build```

This command will create a project.zip file containing all necessary files for deployment. The project can be deployed to AWS Lambda via the AWS Console or using AWS CLI tools.