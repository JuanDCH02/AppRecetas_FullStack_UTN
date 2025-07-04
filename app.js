const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'))

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('app.js: MongoDB conectado'))
  .catch((err) => console.error('app.js: Error de conexión a MongoDB:', err));

const recetaRoutes = require('./src/routes/receta.routes');
const authRoutes = require('./src/routes/auth.routes');

app.use('/auth', authRoutes);
app.use('/recetas', recetaRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

app.get('/ping-mongodb', async (req, res) => {
  try {
    const admin = mongoose.connection.db.admin();
    const result = await admin.ping();
    res.status(200).json({ message: '🟢 MongoDB responde', result });
  } catch (err) {
    console.error('❌ Error en ping:', err.message);
    res.status(500).json({ message: '🔴 Error al conectar con MongoDB', error: err.message });
  }
})

app.listen(3000, () => console.log('Servidor corriendo en http://localhost:3000'));
