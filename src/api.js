/**
 * api.js — cliente HTTP centralizado para el backend
 * Todas las peticiones pasan por aquí para reutilizar la URL base y el token JWT.
 */

const BASE_URL = 'http://localhost:5000/api';

function getToken() {
  return localStorage.getItem('token');
}

async function request(endpoint, options = {}) {
  const headers = { 'Content-Type': 'application/json', ...options.headers };
  const token = getToken();
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.mensaje || 'Error en la petición');
  }
  return data;
}

// Auth
export const registrar = (nombre, email, contrasena) =>
  request('/auth/registro', { method: 'POST', body: JSON.stringify({ nombre, email, contrasena }) });

export const login = (email, contrasena) =>
  request('/auth/login', { method: 'POST', body: JSON.stringify({ email, contrasena }) });

// Productos
export const obtenerProductos = (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return request(`/productos${query ? '?' + query : ''}`);
};

// Favoritos
export const obtenerFavoritos = () => request('/favoritos');

export const agregarFavorito = (productoId) =>
  request('/favoritos', { method: 'POST', body: JSON.stringify({ productoId }) });

export const quitarFavorito = (productoId) =>
  request(`/favoritos/${productoId}`, { method: 'DELETE' });
