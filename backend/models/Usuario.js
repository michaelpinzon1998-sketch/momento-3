const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const usuarioSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre es obligatorio'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'El email es obligatorio'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    contrasena: {
      type: String,
      required: [true, 'La contraseña es obligatoria'],
      minlength: 6,
    },
  },
  { timestamps: true }
);

// Hash de contraseña antes de guardar
usuarioSchema.pre('save', async function (next) {
  if (!this.isModified('contrasena')) return next();
  const salt = await bcrypt.genSalt(10);
  this.contrasena = await bcrypt.hash(this.contrasena, salt);
  next();
});

// Método para verificar contraseña
usuarioSchema.methods.verificarContrasena = async function (contrasenaPlana) {
  return bcrypt.compare(contrasenaPlana, this.contrasena);
};

module.exports = mongoose.model('Usuario', usuarioSchema);
