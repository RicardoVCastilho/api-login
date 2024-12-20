const User = require('../models/User');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
    const { name, email, password, confirmpassword, role } = req.body;

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
        return res.status(422).json({ msg: 'Por favor, forneça um email válido.' });
    }

    if (password !== confirmpassword) {
        return res.status(422).json({ msg: 'As senhas não conferem' });
    }

    try {
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);
        
        const userRole = role === 'admin' ? 'admin' : 'user';

        const user = new User({ 
            name, 
            email, 
            password: passwordHash,
            role: userRole 
        });
         
        await user.save();

        res.status(201).json({ msg: 'Usuário criado com sucesso.' });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(422).json({ msg: 'E-mail já cadastrado. Por favor, utilize outro Email.' });
        }
        console.error(error);
        res.status(500).json({ msg: 'Erro no servidor. Tente novamente mais tarde.' });
    }
};


module.exports = { registerUser };