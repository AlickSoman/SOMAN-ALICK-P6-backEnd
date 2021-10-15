//importation mongoose (pour la connection à la BD)
const mongoose = require("mongoose"); 
//=====================================================conexion BD

mongoose.connect(
    'mongodb://User001:user001@clusterp6oc-shard-00-00.hgacb.mongodb.net:27017,clusterp6oc-shard-00-01.hgacb.mongodb.net:27017,clusterp6oc-shard-00-02.hgacb.mongodb.net:27017/dbP6OC?ssl=true&replicaSet=atlas-64qh95-shard-0&authSource=admin&retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !!"))
  .catch((error) => console.log("Connexion à MongoDB échouée !" + error));

  module.exports = mongoose;