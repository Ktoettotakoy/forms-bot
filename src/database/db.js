import {db, Table} from './db.config.js'

import { PutCommand, GetCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';

// Create or Update users
const createOrUpdate = async (data = {}) => {
  const params = {
    TableName: Table,
    Item: data
  };

  try {
    const command = new PutCommand(params);
    const response = await db.send(command);
    return { success: true, operation: "create or update" };
  } catch (error) {
    return { success: false, operation: "create or update", error };
  }
};

// Read User by ID
const getUserById = async (value, key = 'id') => {
  const params = {
    TableName: Table,
    Key: {
      [key]: parseInt(value)
    }
  };

  try {
    const { Item = {} } = await db.send(new GetCommand(params));
    return { success: true, operation: "get", data: Item };
  } catch (error) {
    return { success: false, operation: "get", data: null, error };
  }
};

// Delete User by ID
const deleteUserById = async (value, key = 'id') => {
  const params = {
    TableName: Table,
      Key: {
        [key]: parseInt(value)
    }
  };

  try {
    await db.send(new DeleteCommand(params));
    return { success: true, operation: "delete" };
  } catch (error) {
    return { success: false, operation: "delete", error };
  }
};

// Console logs for success or failure of DB operations
const checkSuccess = (response) => {
  if (response.success) {
    console.log(`Database operation: ${response.operation} is successful!`);
  } else {
    console.error(`Failed to ${response.operation} user data:`, response.error);
  }
}

export {
  createOrUpdate,
  getUserById,
  deleteUserById,
  checkSuccess
};