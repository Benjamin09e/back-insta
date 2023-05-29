//import
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const fs = require("fs");
const cors = require("cors");

//appelle d'express
const app = express();

//appelle de cors
app.use(cors());

//configuration
dotenv.config();

//liaison avec un fichier html
app.use(express.static("/public"));

//utilisation de json
app.use(express.json());

//recuperer les données du fichier json
const userdata = fs.readFileSync("./useurs.json");
const data = JSON.parse(userdata);
//console.log(data);

//afficher des données
app.get("/", (req, res) => {
  //console.log(req.params.ID);
  res.sendFile(path.join(__dirname, "./index.html"));
});

//envoyer des données
app.post("/", (req, res) => {
  //console.log(req.params.ID);
  const content = req.body;
  if (req.body.name) {
    try {
      res.status(200).json(content);
    } catch (error) {
      res.status(500).json("Erreur du post ");
    }
  } else {
    res.status(500).json("Erreur de la requette post ");
  }
});

//connexion (verification)
app.post("/api/login", (req, res) => {
  let email = req.body.email;
  let mot_de_passe = req.body.mot_de_passe;
  let utilisateurTouver = null;
  try {

    data.forEach((items) => {
      if (items.adresse_mail  === email ) {
        utilisateurTouver = items;
        if(items.mot_de_passe === mot_de_passe){
          //const token = items.user_token;
          res.status(200).json(" connexion correct !!!!! ");
        }else {
          res.status(500).json("Erreur sur le mot de passe connexion !!!!! ");
        }
      } 
    });
    if (utilisateurTouver === null) {
      res.status(500).json("Erreur de l'adresse email!!!!! ");
    }
  } catch (error) {
    res.status(500).json("Erreur de connexion !!!!! ");
  }
});



//modifier ou mettre à jour des données
app.put("/:id", (req, res) => {
  //console.log(req.params.ID);
  const Id = req.params.id;
  const content = req.body.content;
  try {
    let envoi = { _id: Id, content: content };
    res.status(200).json(envoi);
  } catch (error) {
    res.status(500).json("Erreur de put ");
  }
});

//supprimer des données
app.delete("/:id", (req, res) => {
  //console.log(req.params.ID);
  const id = req.params.id;
  if (id !== "Bengy") {
    return res.status(503).json("Erreur de nom");
  }
  try {
    res.status(200).json("suppression du nom");
  } catch (error) {
    res.status(500).json("Erreur de delete ");
  }
});

//lancement du serveur
app.listen(process.env.PORT, () => {
  console.log("App listening on port 5000");
});
