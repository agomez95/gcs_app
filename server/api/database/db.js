'use strict'
/*
// Vinculación de los modelos al DB
db.User = require('./models/user')(db.connection, DataTypes);
db.Project = require('./models/project')(db.connection, DataTypes);
//db.Models = require('./models/models')(db.connection, DataTypes);

// Realiza las asociaciones declaradas en cada modelo
db.User.associate(db.connection.models);
db.Project.associate(db.connection.models);

module.exports = db;*/

const mysql = require('mysql2')
const config = require('../config/config')
const { promisify } = require('util')

//Falta especificar el Dialect, hay que averiguar
const pool = mysql.createPool({
    host: config.host,
    user: config.username,
    password: config.password,
    database: config.database
})

pool.getConnection((err,connection) => {
    if(err) { 
        if(err.code == 'PROTOCOL_CONNECTION_LOST') { 
            console.error('DATABASE CONNECTION WAS CLOSED')
        }
        if(err.code == 'ER_CON_COUNT_ERROR') { 
            console.error('DATABASE HAS TO MANY CONNECTIONS')
        }
        if(err.code == 'ECONNREFUSED') { 
            console.error('DATABASE CONNECTION WAS REFUSED')
        }
    }
    if(connection) connection.release()
    console.log('Database is Connected')
    return
})

pool.query = promisify(pool.query)
module.exports = pool