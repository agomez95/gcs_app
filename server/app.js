const express = require('express')
const { connection } = require('./api/database/db')

//Server Settings
const app = express();

//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//Routes
app.get("/", (req, res) => {
    res.json({ message: "Bienvenido a la pagina de inicio" });
})

app.use('/users',require('./api/routes/user'))
app.use('/projects',require('./api/routes/project'))
app.use('/users_projects',require('./api/routes/user_project'))
app.use('/methodologys', require('./api/routes/methodology'))
app.use('/phases', require('./api/routes/phase'))

module.exports = app

