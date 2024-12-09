const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if(!token) {
        return res.status(403).json({ msg: 'Acesso negado. Nenhum token fornecido.'});
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        req.userId = decoded.id;
        next();
    } catch (err) {
        return res.status(401).json({ msg: 'Token inválido ou expirado.'});
    }
};

module.exports = verifyToken;