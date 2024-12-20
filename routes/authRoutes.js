const express = require('express');
const router = express.Router();
const { registerUser} = require('../controllers/authController');
const { loginUser } = require('../controllers/logsController');
const { getUser, getAllUsers, updateUser, deleteUser } = require('../controllers/userController');
const { verifyToken } = require('../middlewares/authMiddleware'); 

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/user', verifyToken, getUser); 
router.get('/users', verifyToken, getAllUsers);

router.put('/user/:id', verifyToken, async (req, res, next) => {
    if (req.params.id !== req.userId) {
        return res.status(403).json({ msg: 'Você não tem permissão para atualizar esse usuário.' });
    }
    next(); // Se for o mesmo usuário, a atualização continua
}, updateUser);

router.delete('/user/:id', verifyToken, async (req, res, next) => {
    if (req.params.id !== req.userId) {
        return res.status(403).json({ msg: 'Você não tem permissão para deletar esse usuário.' });
    }
    next(); // Se for o mesmo usuário, a exclusão continua
}, deleteUser);


module.exports = router;