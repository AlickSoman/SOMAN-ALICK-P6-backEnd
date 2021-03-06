const passwordValidator = require('password-validator');

//création du schema
let passwordSchema = new passwordValidator();

//le schéma que doit respecteur le mot de passe
passwordSchema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits(2)                                // Must have at least 2 digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']); // Blacklist these values

console.log("--->Ici le CONTENU de passwordSchema");
console.log(passwordSchema);

module.exports = passwordSchema;