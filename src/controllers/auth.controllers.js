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
    const { token, user } = await authService.loginUsuario(req.body);
    res.json({ message: 'Login exitoso', token, user: { id: user._id, usuario: user.user } });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

const logout = async (req, res) =>{
  try {
    await authService.logout();
    res.status(200).json({ message: 'sesion cerrada'})
  } catch (error) {
    res.status(500).json({ message: 'error al cerrar sesion'})
  }
}

module.exports = {
  register,
  login,
  logout
};
