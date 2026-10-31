const express = require('express');
const Favorito = require('../models/Favorito');
const verificarToken = require('../middleware/auth');

const router = express.Router();

// GET /api/favoritos — favoritos del usuario autenticado
router.get('/', verificarToken, async (req, res) => {
  try {
    const favoritos = await Favorito.find({ usuario: req.usuario.id }).populate('producto');
    res.json(favoritos.map((f) => f.producto));
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener favoritos', error: error.message });
  }
});

// POST /api/favoritos — agregar favorito
router.post('/', verificarToken, async (req, res) => {
  const { productoId } = req.body;
  if (!productoId) return res.status(400).json({ mensaje: 'productoId es obligatorio' });

  try {
    const favorito = await Favorito.create({ usuario: req.usuario.id, producto: productoId });
    await favorito.populate('producto');
    res.status(201).json(favorito.producto);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ mensaje: 'Ya está en favoritos' });
    }
    res.status(500).json({ mensaje: 'Error al agregar favorito', error: error.message });
  }
});

// DELETE /api/favoritos/:productoId — quitar favorito
router.delete('/:productoId', verificarToken, async (req, res) => {
  try {
    await Favorito.findOneAndDelete({
      usuario: req.usuario.id,
      producto: req.params.productoId,
    });
    res.json({ mensaje: 'Favorito eliminado' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar favorito', error: error.message });
  }
});

module.exports = router;
