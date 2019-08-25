const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

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

app.listen(PORT, function() {
  console.log("Le serveur tourne sur le port: " + PORT);
});
