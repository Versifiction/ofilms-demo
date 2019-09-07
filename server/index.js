const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const moment = require('moment');
const urlencodedParser = bodyParser.urlencoded({
  extended: true
});
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = 4000;

app.use(cors());
app.use(urlencodedParser);
app.use(bodyParser.json());

mongoose.set('useCreateIndex', true);
mongoose
  .connect("mongodb://127.0.0.1:27017/ofilms", { useNewUrlParser: true })
  .then(() => {
    console.log(
      "La connexion à la base de données MongoDB s'est bien déroulée"
    );
  })
  .catch(e =>
    console.log("Erreur lors de la connexion à la base de données ", e)
  );
  
app.use("/user", router);
require(__dirname + "/controllers/userController")(router);

app.get('/', (req, res) => {
  res.send("Bienvenue sur la page d'accueil de l'API d'OFilms");
})

app.get('/date', (req, res) => {
  res.send("Nous sommes le " + moment(new Date()).locale('fr').format('LLLL'));
})

app.listen(PORT, function() {
  console.log("Le serveur tourne sur le port: " + PORT);
});
