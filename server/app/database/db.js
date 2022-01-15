'use strict'

//Sequelize module declaration
const { Sequelize, DataTypes } = require('sequelize')

//Config file declaration
const config = require('../../config/config')

//DB object creation
const db = {}

//Start connection with DB
db.connection = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
        host: config.host,
        dialect: config.dialect
    }
)

// Vinculación de los modelos al DB
db.User = require('./models/user')(db.connection, DataTypes);
db.Project = require('./models/project')(db.connection, DataTypes);

// Realiza las asociaciones declaradas en cada modelo
db.User.associate(db.connection.models);
db.Project.associate(db.connection.models);

module.exports = db;