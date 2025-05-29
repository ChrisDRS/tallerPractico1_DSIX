import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import ServiceCard from '../components/ServiceCard';
import { useEffect, useState } from 'react';
import { supabase } from '@/supabase/client';

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [featuredServices, setFeaturedServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMostSold = async () => {
      setLoading(true);
      // 1. Obtener todos los items de factura
      const { data: itemsData, error: itemsError } = await supabase
        .from('invoice_items')
        .select('product_name, product_type, quantity');
      if (itemsError) {
        setLoading(false);
        return;
      }
      // 2. Agrupar y sumar por nombre y tipo
      const statsMap = {};
      itemsData.forEach(item => {
        const key = `${item.product_name}|${item.product_type}`;
        if (!statsMap[key]) {
          statsMap[key] = { product_name: item.product_name, product_type: item.product_type, total_vendido: 0 };
        }
        statsMap[key].total_vendido += item.quantity;
      });
      const statsData = Object.values(statsMap).sort((a, b) => b.total_vendido - a.total_vendido);
      // 3. Separar productos y servicios
      const topProducts = statsData.filter(i => i.product_type === 'producto').slice(0, 3);
      const topServices = statsData.filter(i => i.product_type === 'servicio').slice(0, 3);
      // 4. Obtener detalles completos de productos
      let products = [];
      if (topProducts.length > 0) {
        const { data: productsData } = await supabase
          .from('products')
          .select('*')
          .in('name', topProducts.map(p => p.product_name));
        // Ordenar igual que topProducts
        products = topProducts.map(tp => productsData.find(p => p.name === tp.product_name)).filter(Boolean);
      }
      // 5. Obtener detalles completos de servicios
      let services = [];
      if (topServices.length > 0) {
        const { data: servicesData } = await supabase
          .from('services')
          .select('*')
          .in('name', topServices.map(s => s.product_name));
        services = topServices.map(ts => servicesData.find(s => s.name === ts.product_name)).filter(Boolean);
      }
      setFeaturedProducts(products);
      setFeaturedServices(services);
      setLoading(false);
    };
    fetchMostSold();
  }, []);

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
              Tu solución integral para el mantenimiento y reparación de dispositivos electrónicos.<br></br>
              También puedes comprar productos reacondicionados en nuestra sección de productos.
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
          {loading ? (
            <div className="text-center py-12">
              <p className="text-contrast text-lg">Cargando servicios...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredServices.length > 0 ? (
                featuredServices.map(service => (
                  <ServiceCard key={service.id} service={service} />
                ))
              ) : (
                <div className="col-span-3 text-center text-light">No hay servicios vendidos aún.</div>
              )}
            </div>
          )}
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
          {loading ? (
            <div className="text-center py-12">
              <p className="text-contrast text-lg">Cargando productos...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.length > 0 ? (
                featuredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <div className="col-span-3 text-center text-light">No hay productos vendidos aún.</div>
              )}
            </div>
          )}
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