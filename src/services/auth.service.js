const User = require('../models/usuario.model')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'secretoTemporal'; 
const JWT_EXPIRES = process.env.JWT_EXPIRES || '1h'

const registrarUsuario = async ({ email, usuario, password }) => {
  const existeEmail = await User.findOne({ email });
  if (existeEmail) throw new Error('El email ya está en uso');
  const existeUsuario = await User.findOne({ usuario }); 

  if (existeUsuario) throw new Error('El usuario ya está en uso');
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    email,
    usuario, 
    password: hashedPassword
  });
  return await newUser.save();
};

const loginUsuario = async ({ usuario, password }) => {
  const userFound = await User.findOne({ usuario });
  if (!userFound) {
    throw new Error('Usuario o contraseña incorrectos');;
  }
  const match = await bcrypt.compare(password, userFound.password);
  if (!match) {
    throw new Error('Usuario o contraseña incorrectos');;
  }
  const token = jwt.sign(
    { id: userFound._id, usuario: userFound.usuario },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES }
  );
  return { token, user: userFound };
};

const logout = async () => {
  return true; 
};
module.exports = {
  loginUsuario,
  registrarUsuario,
  logout
}