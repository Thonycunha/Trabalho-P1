const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { registerValidation } = require("../validation");
const UserModel = require("../Models/UserModel");
const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};

const handleErrors = (err) => {
  let errors = err.message.split(". ");

  return errors;
};

module.exports.register = async (req, res, next) => {
  try {
    const { error } = registerValidation(req.body);
    if (error) {
      const errors = handleErrors(error);
      return res.json({ errors, created: false });
    }

    const emailExist = await UserModel.findOne({ email: req.body.email });

    if (emailExist) {
      const errors = ["Email já existe"];
      return res.json({ errors, created: false });
    }

    const { name, email, password } = req.body;
    const user = await UserModel.create({ name, email, password });

    const token = createToken(user._id);

    res.cookie("jwt", token, {
      withCredentials: true,
      httpOnly: false,
      maxAge: maxAge * 1000,
    });

    res.status(201).json({ user: user._id, created: true });
  } catch (err) {
    const errors = handleErrors(err);
    res.json({ errors, created: false });
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.login(email, password);

    const token = createToken(user._id);

    res.cookie("jwt", token, {
      withCredentials: true,
      httpOnly: false,
      maxAge: maxAge * 1000,
    });

    res.status(200).json({ user: user._id, created: true });
  } catch (err) {
    const errors = handleErrors(err);
    res.json({ errors, created: false });
  }
};
