// variables
const express = require("express");
const { verify } = require("jsonwebtoken");
const router = express.Router();
const userCtrl = require("../controllers/user");
const verifyPassword = require("../middleware/password");
const verifyEmail = require("../middleware/email");

// module npm blocant les attaque de force bloque l utilisateur si il rentre trop de requetes
const rateLimit = require("express-rate-limit");

//limite la connexion abusive
const limiter = rateLimit({
  windowMs: 3 * 60 * 1000, // 3 minutes
  max: 3, // limit each IP to 3 requests per windowMs
  message: "trop de requete abusive , vous devez attendre 3 minutes",
});

// routes pour l inscription et le login
router.post("/signup", verifyEmail, verifyPassword, userCtrl.signup);
router.post("/login", limiter, userCtrl.login);

module.exports = router;

