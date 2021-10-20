// variable module validation email
const emailSchema = require("validator");

// logique validation email

module.exports = (req, res, next) => {
  if (!emailSchema.isEmail(req.body.email)) {
    return res.status(400).json({
      message: "veuillez rentrer un email valide ! ex : nomprenom@outlook.com",
    });
  } else {
    next();
  }
};