'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const userSchema = require('./users.js');

const DATABASE_URL = process.env.NODE_ENV === 'test'
  ? 'sqlite::memory'
  : process.env.DATABASE_URL || 'postgres://localhost:5432/congress-stock-watch';

const DATABASE_CONFIG = process.env.NODE_ENV === 'production' ? {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
} : {};

const sequelize = new Sequelize(DATABASE_URL, DATABASE_CONFIG);
sequelize.sync()
  .then(() => console.log(`Successful connection to db: ${DATABASE_URL}`))
  .catch(err => console.error(err));

module.exports = {
  db: sequelize,
  users: userSchema(sequelize, DataTypes),
};
