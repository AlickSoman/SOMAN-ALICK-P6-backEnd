// variables de stockage module npm
const cors = require('cors');
const express = require("express");
const bodyParser = require("body-parser");
//importation mongoose (pour la connection à la bdd)
const mongooss = require("./db/db"); 
const cookieSession = require("cookie-session");
const helmet = require("helmet");
const xssClean = require("xss-clean");
// module npm  independance qui charge les variables d environnement

// variables modules path et inspector npm
const path = require("path");
const { Session } = require("inspector");
const nocache = require("nocache"); // desactivation de la mise en cache coté client
const app = express(); // appel  d'express dans applicaion
//appel CORS
app.use(cors());
// methode pour modifier le cors le systeme de securite
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 
  'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  if (req.method === 'OPTIONS'){
    res.setHeader(
      'Access-Control-Allow-Methods',
     'GET, POST, PUT, PATCH, DELETE'
     );
    return res.status(200).json({});
  }
  next();
});
// pour les demandes de post traite l objet json
app.use(bodyParser.json());

app.use(helmet()); // methode helmet pour securiser les header http

// securiser la session avec httponly et change de nom session par defaut

app.use(
  cookieSession({
    name: "session", secret: "s3CuR3T3",
    cookie: { secure: true, httpOnly: true, domain: "http://localhost:3000/",},
  }));

// appel de fonction desactive cache
app.use(nocache());

// desactive x-powered-by activer par defaut les attaquants peuvent utilser cette entete et lancer une attaque

app.disable("x-powered-by");

// cross scripting protection (helmet)
app.use((req, res, next) =>{
  res.header("X-XSS-Protection", "1; mode=block");
  next();
})
//methode faille xss-clean pour nettoyer
// les entrées utilisateur provenant du corps POST, des requêtes GET et des paramètres d'URL
app.use(xssClean());

// variables de stockage des routes
const saucesRoutes = require("./routes/Sauces");
const userRoutes = require("./routes/user");
// gere les images dans le fichier image qui est statique
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/sauces", saucesRoutes);
app.use("/api/auth", userRoutes);
// console.log(saucesRoutes)

//exportation du module pour pouvoir y acceder depuis les autre fichiers du projet
module.exports = app;

