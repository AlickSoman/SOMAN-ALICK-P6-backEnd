//importation mongoose (pour la connection à la BD)
const mongoose = require("mongoose"); 
//=====================================================conexion BD
require("dotenv").config();
mongoose.connect(
  //lien de connection à la basse de donnée
  (`${process.env.DB_LOG}`),
    //  process.env.DB_LOG,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !!"))
  .catch((error) => console.log("Connexion à MongoDB échouée !"));

  module.exports = mongoose;