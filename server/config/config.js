require('dotenv').config()
module.exports = {
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_DATABASE || "gcs_app",
    host: process.env.DB_HOST || "localhost",
    dialect: process.env.DB_DIALECT || "mysql",
    define: {
        underscored: true,
        underscoredAll: true,
    },
}