const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    id: { type: Number, required: true }, // Número único para identificar el reporte
    description: { type: String, required: true }, // Descripción del reporte
    date: { type: Date, required: true } // Fecha del reporte
}, {collection: "Reports"});

module.exports = mongoose.model('Report', reportSchema);