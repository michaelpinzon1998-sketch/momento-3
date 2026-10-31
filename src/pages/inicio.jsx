import HeroSection from '../components/HeroSection';

export default function Inicio() {
  return (
    <div style={{ 
      padding: '3rem 2rem', 
      textAlign: 'center', 
      background: '#f4f4f9', 
      minHeight: '80vh', 
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <div style={{ 
        maxWidth: '800px', 
        width: '100%', 
        background: '#ffffff', 
        padding: '3rem 2rem', 
        borderRadius: '12px', 
        boxShadow: '0 4px 15px rgba(0,0,0,0.08)' 
      }}>
        <span style={{ 
          fontSize: '0.85rem', 
          color: '#666', 
          textTransform: 'uppercase', 
          letterSpacing: '2px',
          fontWeight: '600' 
        }}>
          Sección Principal
        </span>
        
        <h1 style={{ 
          color: '#1e1e2f', 
          fontSize: '2.5rem', 
          margin: '1rem 0 1.5rem 0',
          lineHeight: '1.2'
        }}>
          Bienvenido a Nuestra Tienda
        </h1>
        
        <p style={{ 
          fontSize: '1.1rem', 
          color: '#555', 
          lineHeight: '1.6',
          maxWidth: '600px',
          margin: '0 auto' 
        }}>
         
        </p>
      </div>
    </div>
  );
}