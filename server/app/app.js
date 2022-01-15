const express = require('express')
const { connection } = require('./database/db')

//Server Settings
const app = express();
app.set('port', process.env.PORT || 4000)

//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//Routes

//Start Server and call connection with DB
app.listen(app.get('port'), () => {
    console.log("SERVER ON: " , app.get('port'))
    connection.sync({ force: false }).then(() => {
        console.log("CONNECTION DONE")
    })
})