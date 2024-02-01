const { User } = require("../model/user");
const Login = require("../model/login");

class UserController {
  static async create(req, res) {
    const { name, email, birth, nickname } = req.body;

    if (!name || !birth || !email || !nickname)
      return res
        .status(400)
        .send({ message: "os campos não podem estarem vazios " });

    if (name.length < 3)
      return res
        .status(400)
        .send({ message: "o nome não pode ser menor que 3 caracteres" });

    if (nickname.length < 4)
      return res
        .status(400)
        .send({ message: "o apelido não pode ser menor que 3 caracteres" });

    if (email.length < 3)
      return res.status(400).send({ message: "Insira um e-mail válido" });

    if (!email.includes("@"))
      return res.status(400).send({ message: "Insira um e-mail válido" });

    const user = {
        name,
        nickname,
        email,
        birth,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        removedAt: null,
    };

    try {
      await User.create(user);
      return res
        .status(201)
        .send({ message: "Usuário cadastrado com sucesso" });
    } catch (error) {
      return res.status(500).send({ error: "Failed to get data" });
    }
  }

  static async getUser(_id) {
    try {
      const user = await User.findById(_id);
      return user;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserController;
