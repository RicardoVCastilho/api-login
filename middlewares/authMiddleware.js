const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    try {
        const decoded = jwt.verify(token, process.env.SECRET);

        const { id, role } = decoded; 
        req.userId = id;
        req.role = role; 

        next();
    } catch (err) {
        return res.status(401).json({ msg: 'Token inválido ou expirado.' });
    }
};

const verifyAdmin = (req, res, next) => {
    if (req.role !== 'admin') {
        return res.status(403).json({ msg: 'Acesso negado. Permissão de administrador necessária.' });
    }
    next();
};

module.exports = {
    verifyToken,
    verifyAdmin
};
