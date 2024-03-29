const Project = require("../model/project");
const { User } = require("../model/user");
const Register  = require("../model/register");
const { Archive } = require("../model/archive");
var CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken')
class projectController {
  static async create(req, res) {
    const { title, userid, description } = req.body;
    if (!title || !userid)
      return res
        .status(400)
        .send({ message: "os campos não podem estarem vazios " });

    if (title.length < 3)
      return res
        .status(400)
        .send({ message: "o titulo não pode ser menor que 4 caracteres" });

    try {
      const register = await Register.findById(userid);
      const user = await User.findById(register.user._id)
      const existingProject = await Project.findOne({ title, user });

      if (existingProject) {
        return res.status(422).json({ message: "Projeto já existe" });
      }
      
      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      const project = {
        title,
        user,
        description,
        archives: [],
        createdAt: Date.now(),
        updatedAt: Date.now(),
        removedAt: null,
      };

      await Project.create(project);
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
    const { projectId, fileName, content, id } = req.body;
    console.log(projectId, fileName, content, id);

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

        // if (fileName && content) {
        archives[existingArchiveIndex].fileName = fileName;
        archives[existingArchiveIndex].content = content;
        archives[existingArchiveIndex].updatedAt = Date.now();
        // } else {
        //   archives.splice(existingArchiveIndex, 1);
        // }
      } else {
        let filenameUsed = false;
        archives.forEach((element) => {
          if (element.fileName === fileName) filenameUsed = true;
        });
        if (filenameUsed)
          return res
            .status(409)
            .send({ message: "Nome de arquivo já utilizado" });

        const newArchive = new Archive({
          fileName: fileName,
          content: content,
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

  static async getFile(req, res) {
    const { projectid } = req.params;
    // ("/" + "/files/").length = 8
    const path = req.url.substring(8 + projectid.length);

    if (!projectid) {
      return res.status(400).send({ message: "O ID do projeto é obrigatório" });
    }

    try {
      const project = await Project.findById(projectid);

      if (!project) {
        return res.status(404).send({ message: "O projeto não existe" });
      }

      let archieve;
      project.archives.every((e) => {
        if (e.fileName == path) {
          archieve = e;
          return false;
        }
        return true;
      });

      if (archieve) return res.status(200).send(archieve);
    } catch (error) {
      return res
        .status(500)
        .send({ error: "Falha ao resgatar o arquivo", data: error.message });
    }
    return res.status(404).send({ message: "Não encontrado" });
  }

  static async getFileNames(req, res) {
    const { projectid } = req.params;

    if (!projectid) {
      return res.status(400).send({ message: "O ID do projeto é obrigatório" });
    }

    try {
      const project = await Project.findById(projectid);

      if (!project) {
        return res.status(404).send({ message: "O projeto não existe" });
      }

      let filesStructure = {};
      filesStructure["root"] = {};
      project.archives.every((e) => {
        let items = e.fileName.split("/");
        if (e.fileName.slice(-1) === "/") items = [items.at(-2) + "/"];

        var ref = filesStructure.root;
        for (let i = 0; i < items.length; i++) {
          if (items.length - i == 1) {
            if (items[i].slice(-1) == "/")
              ref[items[i].slice(0, -1)] = "folder";
            else ref[items[i]] = "file";
          } else {
            if (!ref[items[i]]) ref[items[i]] = {};
            ref = ref[items[i]];
          }
        }
        return true;
      });

      if (filesStructure) {
        console.log(filesStructure);
        return res.status(200).send(filesStructure);
      }
    } catch (error) {
      return res
        .status(500)
        .send({ error: "Falha ao resgatar o arquivo", data: error.message });
    }
    return res.status(404).send({ message: "Não encontrado" });
  }

  static async getProjectsByUser(req, res) {
    const { userId } = req.params;

    if (!userId) return res.status(422).send("Nenhum usuario informado");

    try {
      const user = await User.findById(userId);
      if (!user)
        return res.status(404).send("Nenhum usuario encontrado");
      
      const projects = await Project.find({ user: user }, 'title description updatedAt');

      return res.status(200).send(projects)

    } catch (error) {
      return res
        .status(500)
        .send({ error: "Falha ao resgatar projetos", data: error.message });
    }
  }
}
module.exports = projectController;
