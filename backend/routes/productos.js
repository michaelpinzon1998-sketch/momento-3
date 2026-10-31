const express = require('express');
const Producto = require('../models/Producto');
const verificarToken = require('../middleware/auth');

const router = express.Router();

// GET /api/productos — obtener todos (requiere login)
router.get('/', verificarToken, async (req, res) => {
  try {
    const { categoria, busqueda } = req.query;
    const filtro = {};

    if (categoria) filtro.categoria = categoria;
    if (busqueda) {
      filtro.$or = [
        { nombre: { $regex: busqueda, $options: 'i' } },
        { categoria: { $regex: busqueda, $options: 'i' } },
      ];
    }

    const productos = await Producto.find(filtro).sort({ createdAt: -1 });
    res.json(productos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener productos', error: error.message });
  }
});

// GET /api/productos/:id
router.get('/:id', verificarToken, async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado' });
    res.json(producto);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener producto', error: error.message });
  }
});

module.exports = router;
