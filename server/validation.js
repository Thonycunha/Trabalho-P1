const Joi = require("@hapi/joi");

const registerValidation = async (data) => {
  const schema = Joi.object({
    name: Joi.string().min(6).required().messages({
      "string.min": "Nome tem que ser no mínimo 6 caracteres",
      "string.empty": "Nome não pode ser vazio",
    }),
    email: Joi.string().min(6).required().email().messages({
      "string.min": "Email tem que ser no mínimo 6 caracteres",
      "any.email": "Email inválido",
      "string.empty": "Email não pode ser vazio",
      "string.email": "Formato do Email inválido",
    }),
    password: Joi.string().min(6).required().messages({
      "string.min": "Senha tem que ser no mínimo 6 caracteres",
      "string.empty": "Senha não pode ser vazio",
    }),
  });

  return schema.validateAsync(data, { abortEarly: false });
};

module.exports = { registerValidation };
