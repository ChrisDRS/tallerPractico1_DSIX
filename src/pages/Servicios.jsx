import { useState } from 'react';
import ServiceCard from '../components/ServiceCard';

const Servicios = () => {
  const [selectedCategory, setSelectedCategory] = useState('todos');

  // Servicios que se ofrecen
  const services = [
    {
      id: 1,
      name: 'Mantenimiento Preventivo',
      price: 34.99,
      description: 'Limpieza y optimización de tu dispositivo para prevenir problemas futuros',
      duration: '2 horas',
      category: 'mantenimiento'
    },
    {
      id: 2,
      name: 'Reparación de Pantalla',
      price: 64.99,
      description: 'Reemplazo de pantalla dañada con garantía de 3 meses',
      duration: '3-4 horas',
      category: 'reparacion'
    },
    {
      id: 3,
      name: 'Recuperación de Datos',
      price: 69.99,
      description: 'Recuperación de datos de dispositivos dañados',
      duration: '4-6 horas',
      category: 'datos'
    },
    {
      id: 4,
      name: 'Actualización de Software',
      price: 19.99,
      description: 'Actualización y optimización del sistema operativo',
      duration: '1-2 horas',
      category: 'software'
    }
  ];

  const categories = [
    { id: 'todos', name: 'Todos' },
    { id: 'mantenimiento', name: 'Mantenimiento' },
    { id: 'reparacion', name: 'Reparación' },
    { id: 'datos', name: 'Recuperación de Datos' },
    { id: 'software', name: 'Software' }
  ];

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map(service => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

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