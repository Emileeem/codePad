const Project = require("../model/project");
const { User } = require("../model/user");
const { Archive } = require("../model/archive");

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
      const user = await User.findById(userid);
      const existingProject = await Project.findOne({ title, user });

      if (existingProject) {
        return res.status(422).json({ message: "Projeto já existe" });
      }
      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      const product = {
        title,
        user,
        archives: [],
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
  static async delete(req, res) {
    const { projectId } = req.params;

    try {
      const project = await Project.findById(projectId);

      if (!project)
        return res.status(404).json({ message: "Projeto não encontrado" });

      if (project.user.nickname !== req.body.nickname) {
        return res.status(403).json({
          message: "Você não tem permissão para deletar esse projeto",
        });
      }

      await project.deleteOne();
      return res.status(200).json({ message: "Projeto deletado com sucesso!" });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Erro ao tentar excluir projeto" });
    }
  }
  static async update(req, res) {
    const { projectId, titleArquive, text, id } = req.body;

    if (!projectId) {
      return res.status(400).send({ message: "O ID do projeto é obrigatório" });
    }

    try {
      const project = await Project.findById(projectId);

      if (!project) {
        return res.status(404).send({ message: "O projeto não existe" });
      }

      let archives = project.archives;

      if (id) {
        const existingArchiveIndex = archives.findIndex(
          (archive) => archive._id.toString() === id
        );

        if (existingArchiveIndex === -1) {
          return res
            .status(404)
            .send({ message: "O arquivo não existe neste projeto" });
        }

        if (titleArquive && text) {
          archives[existingArchiveIndex].title = titleArquive;
          archives[existingArchiveIndex].text = text;
          archives[existingArchiveIndex].updatedAt = Date.now();
        } else {
          archives.splice(existingArchiveIndex, 1);
        }
      } else {
        const newArchive = new Archive({
          user: project.user,
          title: titleArquive,
          text,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          removedAt: null,
        });
        archives.push(newArchive);
      }

      project.archives = archives;

      await project.save();

      return res
        .status(200)
        .send({ message: "Arquivo atualizado com sucesso" });
    } catch (error) {
      return res
        .status(500)
        .send({ error: "Falha ao atualizar o arquivo", data: error.message });
    }
  }
}
module.exports = projectController;
