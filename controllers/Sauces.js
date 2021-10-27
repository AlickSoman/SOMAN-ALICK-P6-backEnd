//importation du model Sauce
const Sauce = require('../models/Sauces');
const fs = require('fs');//file systeme
const bodyParser = require("body-parser");

// logique des sauces sur les differentes routes
//exportation de la fonction createSauce
// argument de création de sauce (get)
exports.createSauce = (req, res, next) => {
  const sauceObject = JSON.parse(req.body.sauce);
  delete sauceObject._id;
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    likes:0,
    dislikes:0,
    usersLiked: [],
    usersDisLiked:[],
  })
  sauce.save()
    .then(() => res.status(201).json({ message: "Objet enregistré !" }))
    .catch(error => res.status(400).json({ message: 'Objet non enregistré !' +  error }));
    console.log("--->controllers sauce.js CONTENU: createSauce");
  console.log(req.body.createSauce)
};

// argument pour avoir la sauce par son id
exports.getOneSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => res.status(404).json({ error }));
};

 // argument pour permettre la modiffication d'une sauce (put)
exports.modifySauce = (req, res, next) => {
  const sauceObject = req.file? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
      }: { ...req.body };

  Sauce.updateOne(
    { _id: req.params.id },
    { ...sauceObject, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: "Objet modifié !" }))
    .catch(error => res.status(404).json({ message: 'Objet non trouvé !' + error }));
};

// argument pour permettre la suppression d'une sauce et l'image associer avec la fonction fs.unlinck
exports.deleteSauce = (req, res, next) => {
  Sauce.findOne({ _id: req.params.id })
    .then((sauce) => {
      const filename = sauce.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Sauce.deleteOne({ _id: req.params.id })
          .then(() => res.status(200).json({ message: "Objet supprimé !" }))
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch(error => res.status(500).json({ message: "impossible de supprimer la sauce " + error}));

};

// argument pour afficher toutes les sauce
exports.getAllSauce = (req, res, next) => {
  Sauce.find()
    .then((sauces) => res.status(200).json(sauces))
    
    .catch((error) => res.status(400).json({ message : "impossible d'affichées les sauces "+error }));
    console.log("--->controllers sauce.js CONTENU: getAllSauce");
    console.log(res.status(400))
};

  // =========================Like ou dislikes========================
  exports.sauceLike = (req, res, next) => {
    console.log({ _id: req.params.id });
    console.log({ likes: req.body.like });
    console.log({ usersLiked: req.body.userId });
  
    const sauceObject = req.body;
    console.log(sauceObject);
  
    if (sauceObject.like === 1) {
      Sauce.updateOne(
        { _id: req.params.id },
        {
          $inc: { likes: +1 },
          $push: { usersLiked: req.body.userId },
        }
      )
        .then(() => res.status(200).json({ message: "un like en plus !" }))
        .catch((error) => res.status(400).json({ error }));
    } else if (sauceObject.like === -1) {
      Sauce.updateOne(
        { _id: req.params.id },
        {
          $inc: { dislikes: +1 },
          $push: { usersDisliked: req.body.userId },
        }
      )
        .then(() => res.status(200).json({ message: "un dislike en plus !" }))
        .catch((error) => res.status(400).json({ error }));
    } else {
      Sauce.findOne({ _id: req.params.id })
        .then((sauce) => {
          console.log(sauce);
          if (sauce.usersLiked.includes(req.body.userId)) {
            Sauce.updateOne(
              { _id: req.params.id },
              {
                $pull: { usersLiked: req.body.userId },
                $inc: { likes: -1 },
              }
            )
              .then(() => res.status(200).json({ message: "enleve le like !" }))
              .catch((error) => res.status(400).json({ error }));
          } else if (sauce.usersDisliked.includes(req.body.userId)) {
            Sauce.updateOne(
              { _id: req.params.id },
              {
                $pull: { usersDisliked: req.body.userId },
                $inc: { dislikes: -1 },
              }
            )
              .then(() =>
                res.status(200).json({ message: "enleve le dislike !" })
              )
              .catch((error) => res.status(400).json({ error }));
          }
        })
        .catch((error) => res.status(400).json({ error }));
    }
  };

