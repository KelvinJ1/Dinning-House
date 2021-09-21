const mongoose = require("mongoose")

const atlas = "mongodb+srv://admin:oCV2r4F6uQfSWnJR@cluster0.812fi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose.connect(atlas, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(db => console.log("Conectado Correctamente a la BD :)"))
    .catch(err => console.log(err))

module.exports = mongoose;