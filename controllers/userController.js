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
        const existingUser = await User.findOne({ email });
        if (existingUser && existingUser._id.toString() !== req.userId) {
            return res.status(422).json({ msg: 'Este e-mail já está em uso.' });
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.userId,
            { name, email },
            { new: true } 
        );

        if (!updatedUser) {
            return res.status(404).json({ msg: 'Usuário não encontrado.' });
        }

        res.status(200).json({ msg: 'Usuário atualizado com sucesso.', updatedUser });
    } catch (error) {
        res.status(500).json({ msg: 'Erro no servidor, tente novamente mais tarde.' });
        console.log(error);
    }
};


const deleteUser = async (req, res) => {
    try {
        if (!req.userId) {
            return res.status(400).json({ msg: 'ID de usuário inválido.' });
        }

        const deletedUser = await User.findByIdAndDelete(req.userId);

        if (!deletedUser) {
            return res.status(404).json({ msg: 'Usuário não encontrado.' });
        }

        res.status(200).json({
            msg: 'Usuário deletado com sucesso.',
            deletedUserId: deletedUser._id,
        });
    } catch (error) {
        res.status(500).json({ msg: 'Erro no servidor, tente novamente mais tarde.' });
        console.log(error);
    }
};


module.exports = { 
    getUser,
    getAllUsers,
    updateUser,
    deleteUser
};