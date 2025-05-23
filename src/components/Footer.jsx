import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-background text-light mt-auto">
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
                <Link to="/productos" className="text-sm hover:text-accent">
                  Productos
                </Link>
              </li>
              <li>
                <Link to="/servicios" className="text-sm hover:text-accent">
                  Servicios
                </Link>
              </li>
              <li>
                <Link to="/carrito" className="text-sm hover:text-accent">
                  Carrito
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contacto</h3>
            <ul className="space-y-2 text-sm">
              <li>📍 Dirección: Lassonde, Universidad Tecnologica de Panamá</li>
              <li>📞 Teléfono: (507) 6913-2396</li>
              <li>✉️ Email: chrisdrs.dev@3mprnd.com</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-contrast text-center text-sm">
          <p>&copy; {new Date().getFullYear()} 3MPRND, S.A. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 