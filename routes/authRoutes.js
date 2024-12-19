const express = require('express');
const router = express.Router();
const { registerUser} = require('../controllers/authController');
const { loginUser } = require('../controllers/logsController');
const { getUser, getAllUsers, updateUser, deleteUser } = require('../controllers/userController');
const { verifyToken } = require('../middlewares/authMiddleware'); 

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/user/:id', verifyToken, getUser); 
router.get('/users', getAllUsers);
router.put('/user/:id', verifyToken, updateUser);
router.delete('/user/:id', verifyToken, deleteUser);

module.exports = router;