import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { ProveedorFavoritos } from './context/contexto_favoritos';
import { ProveedorAuth } from './context/contexto_auth';
import Header from './components/Header';
import Footer from './components/Footer';
import RutaProtegida from './components/RutaProtegida';
import Inicio from './pages/inicio';
import Catalogo from './pages/catalogo';
import Favoritos from './pages/favoritos';
import Login from './pages/login';
import './App.css';


function Layout() {
  return (
    <div className="app-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ProveedorAuth>
      <ProveedorFavoritos>
        <BrowserRouter>
          <Routes>
            {/* Ruta pública: Login (sin Header/Footer) */}
            <Route path="/login" element={<Login />} />

            {/* Rutas con Layout que requieren sesión */}
            <Route
              path="/"
              element={
                <RutaProtegida>
                  <Layout />
                </RutaProtegida>
              }
            >
              <Route index element={<Inicio />} />
              <Route path="catalogo" element={<Catalogo />} />
              <Route path="favoritos" element={<Favoritos />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ProveedorFavoritos>
    </ProveedorAuth>
  );
}
