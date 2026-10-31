import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import * as api from '../api';
import { usarAuth } from './contexto_auth';

const ContextoFavoritos = createContext();

export const ProveedorFavoritos = ({ children }) => {
  const [favoritos, setFavoritos] = useState([]);
  const { usuario } = usarAuth();

  // Cargar favoritos desde el backend cuando hay sesión activa
  const cargarFavoritos = useCallback(async () => {
    if (!usuario) {
      setFavoritos([]);
      return;
    }
    try {
      const data = await api.obtenerFavoritos();
      setFavoritos(data);
    } catch {
      setFavoritos([]);
    }
  }, [usuario]);

  useEffect(() => {
    cargarFavoritos();
  }, [cargarFavoritos]);

  const alternarFavorito = async (item) => {
    const esFavorito = favoritos.some((fav) => fav._id === item._id);

    if (esFavorito) {
      // Quitar de favoritos (optimista)
      setFavoritos((prev) => prev.filter((fav) => fav._id !== item._id));
      try {
        await api.quitarFavorito(item._id);
      } catch {
        // Revertir si falla
        setFavoritos((prev) => [...prev, item]);
      }
    } else {
      // Agregar a favoritos (optimista)
      setFavoritos((prev) => [...prev, item]);
      try {
        await api.agregarFavorito(item._id);
      } catch {
        // Revertir si falla
        setFavoritos((prev) => prev.filter((fav) => fav._id !== item._id));
      }
    }
  };

  return (
    <ContextoFavoritos.Provider value={{ favoritos, alternarFavorito }}>
      {children}
    </ContextoFavoritos.Provider>
  );
};

export const usarFavoritos = () => useContext(ContextoFavoritos);
