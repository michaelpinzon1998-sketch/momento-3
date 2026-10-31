import { usarFavoritos } from '../context/contexto_favoritos';

export default function Favoritos() {
  const { favoritos, alternarFavorito } = usarFavoritos();

  return (
    <div style={{ padding: '3rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ color: '#f8fafc', marginBottom: '1.5rem', textAlign: 'center' }}>
        Tus Elementos Favoritos
      </h1>

      {favoritos.length === 0 ? (
        <p style={{ color: '#94a3b8', textAlign: 'center', fontSize: '1.1rem' }}>
          No tienes elementos guardados en favoritos todavía.
        </p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          {favoritos.map((producto) => (
            <div key={producto._id} style={{ 
              background: '#1e293b',
              border: '1px solid #334155', 
              padding: '1.5rem', 
              borderRadius: '12px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: '#94a3b8', textTransform: 'uppercase' }}>{producto.categoria}</span>
                <h3 style={{ margin: '0.5rem 0', color: '#f8fafc' }}>{producto.nombre}</h3>
                <p style={{ fontSize: '1.2rem', color: '#4ade80', fontWeight: 'bold' }}>{producto.precio}</p>
              </div>
              
              <button 
                onClick={() => alternarFavorito(producto)}
                style={{ 
                  marginTop: '1rem',
                  padding: '0.7rem 1rem', 
                  cursor: 'pointer',
                  backgroundColor: '#ef4444',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: 'bold',
                  transition: 'opacity 0.2s'
                }}
              >
                ❌ Quitar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}