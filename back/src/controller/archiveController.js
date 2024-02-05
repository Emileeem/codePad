const {Archive} = require("../model/archive")
const {User} = require("../model/user")

class ArchiveController {
    static async create(req, res) {
        const { title, nickname } = req.body
        if(!title)
            return res.status(422).json({ message: "É necessário adicionar um título para criar um arquivo"})

        if(title.length < 3)
            return res.status(422).json({ message: "Precisa ter mais de 3 caracteres!"})

        try{
            const user = await User.findOne({ nickname })

            if(!user) {
                return res.status(404).json({ message: "User not found" })
            }

            const archive = new Archive({
                user,
                title,                
                createdAt: Date.now(),
                updatedAt: Date.now(),
                removedAt: null,
            });

            await archive.save();

            return res.status(201).json({ message: "Criado com sucesso!" })
        } catch (error){
            console.error(error);
            return res.status(500).json({ message: "Erro ao criar o arquivo." })
        }

    }
    static async delete(req, res) {
        const {archiveId} = req.params;

        try{
            const archive = await Archive.findById(archiveId);

            if(!archive)
                return res.status(404).json({ message: "Arquivo não encontrado" })

            if(archive.user.nickname !== req.body.nickname) {
                return res.status(403).json({ message: "Você não tem permissão para deletar esse arquivo"})
            }

            await archive.deleteOne();
            return res.status(200).json({ message: "Arquivo deletado com sucesso"})
        } catch(error){
            console.error(error);
            return res.status(500).json({ message:"Erro ao tentar excluir" });
        }
    }
    static async update(req, res) {
        const { text, nickname } = req.body;
        const {archiveId} = req.params;

        try{
            const user = await User.findOne({ nickname })

            if(!user) {
                return res.status(404).json({ message: "User not found" })
            }

            const newInfos = {
                user,
                text,                
                updatedAt: Date.now(),
                removedAt: null,
            }

            await Archive.findByIdAndUpdate(archiveId, newInfos)

            return res.status(200).json({ message: "Update!"})
        }
        catch(error){
            console.error(error);
            return res.status(500).json({ message:"Erro ao tentar atualizar" });
        }
    }
}

module.exports = ArchiveController;