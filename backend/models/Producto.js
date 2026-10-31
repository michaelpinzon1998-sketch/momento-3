const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre del producto es obligatorio'],
      trim: true,
    },
    precio: {
      type: String,
      required: [true, 'El precio es obligatorio'],
    },
    categoria: {
      type: String,
      required: [true, 'La categoría es obligatoria'],
      enum: ['Deportes', 'Tecnología', 'Ropa', 'Accesorios'],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Producto', productoSchema);
