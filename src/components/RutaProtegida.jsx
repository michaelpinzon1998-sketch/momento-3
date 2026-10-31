import { Navigate } from 'react-router-dom';
import { usarAuth } from '../context/contexto_auth';

/**
 * Envuelve rutas que requieren sesión iniciada.
 * Si el usuario no está autenticado, redirige a /login.
 */
export default function RutaProtegida({ children }) {
  const { usuario } = usarAuth();
  if (!usuario) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
