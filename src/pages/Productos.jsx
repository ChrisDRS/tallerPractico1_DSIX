import { useState } from 'react';
import ProductCard from '../components/ProductCard';

const Productos = () => {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');

  // Datos de ejemplo - Productos
  // Esto se reemplazara luego con productos de firestore (base de datos en firebase)
  
  const products = [
    {
      id: 1,
      name: 'Laptop HP Reacondicionada',
      price: 499.99,
      description: 'Laptop HP reacondicionada con garantía de 6 meses.',
      image: 'https://images.unsplash.com/photo-1691085475426-d9636c7010b3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
      category: 'laptops'
    },
    {
      id: 2,
      name: 'Cargador Portatil Universal',
      price: 29.99,
      description: 'Cargador portatil compatible con múltiples dispositivos.',
      image: 'https://images.unsplash.com/photo-1736516434209-51ece1006788?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      category: 'accesorios'
    },
    {
      id: 3,
      name: 'iPhone 11 Reacondicionado',
      price: 399.99,
      description: 'iPhone 11 reacondicionado con garantía de 3 meses.',
      image: 'https://images.unsplash.com/photo-1574719128055-f4f84a835363?q=80&w=1889&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 
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
        <h1 className="text-3xl font-bold text-center mb-8 text-text">
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
                      ? 'bg-accent text-light'
                      : 'bg-contrast text-light hover:bg-background'
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
                className="w-full px-4 py-2 border border-contrast rounded-md focus:outline-none focus:border-accent bg-text text-background"
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
            <p className="text-contrast text-lg">
              No se encontraron productos que coincidan con tu búsqueda.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Productos; 