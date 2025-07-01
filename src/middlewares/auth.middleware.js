const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado.' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'secretoTemporal', (err, userData) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido o expirado.' });
    }
    req.user = userData;
    next();
  });
};

const authorizeRole = (role) => {
  return (req, res, next) => {
    if (req.user?.role !== role) {
      return res.status(403).json({ message: 'Acceso denegado: rol insuficiente.' });
    }
    next();
  };
};

module.exports = {
  authenticateToken,
  authorizeRole
};
