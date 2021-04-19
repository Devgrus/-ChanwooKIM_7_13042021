const express = require('express')
const bodyParser = require('body-parser')
const path = require('path');
const cors = require('cors')

//Importer les routes sauce et user
//const sauceRoutes = require('./routes/sauce');
//const userRoutes = require('./routes/user');

const app = express();

// Pour éviter les erreurs de CORS
app.use(cors());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Cacher le header 'x-powered-by'
app.disable('x-powered-by');

// Utiliser le package <bodyParser>
app.use(bodyParser.json());

const postRoutes = require("./routes/post")

//app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/post', postRoutes);
//app.use('/api/auth', userRoutes);

module.exports = app;