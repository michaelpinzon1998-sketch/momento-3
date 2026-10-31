import { useState, useEffect } from 'react';
import { usarFavoritos } from '../context/contexto_favoritos';
import { obtenerProductos } from '../api';

export default function Catalogo() {
  const [productos, setProductos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');
  const { favoritos, alternarFavorito } = usarFavoritos();

  useEffect(() => {
    const cargar = async () => {
      setCargando(true);
      setError('');
      try {
        const data = await obtenerProductos(busqueda ? { busqueda } : {});
        setProductos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    // Debounce para no llamar la API en cada tecla
    const timer = setTimeout(cargar, 300);
    return () => clearTimeout(timer);
  }, [busqueda]);

  return (
    <div style={{ padding: '3rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ color: '#f8fafc', marginBottom: '1.5rem', textAlign: 'center' }}>
        Catálogo de Productos
      </h1>

      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
        <input
          type="text"
          placeholder="Buscar por nombre o categoría..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          style={{
            padding: '0.75rem 1rem',
            width: '100%',
            maxWidth: '400px',
            borderRadius: '8px',
            border: '1px solid #334155',
            backgroundColor: '#1e293b',
            color: '#f8fafc',
            fontSize: '1rem',
          }}
        />
      </div>

      {/* Estado de carga */}
      {cargando && (
        <p style={{ textAlign: 'center', color: '#94a3b8' }}>Cargando productos...</p>
      )}

      {/* Error */}
      {error && (
        <div
          style={{
            padding: '1rem',
            background: '#450a0a',
            border: '1px solid #ef4444',
            borderRadius: '8px',
            color: '#fca5a5',
            textAlign: 'center',
            marginBottom: '1.5rem',
          }}
        >
          ⚠️ {error}
        </div>
      )}

      {/* Grid de productos */}
      {!cargando && !error && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {productos.length === 0 ? (
            <p style={{ color: '#94a3b8', gridColumn: '1/-1', textAlign: 'center' }}>
              No se encontraron productos.
            </p>
          ) : (
            productos.map((producto) => {
              const esFavorito = favoritos.some((fav) => fav._id === producto._id);
              return (
                <div
                  key={producto._id}
                  style={{
                    background: '#1e293b',
                    border: '1px solid #334155',
                    padding: '1.5rem',
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <span style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase' }}>
                      {producto.categoria}
                    </span>
                    <h3 style={{ margin: '0.5rem 0', color: '#f8fafc' }}>{producto.nombre}</h3>
                    <p style={{ fontSize: '1.2rem', color: '#4ade80', fontWeight: 'bold' }}>
                      {producto.precio}
                    </p>
                  </div>

                  <button
                    onClick={() => alternarFavorito(producto)}
                    style={{
                      marginTop: '1rem',
                      padding: '0.7rem 1rem',
                      cursor: 'pointer',
                      backgroundColor: esFavorito ? '#ef4444' : '#38bdf8',
                      color: esFavorito ? '#ffffff' : '#0f172a',
                      border: 'none',
                      borderRadius: '8px',
                      fontWeight: 'bold',
                      transition: 'opacity 0.2s',
                    }}
                  >
                    {esFavorito ? '❤️ Quitar de Favoritos' : '🤍 Agregar a Favoritos'}
                  </button>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
