// variable module npm token
const jwt = require("jsonwebtoken");
//importation pour utilisation des variables d'environnements
const dotenv = require('dotenv');
const result = dotenv.config();
if (result.error) {
  throw result.error
}console.log(result.parsed); 

// logique de la creation du token

module.exports = (req, res, next) => {
  try {
      //récupére le token dans le headers Authorization: Bearer token
    const token = req.headers.authorization.split(" ")[1];//on récupére le 2eme élement du tableau qui est le token
    const decodedToken = jwt.verify(token,`${process.env.JWT_DECODEDTOKEN}`);
    
     //Récupère le user Id
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw "l'ID n'est pas valable ou n'existe pas";
    } else {
      next();//passer la requête au middleware suivant
    }
  } catch {
    res.status(401).json({error:"Requête non authentifiée" +error })
  }
};
