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

module.exports = db;