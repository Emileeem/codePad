const Register = require("../model/register");
const jwt = require("jsonwebtoken");
const { User } = require("../model//user");
require("dotenv").config();
const CryptoJS = require("crypto-js");

class RegisterController {

  static async register(req, res) {
    const { name, birth, email, nickname, password, confirmPassword } = req.body;

    if (!name) return res.status(400).json({ message: "O nome é obrigatório" });

    if (!email)
      return res.status(400).json({ message: "O e-mail é obrigatório" });

    if (!nickname)
      return res.status(400).json({ message: "O apelido é obrigatório" });

    if (!password)
      return res.status(400).json({ message: "A senha é obrigatória" });

    if (password != confirmPassword)
      return res.status(400).json({ message: "As senhas não coincidem" });

    const userExist = await User.findOne({ email: email });
    const userExist2 = await User.findOne({ nickname: nickname });

    if (userExist)
      return res.status(422).json({ message: "insira outro e-mail" });

    if (userExist2)
      return res.status(422).json({ message: "O apelido atual está em uso! Insira outro apelido" });

    const passwordCrypt = CryptoJS.AES.encrypt(
      password,
      process.env.SECRET
    ).toString();

    const user = new User({
      name,
      email,
      nickname,
      birth,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      removedAt: null,
    });

    const register = new Register({
      login: email,
      user,
      email,
      nickname,
      password: passwordCrypt,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      removedAt: null,
    });

    try {
      await register.save();
      await user.save();
      res.status(201).send({ message: "Usuário cadastrado com sucesso" });
    } catch (error) {
      return res
        .status(500)
        .send({ message: "Something failed", data: error.message });
    }
  }
}

module.exports = RegisterController;