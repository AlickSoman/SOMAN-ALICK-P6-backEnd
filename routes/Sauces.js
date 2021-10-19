//création de du module routeur pour les sauce
// const cors = require('cors')
const express = require("express");
const router = express.Router();

//importation jwt pour protèger les routes
const auth = require("../middleware/auth");
//importation de multer
const multer = require("../middleware/multer-config");
//importation du modele d'article (sauce)
const saucesCtrl = require("../controllers/Sauces");
const app = require("../app");


//ici CRUD : create (création de ressources), read (lecture de ressources),
//update (modification de ressources),delete (suppression de ressources).
// "creation des routes de post des sauces modif get et supprimer sauces"

// // =====================================Post
router.post("/", auth, multer, saucesCtrl.createSauce);

// ================= ici ma route Get global, qui vas récupèrer le modele
router.get("/", auth, saucesCtrl.getAllSauce);
console.log("sauceCtrl.getAllSauce")
console.log(saucesCtrl.getAllSauce)

// =======================================Get 
// get uniquement un objet par son :id
router.get("/:id", auth, saucesCtrl.getOneSauce);

//================================Put
// ici la route qui va nous permetre de modifier un objet ( avec la methode .put)
router.put("/:id", auth, multer, saucesCtrl.modifySauce);

// ==============================Delete
// ici la route qui nous permettra de supprimer (avec la methode .delete)
router.delete("/:id", auth, saucesCtrl.deleteSauce);

// route Post pour les likes
router.post("/:id/like", auth, saucesCtrl.sauceLike);

module.exports = router;


