import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usarAuth } from '../context/contexto_auth';

export default function Login() {
  const [modo, setModo] = useState('login'); // 'login' | 'registro'
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const { verificarLogin, registrar } = usarAuth();
  const navigate = useNavigate();

  const limpiarFormulario = () => {
    setNombre('');
    setEmail('');
    setContrasena('');
    setConfirmar('');
    setError('');
  };

  const cambiarModo = (nuevoModo) => {
    setModo(nuevoModo);
    limpiarFormulario();
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setError('');
    setCargando(true);

    // Pequeño delay para simular proceso
    await new Promise((r) => setTimeout(r, 300));

    if (modo === 'registro') {
      if (!nombre.trim()) {
        setError('El nombre es obligatorio.');
        setCargando(false);
        return;
      }
      if (contrasena.length < 6) {
        setError('La contraseña debe tener al menos 6 caracteres.');
        setCargando(false);
        return;
      }
      if (contrasena !== confirmar) {
        setError('Las contraseñas no coinciden.');
        setCargando(false);
        return;
      }
      const resultado = registrar(nombre.trim(), email.trim(), contrasena);
      if (!resultado.exito) {
        setError(resultado.mensaje);
        setCargando(false);
        return;
      }
    } else {
      const resultado = verificarLogin(email.trim(), contrasena);
      if (!resultado.exito) {
        setError(resultado.mensaje);
        setCargando(false);
        return;
      }
    }

    setCargando(false);
    navigate('/');
  };

  const estiloInput = {
    width: '100%',
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    border: '1px solid #334155',
    backgroundColor: '#0f172a',
    color: '#f8fafc',
    fontSize: '1rem',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  };

  const estiloLabel = {
    display: 'block',
    color: '#94a3b8',
    fontSize: '0.875rem',
    marginBottom: '0.4rem',
    fontWeight: '500',
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0f172a',
        padding: '2rem',
      }}
    >
      <div
        style={{
          background: '#1e293b',
          border: '1px solid #334155',
          borderRadius: '16px',
          padding: '2.5rem',
          width: '100%',
          maxWidth: '420px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
        }}
      >
        {/* Logo / Título */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ color: '#38bdf8', fontSize: '1.8rem', margin: 0 }}>Mi Tienda</h1>
          <p style={{ color: '#64748b', marginTop: '0.4rem', fontSize: '0.9rem' }}>
            {modo === 'login' ? 'Inicia sesión en tu cuenta' : 'Crea tu cuenta gratis'}
          </p>
        </div>

        {/* Tabs login / registro */}
        <div
          style={{
            display: 'flex',
            background: '#0f172a',
            borderRadius: '10px',
            padding: '4px',
            marginBottom: '1.8rem',
          }}
        >
          {['login', 'registro'].map((tab) => (
            <button
              key={tab}
              onClick={() => cambiarModo(tab)}
              style={{
                flex: 1,
                padding: '0.6rem',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '0.9rem',
                transition: 'all 0.2s',
                backgroundColor: modo === tab ? '#38bdf8' : 'transparent',
                color: modo === tab ? '#0f172a' : '#64748b',
              }}
            >
              {tab === 'login' ? 'Iniciar Sesión' : 'Registrarse'}
            </button>
          ))}
        </div>

        {/* Formulario */}
        <form onSubmit={manejarEnvio} noValidate>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
            {modo === 'registro' && (
              <div>
                <label htmlFor="nombre" style={estiloLabel}>Nombre completo</label>
                <input
                  id="nombre"
                  type="text"
                  placeholder="Tu nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                  autoComplete="name"
                  style={estiloInput}
                />
              </div>
            )}

            <div>
              <label htmlFor="email" style={estiloLabel}>Correo electrónico</label>
              <input
                id="email"
                type="email"
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                style={estiloInput}
              />
            </div>

            <div>
              <label htmlFor="contrasena" style={estiloLabel}>Contraseña</label>
              <input
                id="contrasena"
                type="password"
                placeholder={modo === 'registro' ? 'Mínimo 6 caracteres' : '••••••••'}
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                required
                autoComplete={modo === 'login' ? 'current-password' : 'new-password'}
                style={estiloInput}
              />
            </div>

            {modo === 'registro' && (
              <div>
                <label htmlFor="confirmar" style={estiloLabel}>Confirmar contraseña</label>
                <input
                  id="confirmar"
                  type="password"
                  placeholder="Repite tu contraseña"
                  value={confirmar}
                  onChange={(e) => setConfirmar(e.target.value)}
                  required
                  autoComplete="new-password"
                  style={estiloInput}
                />
              </div>
            )}
          </div>

          {/* Mensaje de error */}
          {error && (
            <div
              style={{
                marginTop: '1rem',
                padding: '0.75rem 1rem',
                background: '#450a0a',
                border: '1px solid #ef4444',
                borderRadius: '8px',
                color: '#fca5a5',
                fontSize: '0.875rem',
              }}
              role="alert"
            >
              ⚠️ {error}
            </div>
          )}

          {/* Botón principal */}
          <button
            type="submit"
            disabled={cargando}
            style={{
              width: '100%',
              marginTop: '1.5rem',
              padding: '0.85rem',
              backgroundColor: cargando ? '#1e3a5f' : '#38bdf8',
              color: cargando ? '#64748b' : '#0f172a',
              border: 'none',
              borderRadius: '8px',
              fontWeight: 'bold',
              fontSize: '1rem',
              cursor: cargando ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {cargando
              ? 'Procesando...'
              : modo === 'login'
              ? 'Iniciar Sesión'
              : 'Crear Cuenta'}
          </button>
        </form>

        {/* Enlace alternativo */}
        <p style={{ textAlign: 'center', color: '#64748b', fontSize: '0.875rem', marginTop: '1.5rem' }}>
          {modo === 'login' ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}{' '}
          <button
            onClick={() => cambiarModo(modo === 'login' ? 'registro' : 'login')}
            style={{
              background: 'none',
              border: 'none',
              color: '#38bdf8',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '0.875rem',
              padding: 0,
              textDecoration: 'underline',
            }}
          >
            {modo === 'login' ? 'Regístrate aquí' : 'Inicia sesión'}
          </button>
        </p>
      </div>
    </div>
  );
}
