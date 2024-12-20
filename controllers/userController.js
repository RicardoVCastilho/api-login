const User = require('../models/User');

const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.userId, '-password');
        if (!user) {
            return res.status(404).json({ msg: 'Usuário não encontrado.' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ msg: 'Erro no servidor. Tente novamente.' })
        console.log(error);
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ msg: 'Erro no servidor, tente novamente mais tarde.' });
    }
};


const updateUser = async (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(422).json({ msg: 'Nome e e-mail são obrigatórios.' });
    }

    try {
        // Verifica se o usuário tem permissão para editar
        if (req.userId !== req.params.id && req.role !== 'admin') {
            return res.status(403).json({ msg: 'Você não tem permissão para editar este usuário.' });
        }

        // Verifica se o e-mail está em uso por outro usuário
        const existingUser = await User.findOne({ email });
        if (existingUser && existingUser._id.toString() !== req.userId) {
            return res.status(422).json({ msg: 'Este e-mail já está em uso.' });
        }

        // Atualiza o usuário
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,  // Usar req.params.id para localizar o usuário pelo ID passado na URL
            { name, email },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ msg: 'Usuário não encontrado.' });
        }

        res.status(200).json({ msg: 'Usuário atualizado com sucesso.', updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Erro no servidor, tente novamente mais tarde.' });
    }
};

const deleteUser = async (req, res) => {
    try {
        if (req.userId !== req.params.id && req.role !== 'admin') {
            return res.status(403).json({ msg: 'Você não tem permissão para excluir este usuário.' });
        }

        const deletedUser = await User.findByIdAndDelete(req.params.id);

        if (!deletedUser) {
            return res.status(404).json({ msg: 'Usuário não encontrado.' });
        }

        res.status(200).json({
            msg: 'Usuário deletado com sucesso.',
            deletedUserId: deletedUser._id,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Erro no servidor, tente novamente mais tarde.' });
    }
};

module.exports = {
    getUser,
    getAllUsers,
    updateUser,
    deleteUser
};