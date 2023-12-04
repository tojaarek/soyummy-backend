const mongoose = require('mongoose');
const { mongoConnectionString } = require('./config.js');

class UnknownDatabaseError extends Error {
  constructor() {
    super('Something went wrong at database layer.');
  }
}

const connect = async () => {
  try {
    await mongoose.connect(mongoConnectionString);
  } catch (error) {
    console.error(error);
    throw new Error('Database connection failed');
  }
};

const disconnect = async () => {
  try {
    await mongoose.disconnect();
  } catch (error) {
    console.error(error);
    throw new Error('Cannot disconnect from database');
  }
};

module.exports = {
  connect,
  disconnect,
  UnknownDatabaseError,
};
