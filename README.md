# Forms Bot on Node.js + Amazon

## Overview
This project is a Telegram bot developed using Node.js. It integrates with various AWS services to handle forms and user interactions effectively. The primary purpose of this bot is to manage and respond to user commands and inputs, storing and processing data via AWS services.

## Services Used
- **API Gateway**: Used to handle HTTP requests and trigger the AWS Lambda function.
- **DynamoDB**: A NoSQL database used to store user data and bot configurations.
- **AWS Lambda**: Used to run the bot's backend code in a serverless environment.

## Project Structure
src/
  ├── database/
  │   ├── db-config.js
  │   └── db-commands.js
  ├── handlers/
  │   ├── command-handler.js
  │   ├── echo-handler.js
  │   └── fsm-handler.js
  └── resources/
      ├── keyboards.js
      └── text.js
config.js
index.js
package.json
add .env here as well!

## Detailed File Description

### Handlers
- **command-handler.js**: Handles various bot commands like `/start`, `/help`, `/add_option_button`, etc.
- **echo-handler.js**: Handles the default state where the bot echoes user messages.
- **fsm-handler.js**: Manages finite state machine transitions based on user inputs for different states (e.g., waiting for service choice, address, or phone number).

### Database
- **db-config.js**: Contains configuration for connecting to the DynamoDB database.
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