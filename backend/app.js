const express = require('express');
const cors = require('cors')
const morgan = require("morgan")

const app = express()

const db = require('./database')

const port = (process.env.PORT || 5000)

//Midlewares
app.use(express.json());
app.use(morgan('dev'))
app.use(cors())

//routes
app.use('/auth', require('./routes/user.routes'))
app.use('/menu', require('./routes/menu.routes'))

app.listen(port, () => console.log("App conectada correctamente en el puerto", port))