import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import logo from '../assets/img/logo.png';
import { useAuth } from '../context/AuthContext';
import { useState, createContext, useContext } from 'react';

// SlideMenuContext para compartir el estado del slide menu
export const SlideMenuContext = createContext();

const NavBar = () => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);
  const [slideMenuOpen, setSlideMenuOpen] = useState(false);

  // Cierra el menú al navegar
  const handleNav = () => setSlideMenuOpen(false);

  return (
    <SlideMenuContext.Provider value={{ slideMenuOpen, setSlideMenuOpen }}>
      <nav className="bg-background text-light fixed w-full top-0 z-[100]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-3" onClick={handleNav}>
                <img
                  src={logo}
                  alt="Logo de la empresa"
                  className="w-10 h-10 rounded bg-light p-1"
                />
                <span className="text-accent font-semibold text-lg">3MPRND, S.A.</span>
              </Link>
            </div>
            {/* Menú desktop */}
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/" className="hover:bg-contrast px-3 py-2 rounded-md text-sm font-medium">Inicio</Link>
              <Link to="/productos" className="hover:bg-contrast px-3 py-2 rounded-md text-sm font-medium">Productos</Link>
              <Link to="/servicios" className="hover:bg-contrast px-3 py-2 rounded-md text-sm font-medium">Servicios</Link>
              <Link to="/carrito" className="relative hover:bg-contrast px-3 py-2 rounded-md text-sm font-medium">
                Carrito
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-text rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {cartItemsCount}
                  </span>
                )}
              </Link>
              {user ? (
                <button onClick={logout} className="hover:bg-contrast px-3 py-2 rounded-md text-sm font-medium ml-2">Cerrar sesión</button>
              ) : (
                <Link to="/login" className="hover:bg-contrast px-3 py-2 rounded-md text-sm font-medium ml-2">Iniciar sesión</Link>
              )}
            </div>
            {/* Botón hamburguesa móvil */}
            <div className="md:hidden flex items-center">
              <button
                className="focus:outline-none"
                onClick={() => setSlideMenuOpen(true)}
                aria-label="Abrir menú"
              >
                <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {/* Slide menu móvil */}
        {slideMenuOpen && (
          <div className="fixed inset-0 z-[100] flex">
            {/* Fondo oscuro */}
            <div className="fixed inset-0 bg-black bg-opacity-40 z-[100]" onClick={handleNav}></div>
            {/* Slide */}
            <div className="ml-auto w-64 bg-background h-full shadow-lg flex flex-col justify-between animate-slideInRight z-[100]">
              <div>
                <div className="flex items-center justify-between px-6 py-4 border-b border-contrast">
                  <span className="text-accent font-semibold text-lg">Menú</span>
                  <button onClick={handleNav} aria-label="Cerrar menú">
                    <svg className="w-7 h-7 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <nav className="flex flex-col gap-2 px-6 py-6 text-lg font-semibold">
                  <Link to="/" onClick={handleNav} className="py-2 border-b border-contrast hover:text-accent">Home</Link>
                  <Link to="/productos" onClick={handleNav} className="py-2 border-b border-contrast hover:text-accent">Productos</Link>
                  <Link to="/servicios" onClick={handleNav} className="py-2 border-b border-contrast hover:text-accent">Servicios</Link>
                  <Link to="/carrito" onClick={handleNav} className="py-2 border-b border-contrast hover:text-accent flex items-center">Carrito
                    {cartItemsCount > 0 && (
                      <span className="ml-2 bg-accent text-text rounded-full w-5 h-5 flex items-center justify-center text-xs">{cartItemsCount}</span>
                    )}
                  </Link>
                </nav>
              </div>
              <div className="px-6 pb-8">
                {user ? (
                  <button
                    onClick={() => { logout(); handleNav(); }}
                    className="w-full bg-accent text-text py-2 rounded-md font-semibold hover:bg-contrast transition-colors"
                  >
                    Cerrar sesión
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={handleNav}
                    className="w-full block bg-accent text-text py-2 rounded-md font-semibold text-center hover:bg-contrast transition-colors"
                  >
                    Iniciar sesión
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </SlideMenuContext.Provider>
  );
};

// Animación para el slide
// Agrega esto a tu CSS global o tailwind.config.js:
// @keyframes slideInRight { from { transform: translateX(100%); } to { transform: translateX(0); } }
// .animate-slideInRight { animation: slideInRight 0.3s cubic-bezier(0.4,0,0.2,1) both; }

export default NavBar; 