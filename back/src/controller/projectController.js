const Project = require("../model/project");
const UserController = require('./userController');

class projectController {
  static async create(req, res) {
    const { title, userid } = req.body;
    if (!title || !userid)
      return res
        .status(400)
        .send({ message: "os campos não podem estarem vazios " });
        
    if (title.length < 3)
      return res
        .status(400)
        .send({ message: "o titulo não pode ser menor que 4 caracteres" });
    
    try {
      const user = await UserController.getUser(userid);
      const product = {
        title,
        user,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        removedAt: null,
      };
      await Project.create(product);
      return res.status(201).send({ message: "Projeto criado com sucesso" });

    } catch (error) {
      return res
        .status(500)
        .send({ error: "Falha ao salvar o projeto", data: error.message });
    }
  }
}

module.exports = projectController;
