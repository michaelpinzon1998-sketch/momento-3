require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes      = require('./routes/auth');
const productosRoutes = require('./routes/productos');
const favoritosRoutes = require('./routes/favoritos');

const app  = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

// Rutas
app.use('/api/auth',      authRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/favoritos', favoritosRoutes);

// Health check
app.get('/api/health', (req, res) => res.json({ estado: 'ok' }));

// Conexión a MongoDB y arranque del servidor
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Conectado a MongoDB:', process.env.MONGO_URI);
    app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('❌ Error al conectar con MongoDB:', err.message);
    process.exit(1);
  });
