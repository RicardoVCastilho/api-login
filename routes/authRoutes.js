const express = require('express');
const router = express.Router();
const { registerUser} = require('../controllers/authController');
const { loginUser } = require('../controllers/loginController');
const { getUser, getAllUsers, updateUser, deleteUser } = require('../controllers/userController');
const verifyToken = require('../middlewares/authMiddleware'); 

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/user', verifyToken, getUser); 
router.get('/users', getAllUsers);
router.put('/user', verifyToken, updateUser);
router.delete('/user', verifyToken, deleteUser);

module.exports = router;
