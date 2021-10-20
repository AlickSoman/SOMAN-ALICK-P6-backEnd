// variable du modele du mot de passe
const passSchema = require("../models/password");

// logique du modele utiliser pour valider le mot de passe

module.exports = (req, res, next) => {
  if (!passSchema.validate(req.body.password)) {
    //retourn un message d'erreur à l'utilisateur "mot de passe pas assez fort" avec le param ( message :)
    //pour affiché le message à l'écran
    return res.status(400).json({
      message: "Le mot de passe n'est pas assez fort ! au moins une minuscule et majuscule, 8 caracter min et 100 max 2 chiffre min pas d'espace"
    });
  } else {
    next();
  }
};