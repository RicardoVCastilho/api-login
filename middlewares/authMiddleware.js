const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        
        const { id } = decoded;
        req.userId = id;  
        
        next();
    } catch (err) {
        return res.status(401).json({ msg: 'Token inválido ou expirado.' });
    }
};


module.exports = { verifyToken };
