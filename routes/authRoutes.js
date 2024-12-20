const express = require('express');
const router = express.Router();
const { registerUser} = require('../controllers/authController');
const { loginUser } = require('../controllers/logsController');
const { getUser, getAllUsers, updateUser, deleteUser } = require('../controllers/userController');
const { verifyToken, verifyAdmin } = require('../middlewares/authMiddleware'); 
const { sendResetPasswordEmail, verifyResetToken, changePassword } = require('../controllers/passwordController');

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/admin-only', verifyToken, verifyAdmin, (req, res) => {
    res.status(200).json({ msg: 'Hello world, ADM! ;)'});
});

router.get('/user', verifyToken, getUser); 
router.get('/users', verifyToken, verifyAdmin, getAllUsers);

router.put('/user/:id', verifyToken, verifyAdmin, async (req, res, next) => {
    if (req.params.id !== req.userId && req.role !== 'admin') {
        return res.status(403).json({ msg: 'Você não tem permissão para atualizar esse usuário.' });
    }
    next();
}, updateUser);

router.delete('/user/:id', verifyToken, verifyAdmin, async (req, res, next) => {
    if (req.params.id !== req.userId && req.role !== 'admin') {
        return res.status(403).json({ msg: 'Você não tem permissão para deletar esse usuário.' });
    }
    next();
}, deleteUser);

router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ msg: 'E-mail é obrigatório.' });
    }

    await sendResetPasswordEmail(email);
    res.status(200).json({ msg: 'E-mail de recuperação enviado.' });
});

router.get('/reset-password', verifyResetToken);

router.post('/reset-password', changePassword);



module.exports = router;