const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const loginUser = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(422).json({ msg: 'E-mail e/ou senha são obrigatórios.' });
    }

    try {
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(404).json({msg: 'Usuário não encontrado'});
        };

        const isPasswordValue = await bcrypt.compare(password, user.password);
        if(!isPasswordValue) {
            return res.status(401).json({msg: 'Senha inválida.'});
        }

        const token = jwt.sign(
            { id: user._id},
            process.env.SECRET,
        );

        res.status(200).json({msg: 'Login realizado com sucesso.', token});
    } catch (error) {
        res.status(500).json({msg: 'Erro no servidor. Tente novamente mais tarde'});
        console.log(error)
    }
};

module.exports = { loginUser }