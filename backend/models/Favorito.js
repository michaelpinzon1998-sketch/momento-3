const mongoose = require('mongoose');

const favoritoSchema = new mongoose.Schema(
  {
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario',
      required: true,
    },
    producto: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Producto',
      required: true,
    },
  },
  { timestamps: true }
);

// Un usuario no puede tener el mismo producto favorito dos veces
favoritoSchema.index({ usuario: 1, producto: 1 }, { unique: true });

module.exports = mongoose.model('Favorito', favoritoSchema);
