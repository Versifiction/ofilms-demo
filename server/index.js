const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const passport = require("passport");
const moment = require("moment");
const urlencodedParser = bodyParser.urlencoded({
  extended: true
});
const cors = require("cors");
const mongoose = require("mongoose");
const port = process.env.PORT || 5000;
const users = require("./routes/api/users");
require("dotenv").config();

app.use(cors());
app.use(urlencodedParser);
app.use(bodyParser.json());
app.use(passport.initialize());
require("./config/passport")(passport);

app.use("/api/users", users);

mongoose.set("useCreateIndex", true);
mongoose
  .connect(`mongodb://${process.env.PORT_DB}/${process.env.COLLECTION}`, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log(
      "La connexion à la base de données MongoDB s'est bien déroulée"
    );
  })
  .catch(e =>
    console.log("Erreur lors de la connexion à la base de données ", e)
  );

app.get("/", (req, res) => {
  res.send("Bienvenue sur la page d'accueil de l'API d'OFilms");
});

app.get("/date", (req, res) => {
  res.send(
    "Nous sommes le " +
      moment(new Date())
        .locale("fr")
        .format("LLLL")
  );
});

app.listen(port, function() {
  console.log("Le serveur tourne sur le port " + port);
});
