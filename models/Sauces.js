//require pour importer mongoose pour la construction du modele 
const mongoose = require('mongoose');
//modele de schema:
const sauceSchema = mongoose.Schema({
    userId: {type: String, required: true},
    name: {type: String, required: true},
    manufacturer: {type: String, required: true},//fabricant de la sauce
    description: {type: String, required: true},
    mainPepper: {type: String, required: true}, // poivre principale
    imageUrl: {type: String, required: true}, 
    heat: {type: Number, required: true}, //note de 1 à 10 décrivant la sauce
    likes: { type: Number, required: true},
    dislikes: { type: Number, required: true},
    usersLiked: { type: [String], required: true },
    usersDisliked: { type: [String], required: true }
});

//exportation du module pour pouvoir y acceder depuis les autre fichiers du projet 
module.exports = mongoose.model('Sauce', sauceSchema);
