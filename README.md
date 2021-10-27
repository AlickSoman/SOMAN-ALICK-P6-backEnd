## Piquante

Pour faire fonctionner le projet, vous devez installer :
- [NodeJS](https://nodejs.org/en/download/) en version 12.14 ou 14.0 
- [Angular CLI](https://github.com/angular/angular-cli) en version 7.0.2.
- [node-sass](https://www.npmjs.com/package/node-sass) : attention à prendre la version correspondante à NodeJS. 
Pour Node 14.0 par exemple, installer node-sass en version 4.14+.

install v7.0.2 //npm install --save @angular/cli@7.0.2
npm install --save node-sass@4.14
Sur Windows, ces installations nécessitent d'utiliser PowerShell en tant qu'administrateur.

## Development server

Démarrer npm start pour avoir accès au serveur de développement. Rendez-vous sur http://localhost:4200/. L'application va se recharger automatiquement si vous modifiez un fichier source.

========================================================

Ce projet a été réalisé dans le cadre du projet 6 d'openclassroom.

Backend projet 6  web api d'ajout de sauces, avec possibilité de likes et dislikes

Construction d'une application de critique gastronomique pour une agence de sauces Sopekocko le côté front-end était ici déjà fourni.

Ici j'ai donc réalisé le back end de l'application en Api rest avec Nodejs et Express.

Les règles de sécurité Owasp ont été également mis en place afin de sécuriser l'application et la navigation de l'utilisateur.
mesures de securité mise en place : 
@DotEnv : Les variables d'environnements
@cookie-session : Ce module stocke les données de session sur le client dans un cookie :
@helmet
@xss-clean : pour nettoyer les entrées utilisateur provenant du corps POST, des requêtes GET et des paramètres d'URL
@path 
@nocache : désactiver la mise en cache côté client. : https://www.npmjs.com/package/nocache
@CORS : pour les requêtes entre deux ports différant : https://www.npmjs.com/package/cors 
@jsonwebtoken : Une implémentation de JSON Web Tokens :  https://www.npmjs.com/package/jsonwebtoken
@bcrypt : cryptage du mot de passe avec la fonction de hashage : https://www.npmjs.com/package/bcrypt
@express-rate-limit : controller les tentatives de connections abusive : https://www.npmjs.com/package/express-rate-limit
@uniqueValidator
@

Installation:

>>>IMPORTANT : dans le backend ajouter un dossier nommé exactement comme suit ( images ), il sert à l'enregistrement des images des sauces >>>N'OUBLIEZ PAS DE LE RAJOUTER AU PROJET<<<

Installez le backend de l'application lancer node server ou nodemon server après avoir installé NodeJs et les packages npm...

Puis exécuter le front-end qui est réalisé en projet CLI Angular exécuter npm start après avoir installé toutes les dépendances d'Angular.
