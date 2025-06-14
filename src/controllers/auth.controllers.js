const authService = require('../services/auth.service');

const register = async (req, res) => {
  try {
    const user = await authService.registrarUsuario(req.body);
    res.status(201).json({ message: 'Usuario registrado con éxito', user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const user = await authService.loginUsuario(req.body);
    res.json({ message: 'Login exitoso', user: user.usuario });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = {
  register,
  login
};
