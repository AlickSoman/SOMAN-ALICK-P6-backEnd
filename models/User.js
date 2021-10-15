//require pour importer mongoose pour la construction du modele 
const mongoose = require('mongoose');
// certificateur d'utilisateur unique
const uniqueValidator = require('mongoose-unique-validator');

//modele de schema:
const userSchema = mongoose.Schema({
    email:{ type: String, required: true, unique: true},
    password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);

//exportation du module pour pouvoir y acceder depuis les autre fichiers du projet 
module.exports = mongoose.model('User', userSchema);