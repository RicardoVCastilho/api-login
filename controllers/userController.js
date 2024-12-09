const User = require('../models/User');

const getUser = async (req, res) => {
    try{
        const user = await User.findById(req.userId, '-password');
        if(!user) {
            return res.status(404).json({msg: 'Usuário não encontrado.'});
        }

        res.status(200).json(user);
    }catch (error) {
        res.status(500).json({ msg: 'Erro no servidor. Tente novamente.'})
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
        return res.status(422).json({ msg: 'Nome e email são obrigatórios.' });
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.userId, // ID do usuário vindo do token
            { name, email },
            { new: true } // Retorna o documento atualizado
        );

        if (!updatedUser) {
            return res.status(404).json({ msg: 'Usuário não encontrado.' });
        }

        res.status(200).json({ msg: 'Usuário atualizado com sucesso.', updatedUser });
    } catch (error) {
        res.status(500).json({ msg: 'Erro no servidor, tente novamente mais tarde.' });
    }
};

const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.userId); // Usa o ID do usuário a partir do token

        if (!deletedUser) {
            return res.status(404).json({ msg: 'Usuário não encontrado.' });
        }

        res.status(200).json({ msg: 'Usuário deletado com sucesso.' });
    } catch (error) {
        res.status(500).json({ msg: 'Erro no servidor, tente novamente mais tarde.' });
    }
};

module.exports = { 
    getUser,
    getAllUsers,
    updateUser,
    deleteUser
};