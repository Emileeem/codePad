var CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken')
const Register = require("../model/register");
class LoginController {

  static async login(req, res) {

    // var bytes = CryptoJS.AES.decrypt(req.body.jsonCrypt, process.env.SECRET);
    // const decryptd = bytes.toString(CryptoJS.enc.Utf8);
    // const json = JSON.parse(decryptd);
    
    // const { email, password } = json;
    const { email, password } = req.body;

    if (!email)
    return res.status(422).json({ message: "O e-mail é obrigatório" });

    if (!password)
        return res.status(422).json({ message: "A senha é obrigatória" });

    const user = await Register.findOne({ email: email });

    if (!user)
        return res.status(422).json({ message: "Usuário e/ou senha inválido" });

    var bytes2 = CryptoJS.AES.decrypt(user.password, process.env.SECRET)
    const pass = bytes2.toString(CryptoJS.enc.Utf8);

    if (pass != password)
      return res.status(422).send({ message: "Usuário e/ou senha inválido" });

    try {
      const secret = process.env.SECRET;
      const token = jwt.sign(
        {
          id: user._id,
        },
        secret,
        {
          expiresIn: "2 days",
        }
      );
      return res.status(200).send({ token: token });
    } catch (error) {
      return res
        .status(500)
        .send({ message: "Something failed", data: error.message });
    }
  }
}

module.exports = LoginController;
