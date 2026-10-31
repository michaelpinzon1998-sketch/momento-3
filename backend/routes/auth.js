const express = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

const router = express.Router();

// POST /api/auth/registro
router.post('/registro', async (req, res) => {
  const { nombre, email, contrasena } = req.body;

  if (!nombre || !email || !contrasena) {
    return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
  }
  if (contrasena.length < 6) {
    return res.status(400).json({ mensaje: 'La contraseña debe tener al menos 6 caracteres' });
  }

  try {
    const yaExiste = await Usuario.findOne({ email });
    if (yaExiste) {
      return res.status(409).json({ mensaje: 'Ya existe una cuenta con ese correo.' });
    }

    const usuario = await Usuario.create({ nombre, email, contrasena });

    const token = jwt.sign(
      { id: usuario._id, email: usuario.email, nombre: usuario.nombre },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      token,
      usuario: { id: usuario._id, nombre: usuario.nombre, email: usuario.email },
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al registrar usuario', error: error.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, contrasena } = req.body;

  if (!email || !contrasena) {
    return res.status(400).json({ mensaje: 'Email y contraseña son obligatorios' });
  }

  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(401).json({ mensaje: 'Correo o contraseña incorrectos.' });
    }

    const esValida = await usuario.verificarContrasena(contrasena);
    if (!esValida) {
      return res.status(401).json({ mensaje: 'Correo o contraseña incorrectos.' });
    }

    const token = jwt.sign(
      { id: usuario._id, email: usuario.email, nombre: usuario.nombre },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      usuario: { id: usuario._id, nombre: usuario.nombre, email: usuario.email },
    });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al iniciar sesión', error: error.message });
  }
});

module.exports = router;
