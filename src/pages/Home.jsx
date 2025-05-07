import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import ServiceCard from '../components/ServiceCard';

const Home = () => {
  // Productos y servicios de ejemplo
  const featuredProducts = [
    {
      id: 1,
      name: 'Laptop HP Reacondicionada',
      price: 499.99,
      description: 'Laptop HP reacondicionada con garantía de 6 meses',
      image: '/img/laptop.webp'
    },
    {
      id: 2,
      name: 'Cargador Universal',
      price: 29.99,
      description: 'Cargador compatible con múltiples dispositivos',
      image: '/img/charger.webp'
    }
  ];

  const featuredServices = [
    {
      id: 1,
      name: 'Mantenimiento Preventivo',
      price: 49.99,
      description: 'Limpieza y optimización de tu dispositivo',
      duration: '2 horas'
    },
    {
      id: 2,
      name: 'Reparación de Pantalla',
      price: 99.99,
      description: 'Reemplazo de pantalla dañada',
      duration: '3-4 horas'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-background text-text py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">
              Bienvenido a 3MPRND, S.A.
            </h1>
            <p className="text-xl mb-8">
              Tu solución integral para el mantenimiento y reparación de dispositivos electrónicos
            </p>
            <div className="space-x-4">
              <Link
                to="/servicios"
                className="bg-accent text-text px-6 py-3 rounded-md hover:bg-contrast transition-colors"
              >
                Nuestros Servicios
              </Link>
              <Link
                to="/productos"
                className="bg-text text-background px-6 py-3 rounded-md hover:bg-light transition-colors"
              >
                Ver Productos
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-16 bg-contrast">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-text">
            Servicios Destacados
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredServices.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/servicios"
              className="text-accent hover:text-light font-semibold"
            >
              Ver todos los servicios →
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-background">
            Productos Destacados
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/productos"
              className="text-accent hover:text-contrast font-semibold"
            >
              Ver todos los productos →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-accent text-text py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            ¿Necesitas ayuda con tu dispositivo?
          </h2>
          <p className="text-xl mb-8">
            Nuestro equipo de expertos está listo para ayudarte
          </p>
          <Link
            to="/servicios"
            className="bg-text text-accent px-8 py-4 rounded-md hover:bg-light transition-colors font-semibold"
          >
            Contactar Ahora
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home; 