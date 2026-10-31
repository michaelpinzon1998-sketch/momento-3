import { NavLink, useNavigate } from 'react-router-dom';
import { usarFavoritos } from '../context/contexto_favoritos';
import { usarAuth } from '../context/contexto_auth';

export default function Header() {
  const { favoritos } = usarFavoritos();
  const { usuario, cerrarSesion } = usarAuth();
  const navigate = useNavigate();

  const manejarCerrarSesion = () => {
    cerrarSesion();
    navigate('/login');
  };

  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1.2rem 2rem',
        background: '#1e293b',
        borderBottom: '1px solid #334155',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        flexWrap: 'wrap',
        gap: '1rem',
      }}
    >
      {/* Logo */}
      <h2 style={{ margin: 0, fontSize: '1.5rem', color: '#38bdf8' }}>Mi Tienda</h2>

      {/* Navegación */}
      <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
        <NavLink
          to="/"
          end
          style={({ isActive }) => ({
            color: isActive ? '#38bdf8' : '#94a3b8',
            textDecoration: 'none',
            fontWeight: 'bold',
            transition: 'color 0.2s',
          })}
        >
          Inicio
        </NavLink>
        <NavLink
          to="/catalogo"
          style={({ isActive }) => ({
            color: isActive ? '#38bdf8' : '#94a3b8',
            textDecoration: 'none',
            fontWeight: 'bold',
            transition: 'color 0.2s',
          })}
        >
          Catálogo
        </NavLink>
        <NavLink
          to="/favoritos"
          style={({ isActive }) => ({
            color: isActive ? '#38bdf8' : '#94a3b8',
            textDecoration: 'none',
            fontWeight: 'bold',
            transition: 'color 0.2s',
          })}
        >
          Favoritos ({favoritos.length})
        </NavLink>
      </nav>

      {/* Usuario + cerrar sesión */}
      {usuario && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
            👤 <strong style={{ color: '#f8fafc' }}>{usuario.nombre}</strong>
          </span>
          <button
            onClick={manejarCerrarSesion}
            style={{
              padding: '0.45rem 1rem',
              backgroundColor: 'transparent',
              color: '#ef4444',
              border: '1px solid #ef4444',
              borderRadius: '8px',
              fontWeight: 'bold',
              fontSize: '0.85rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#ef4444';
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#ef4444';
            }}
          >
            Cerrar sesión
          </button>
        </div>
      )}
    </header>
  );
}
