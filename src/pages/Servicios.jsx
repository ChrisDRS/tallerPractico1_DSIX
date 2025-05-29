import { useState, useEffect } from 'react';
import { supabase } from '@/supabase/client';
import ServiceCard from '../components/ServiceCard';

const Servicios = () => {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([{ id: 'todos', name: 'Todos' }]);
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('services').select('*');
      if (error) {
        setError('Error al cargar servicios');
        setServices([]);
        setCategories([{ id: 'todos', name: 'Todos' }]);
      } else {
        setServices(data);
        // Extraer categorías únicas
        const uniqueCategories = Array.from(new Set(data.map(s => s.category).filter(Boolean)));
        setCategories([
          { id: 'todos', name: 'Todos' },
          ...uniqueCategories.map(cat => ({ id: cat, name: cat.charAt(0).toUpperCase() + cat.slice(1) }))
        ]);
      }
      setLoading(false);
    };
    fetchServices();
  }, []);

  const filteredServices = services.filter(service =>
    selectedCategory === 'todos' || service.category === selectedCategory
  );

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-text">
          Nuestros Servicios
        </h1>

        {/* Descripción */}
        <div className="text-center mb-12">
          <p className="text-lg text-text max-w-3xl mx-auto">
            Ofrecemos una amplia gama de servicios profesionales para el mantenimiento
            y reparación de tus dispositivos electrónicos. Nuestro equipo de expertos
            está capacitado para manejar cualquier tipo de problema técnico.
          </p>
        </div>

        {/* Filtros */}
        <div className="mb-8">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-md ${
                  selectedCategory === category.id
                    ? 'bg-accent text-light'
                    : 'bg-contrast text-light hover:bg-background'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Lista de Servicios */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-contrast text-lg">Cargando servicios...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500 text-lg">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map(service => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        )}

        {/* Información Adicional */}
        <div className="mt-16 bg-contrast rounded-lg p-8">
          <h2 className="text-2xl font-bold text-center mb-6 text-text">
            ¿Por qué elegir nuestros servicios?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2 text-text">Garantía</h3>
              <p className="text-light">
                Todos nuestros servicios incluyen garantía de satisfacción
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2 text-text">Expertos</h3>
              <p className="text-light">
                Equipo técnico altamente capacitado y certificado
              </p>
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2 text-text">Rápido</h3>
              <p className="text-light">
                Servicio eficiente con tiempos de respuesta rápidos
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Servicios; 