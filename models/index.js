'use strict';

import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import dotenv from 'dotenv';
const { readdirSync } = fs;
const { basename } = path;

dotenv.config();

const { NODE_ENV, DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME } = process.env;

const env = NODE_ENV || 'development';
import config from '../config/config.json';

console.log("Configuration Data:");
console.log(config);

const { use_env_variable } = config[env];

const db = {};

let sequelize;
if (use_env_variable) {
  sequelize = new Sequelize(process.env[use_env_variable], config);
} else {
  sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'mysql',
  });
}

readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
