// variable module npm token
const jwt = require("jsonwebtoken");

// logique de la creation du token

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
     //Récupère le user Id
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw "l'ID n'est pas valable ou n'existe pas";
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error("erreur de connexion!"),
    });
  }
};