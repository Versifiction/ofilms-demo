const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.username = !isEmpty(data.username) ? data.username : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.confirmPassword = !isEmpty(data.confirmPassword)
    ? data.confirmPassword
    : "";

  // Name checks
  if (Validator.isEmpty(data.username)) {
    errors.username = "Le pseudo est requis";
  }

  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "L'adresse email est requise";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "L'adresse email est invalide";
  }

  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Le mot de passe est requis";
  }

  if (Validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = "La confirmation du mot de pase est requise";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Le mot de passe doit faire entre 6 et 30 caractères";
  }

  if (!Validator.equals(data.password, data.confirmPassword)) {
    errors.confirmPassword = "Les mots de passe doivent correspondre";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
