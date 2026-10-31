import { createContext, useState, useContext, useEffect } from 'react';
import * as api from '../api';

const ContextoAuth = createContext();

export const ProveedorAuth = ({ children }) => {
  const [usuario, setUsuario] = useState(() => {
    try {
      const guardado = localStorage.getItem('sesion_usuario');
      return guardado ? JSON.parse(guardado) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (usuario) {
      localStorage.setItem('sesion_usuario', JSON.stringify(usuario));
    } else {
      localStorage.removeItem('sesion_usuario');
      localStorage.removeItem('token');
    }
  }, [usuario]);

  const registrar = async (nombre, email, contrasena) => {
    try {
      const data = await api.registrar(nombre, email, contrasena);
      localStorage.setItem('token', data.token);
      setUsuario(data.usuario);
      return { exito: true };
    } catch (error) {
      return { exito: false, mensaje: error.message };
    }
  };

  const verificarLogin = async (email, contrasena) => {
    try {
      const data = await api.login(email, contrasena);
      localStorage.setItem('token', data.token);
      setUsuario(data.usuario);
      return { exito: true };
    } catch (error) {
      return { exito: false, mensaje: error.message };
    }
  };

  const cerrarSesion = () => {
    setUsuario(null);
  };

  return (
    <ContextoAuth.Provider value={{ usuario, registrar, verificarLogin, cerrarSesion }}>
      {children}
    </ContextoAuth.Provider>
  );
};

export const usarAuth = () => useContext(ContextoAuth);
