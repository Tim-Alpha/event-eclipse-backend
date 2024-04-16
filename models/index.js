import fs from 'fs';
import path from 'path';
import { Sequelize, DataTypes } from 'sequelize';
import dotenv from 'dotenv'

dotenv.config()
import config from '../config/config.json' assert { type: "json" };

const __dirname = path.dirname(new URL(import.meta.url).pathname);

console.log(config['development'].host);

const sequelize = new Sequelize({
  dialect: 'mariadb',
  host: config['development'].host,
  database: config['development'].database,
  username: config['development'].username,
  password: config['development'].password,
});

const dbModels = {};

fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== 'index.js' && // Exclude index.js
      file.slice(-3) === '.js'
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file)).default;
    dbModels[model.name] = model.init(sequelize, DataTypes);
  });

Object.values(dbModels).forEach(model => {
  if (model.associate) {
    model.associate(dbModels);
  }
});

const db = {
  sequelize: sequelize,
  models: dbModels,
};

export default db;