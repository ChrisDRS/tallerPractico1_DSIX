import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const NavBar = () => {
  const { cart } = useCart();
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="bg-[#222831] text-[#DFD0B8] fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <img
                className="h-8 w-auto"
                src="/img/logo.png"
                alt="3MPRND Logo"
              />
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  to="/"
                  className="hover:bg-[#393E46] px-3 py-2 rounded-md text-sm font-medium"
                >
                  Inicio
                </Link>
                <Link
                  to="/productos"
                  className="hover:bg-[#393E46] px-3 py-2 rounded-md text-sm font-medium"
                >
                  Productos
                </Link>
                <Link
                  to="/servicios"
                  className="hover:bg-[#393E46] px-3 py-2 rounded-md text-sm font-medium"
                >
                  Servicios
                </Link>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <Link
              to="/carrito"
              className="relative hover:bg-[#393E46] px-3 py-2 rounded-md text-sm font-medium"
            >
              Carrito
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#948979] text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar; 