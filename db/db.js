//importation mongoose (pour la connection à la BD)
const mongoose = require("mongoose"); 
//=====================================================conexion BD

mongoose.connect(
   
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !!"))
  .catch((error) => console.log("Connexion à MongoDB échouée !" + error));

  module.exports = mongoose;