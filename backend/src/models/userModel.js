const mongoose = require("mongoose")

const usuariosSchema = new mongoose.Schema({
    nombre : String,
    apellido : String,
    email : String,
    password : String,
    rol : Number
}, {collection: "Users"});

module.exports = mongoose.model("Users", usuariosSchema)