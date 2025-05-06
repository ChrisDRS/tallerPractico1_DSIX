import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#222831] text-[#DFD0B8] mt-auto">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">3MPRND, S.A.</h3>
            <p className="text-sm">
              Especialistas en mantenimiento y reparación de dispositivos electrónicos.
              Venta de equipos reacondicionados y accesorios compatibles.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/productos" className="text-sm hover:text-[#948979]">
                  Productos
                </Link>
              </li>
              <li>
                <Link to="/servicios" className="text-sm hover:text-[#948979]">
                  Servicios
                </Link>
              </li>
              <li>
                <Link to="/carrito" className="text-sm hover:text-[#948979]">
                  Carrito
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-2 text-sm">
              <li>📍 Dirección: Calle Principal #123</li>
              <li>📞 Teléfono: (123) 456-7890</li>
              <li>✉️ Email: info@3mprnd.com</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-[#393E46] text-center text-sm">
          <p>&copy; {new Date().getFullYear()} 3MPRND, S.A. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 