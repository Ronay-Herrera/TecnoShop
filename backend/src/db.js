const express = require('express');
require("dotenv").config();
const cors = require("cors");
const mongoose = require('mongoose');
const OrderRoute = require('./routes/ordersRoute.js');
const ProductRoute = require('./routes/productsRoute');
const LoginRoute = require('./routes/loginRoute.js');
const ReportRoute = require('./routes/reportsRoute.js');


const url = process.env.MONGO_URI;
const port = process.env.PORT || 3000;
const app = express();

// Middlewares
app.use(cors({
    origin: "http://localhost:4200",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
})); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/orders', OrderRoute);
app.use('/products', ProductRoute);
app.use('/login', LoginRoute);
app.use('/reports', ReportRoute);

// Conexión a la Base de Datos
mongoose.Promise = global.Promise;
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database Connected Successfully!!");    
}).catch(err => {
    console.error('Could not connect to the database', err);
    process.exit();
});

// Ruta Principal
app.get('/', (req, res) => {
    res.json({"message": "Hello Crud Node Express"});
});

// Iniciar el Servidor
app.listen(port, '0.0.0.0',() => {
    console.log(`Server is listening on port ${port}`);
});

