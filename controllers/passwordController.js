const User = require('../models/User');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
    }
});

const sendEmail = async (to, subject, text) => {
    try {
        const info = await transporter.sendMail({
            from: 'testesapi3108@gmail.com',
            to,
            subject,
            text,
        });
        console.log('Email enviado:' + info.response);
    } catch (error) {
        console.log('Erro ao enviar o email:', error);
    }
};

const sendResetPasswordEmail = async (email) => {
    try {
        const token = jwt.sign({ email }, process.env.SECRET, { expiresIn: '1h' });
        
        // Atualizando para o link correto da sua API
        const resetLink = `https://api-login-z19r.onrender.com/reset-password?token=${token}`; 

        await sendEmail(
            email,
            'Recuperação de senha',
            `Clique no link para recuperar sua senha: ${resetLink}`
        );

        console.log('Email de recuperação enviado com sucesso.');
    } catch (error) {
        console.log('Erro ao enviar o email de recuperação:', error);
    }
};


const verifyResetToken = async (req, res) => {
    const { token } = req.query;

    if(!token) {
        return res.status(400).json({ msg: "Token não fornecido."});
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET);

        res.status(200).json({ msg: 'Token válido.', email: decoded.email });
    } catch(err) {
        return res.status(401).json({ msg: 'Token inválido ou expirado.'})
    }
};

const changePassword = async (req, res) => {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
        return res.status(400).json({ msg: 'Token e nova senha são obrigatórios.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        const email = decoded.email;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ msg: 'Usuário não encontrado.' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ msg: 'Senha alterada com sucesso.' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Erro ao alterar a senha.' });
    }
};

module.exports = {
    sendEmail,
    sendResetPasswordEmail,
    verifyResetToken,
    changePassword
}