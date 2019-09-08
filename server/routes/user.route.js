const express = require("express");
const userRoutes = express.Router();

let User = require("../models/schemaUser");

userRoutes.route("/add").post(function(req, res) {
  let user = new User(req.body);
  user
    .save()
    .then(user => {
      res.status(200).json({ User: "User ajouté avec succès" });
    })
    .catch(err => {
      res.status(400).send("Impossible d'enregistrer en base de données");
    });
});

userRoutes.route("/").get(function(req, res) {
  User.find(function(err, user) {
    if (err) {
      console.log(err);
    } else {
      res.json(user);
    }
  });
});

userRoutes.route("/edit/:id").get(function(req, res) {
  let id = req.params.id;
  User.findById(id, function(err, user) {
    res.json(user);
  });
});

//  Defined update route
userRoutes.route("/update/:id").post(function(req, res) {
  User.findById(req.params.id, function(err, user) {
    if (!user) res.status(404).send("Donnée non trouvée");
    else {
      user.person_name = req.body.person_name;
      user.user_name = req.body.user_name;
      user.user_gst_number = req.body.user_gst_number;

      user
        .save()
        .then(user => {
          res.json("Update réalisée");
        })
        .catch(err => {
          res.status(400).send("Impossible d'enregistrer en base de données");
        });
    }
  });
});

// Defined delete | remove | destroy route
userRoutes.route("/delete/:id").get(function(req, res) {
  User.findByIdAndRemove({ _id: req.params.id }, function(err, user) {
    if (err) res.json(err);
    else res.json("Enlevé avec succès");
  });
});

module.exports = userRoutes;
