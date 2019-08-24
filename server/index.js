const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/ofilms', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("La connexion à la base de données MongoDB s'est bien déroulée");
})

app.listen(PORT, function() {
    console.log("Le serveur tourne sur le port: " + PORT);
});