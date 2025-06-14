const User = require('../models/usuario.model');
const bcrypt = require('bcryptjs');

const registrarUsuario = async ({ email, user, password }) => {
  const existeEmail = await User.findOne({ email });
  if (existeEmail){
    throw new Error('El email ya está en uso');
  }
  const existeUsuario = await User.findOne({ user });
  if (existeUsuario){
    throw new Error('El usuario ya está en uso');
  }  
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    email,
    user,
    password: hashedPassword
  });

  return await newUser.save();
};

const errorNotLogin = new Error('Usuario o contraseña incorrectos');

const loginUsuario = async ({ usuario, password }) => {
  const user = await User.findOne({ usuario });
  if (!user){
    throw errorNotLogin
  }  
  const match = await bcrypt.compare(password, user.password);
  if (!match){
    throw errorNotLogin
  } 
  return user;
};

module.exports = {
  registrarUsuario,
  loginUsuario
};
