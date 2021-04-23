const express = require('express')
const bodyParser = require('body-parser')
const path = require('path');
const cors = require('cors')

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

//Importer les routes post et user
const postRoutes = require("./routes/post")
const userRoutes = require('./routes/user');

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/posts', postRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;