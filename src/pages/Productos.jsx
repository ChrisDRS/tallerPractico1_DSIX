import { useState } from 'react';
import ProductCard from '../components/ProductCard';

const Productos = () => {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');

  // Datos de ejemplo - Reemplazar con datos de Firestore
  const products = [
    {
      id: 1,
      name: 'Laptop HP Reacondicionada',
      price: 499.99,
      description: 'Laptop HP reacondicionada con garantía de 6 meses',
      image: '/img/laptop.webp',
      category: 'laptops'
    },
    {
      id: 2,
      name: 'Cargador Universal',
      price: 29.99,
      description: 'Cargador compatible con múltiples dispositivos',
      image: '/img/charger.webp',
      category: 'accesorios'
    },
    {
      id: 3,
      name: 'iPhone 11 Reacondicionado',
      price: 399.99,
      description: 'iPhone 11 reacondicionado con garantía de 3 meses',
      image: '/img/iphone.webp',
      category: 'celulares'
    }
  ];

  const categories = [
    { id: 'todos', name: 'Todos' },
    { id: 'laptops', name: 'Laptops' },
    { id: 'celulares', name: 'Celulares' },
    { id: 'accesorios', name: 'Accesorios' }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'todos' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          Nuestros Productos
        </h1>

        {/* Filtros */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-md ${
                    selectedCategory === category.id
                      ? 'bg-[#948979] text-white'
                      : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
            <div className="w-full md:w-64">
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-[#948979]"
              />
            </div>
          </div>
        </div>

        {/* Lista de Productos */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No se encontraron productos que coincidan con tu búsqueda.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Productos; 