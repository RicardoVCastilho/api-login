const User = require('../models/User');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
    const { name, email, password, confirmpassword } = req.body;

    if (password !== confirmpassword) {
        return res.status(422).json({ msg: 'As senhas não conferem' });
    }

    try {
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        const user = new User({ 
            name, 
            email, 
            password: passwordHash
         });
         
        await user.save();

        res.status(201).json({ msg: 'Usuário criado com sucesso.' });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(422).json({ msg: 'E-mail já cadastrado. Por favor, utilize outro Email.' });
        }
        res.status(500).json({ msg: 'Erro no servidor. Tente novamente mais tarde.' });
    }
};

module.exports = { registerUser };