// variables de stockage module npm
const express = require("express");
const bodyParser = require("body-parser");

//importation mongoose (pour la connection à la bdd)
const mongooss = require("./db/db"); 
const cookieSession = require("cookie-session");
const helmet = require("helmet");
const xssClean = require("xss-clean");

// module npm  independance qui charge les variables d environnement
require("dotenv").config();

// variables de stockage des routes

const saucesRoutes = require("./routes/Sauce");
const userRoutes = require("./routes/user");

// variables modules path et inspector npm

const path = require("path");
const { Session } = require("inspector");

// desactivation de la mise en cache coté client
const nocache = require("nocache");

// appel  d'express dans applicaion

const app = express();

// methode helmet pour securite

app.use(helmet());

// methode pour modifier le cors le systeme de securite

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// securiser la session avec httponly et change de nom session par defaut

app.use(
  cookieSession({
    name: "session",
    secret: "s3CuR3T3",
    cookie: { secure: true, httpOnly: true, domain: "http://localhost:3000/",},
  })
);

// appel de fonction desactive cache
app.use(nocache());

// desactive x-powered-by activer par defaut les attaquants peuvent utilser cette entete et lancer une attaque
app.disable("x-powered-by");

// pour les demandes de post traite l objet json
app.use(bodyParser.json());

//methode faille xss-clean pour nettoyer
// les entrées utilisateur provenant du corps POST, des requêtes GET et des paramètres d'URL
app.use(xssClean());

app.use("/api/auth", userRoutes);
app.use("/api/sauces", saucesRoutes);
console.log(app.use("/api/sauces", saucesRoutes))
// gere les images dans le fichier image qui est statique
app.use("/images", express.static(path.join(__dirname, "images")));


//exportation du module pour pouvoir y acceder depuis les autre fichiers du projet
module.exports = app;

