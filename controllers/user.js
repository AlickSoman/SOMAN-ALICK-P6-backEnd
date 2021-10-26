//Variables
const bcrypt = require('bcrypt');// pour le hash du mot de passe
const jwt = require('jsonwebtoken');// le token d'authentification
const password = require('../middleware/password');
const User = require ('../models/User');//Modele de base de donnée
// logique des routes d inscription et de connexion utilsateurs

exports.signup = (req, res, next) => {
//fonction de test du password 
    //achage (cryptage)
    bcrypt.hash(req.body.password, 10)

      .then(hash => {
        const user = new User({
          email:req.body.email,
          password: hash
        });
        console.log(req.body.password)
        user.save()
        //save pour enregistrer l'utilisateur dans la base de donnée
          .then(() => res.status(201).json({ message: 'Utilisateur créé avec succès !' }))
          .catch(error => res.status(400).json({  message: 'Cet e-mail et déjà enregistré, veillez utilisez une autre e-mail !'}));
      })
      .catch(error => res.status(500).json({ message: 'Utilisateur non créé ! ' + error }));
  };

//fonction login pour controller la connexion des utilisateur
exports.login = (req, res, next) => {
  console.log("--->controllers user.js CONTENU: req.body.email");
  console.log(req.body.email)

    User.findOne({ email: req.body.email})
    //récupération de l'utilisateur
      .then(user => {
        if (!user) {
          return res.status(401).json({ message: 'Utilisateur non trouvé !'});
        }
        //controlle du mot de passe par 'compare'
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {//si le mot de passe ne corespond pas renvoyer 401
              return res.status(401).json({ message: 'Votre mot de passe incorrect !' });
            }
            //renvoyer 200 si le comparéson à réussi
            res.status(200).json({
              userId: user._id,
              //token générer par le back avec jasonwebtoken
              token: jwt.sign(//"3 Arguments
                { userId: user._id }, //1 l'id de l'user
                (`${process.env.JWT_DECODEDTOKEN}`), //2 un token chriffrer
                { expiresIn: '24h' }//delais de validité de la session(du token)
              )
            });
          })
          .catch(error => res.status(500).json({ error })); //erreur du server
      })
      .catch(error => res.status(500).json({ error }));//erreur du server
  };