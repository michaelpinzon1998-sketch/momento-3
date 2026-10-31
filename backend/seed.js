/**
 * seed.js — pobla la base de datos con los productos iniciales
 * Ejecutar con: node seed.js
 */
require('dotenv').config();
const mongoose = require('mongoose');
const Producto = require('./models/Producto');

const PRODUCTOS = [
  // Deportes
  { nombre: 'Balón de Fútbol Profesional',      precio: '$120.000', categoria: 'Deportes' },
  { nombre: 'Camiseta Selección Colombia',       precio: '$250.000', categoria: 'Deportes' },
  { nombre: 'Guayos de Fútbol Nike/Adidas',      precio: '$320.000', categoria: 'Deportes' },
  { nombre: 'Espinilleras / Canilleras',         precio: '$45.000',  categoria: 'Deportes' },
  { nombre: 'Rodilleras de Voleibol',            precio: '$38.000',  categoria: 'Deportes' },
  { nombre: 'Raqueta de Tenis Wilson',           precio: '$280.000', categoria: 'Deportes' },
  { nombre: 'Guantes de Boxeo Everlast',         precio: '$175.000', categoria: 'Deportes' },
  // Tecnología
  { nombre: 'Audífonos Inalámbricos Bluetooth',  precio: '$189.000', categoria: 'Tecnología' },
  { nombre: 'Mouse Gamer RGB',                   precio: '$95.000',  categoria: 'Tecnología' },
  { nombre: 'Teclado Mecánico TKL',              precio: '$230.000', categoria: 'Tecnología' },
  { nombre: 'Webcam Full HD 1080p',              precio: '$145.000', categoria: 'Tecnología' },
  // Ropa
  { nombre: 'Chaqueta Deportiva Adidas',         precio: '$310.000', categoria: 'Ropa' },
  { nombre: 'Pantaloneta de Running',            precio: '$75.000',  categoria: 'Ropa' },
  { nombre: 'Medias Antideslizantes x3 pares',   precio: '$28.000',  categoria: 'Ropa' },
  // Accesorios
  { nombre: 'Mochila Deportiva 30L',             precio: '$160.000', categoria: 'Accesorios' },
  { nombre: 'Botella Térmica 750ml',             precio: '$55.000',  categoria: 'Accesorios' },
  { nombre: 'Cinta para Correr Plegable',        precio: '$890.000', categoria: 'Accesorios' },
  { nombre: 'Pesas Hexagonales 5 kg (par)',      precio: '$120.000', categoria: 'Accesorios' },
  { nombre: 'Cronómetro Digital Deportivo',      precio: '$42.000',  categoria: 'Accesorios' },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Conectado a MongoDB');

    await Producto.deleteMany({});
    console.log('🗑️  Productos anteriores eliminados');

    await Producto.insertMany(PRODUCTOS);
    console.log(`✅ ${PRODUCTOS.length} productos insertados`);
  } catch (error) {
    console.error('❌ Error en seed:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Desconectado de MongoDB');
  }
}

seed();
