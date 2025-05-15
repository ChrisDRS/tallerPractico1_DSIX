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
    },
    {
      id: 4,
      name: 'Laptop MSI Reacondicionada',
      price: 899.99,
      description: 'Laptop MSI reacondicionada con garantía de 1 año.',
      image: 'https://images.unsplash.com/photo-1617294864710-bb97f05457f4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      category: 'laptops'
    },
    {
      id: 5,
      name: 'Laptop Lenovo Thinkpad Reacondicionada',
      price: 649.99,
      description: 'Laptop Lenovo Thinkpad de segunda mano con garantía de 6 meses.',
      image: 'https://images.unsplash.com/photo-1743456056142-1aaf69656dfa?q=80&w=2068&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      category: 'laptops'
    },
    {
      id: 6,
      name: 'Samsung Galaxy Note 10 plus Reacondicionado',
      price: 249.99,
      description: 'Samsung Galaxy Note 10 plus reacondicionado con garantía de 2 meses.',
      image: 'https://images.unsplash.com/photo-1565967249821-083c4775e5bc?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      category: 'celulares'
    },
    {
      id: 7,
      name: 'Huawei Y7 Reacondicionado',
      price: 129.99,
      description: 'Huawei Y7 reacondicionado con garantía de 2 meses.',
      image: 'https://images.unsplash.com/photo-1653250862432-dc8068ad7973?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      category: 'celulares'
    },
    {
      id: 8,
      name: 'Samsung Galaxy Tab Reacondicionada',
      price: 399.99,
      description: 'Samsung Galaxy Tab de segunda mano con garantía de 1 año.',
      image: 'https://images.unsplash.com/photo-1622533950960-2ed47209dab0?q=80&w=2109&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      category: 'tablets'
    },
    {
      id: 9,
      name: 'Wacom Tablen Reacondicionada',
      price: 229.99,
      description: 'Tablet Wacom reacondicionada con garantía de 2 años.',
      image: 'https://images.unsplash.com/photo-1671957694269-fe1eaa1f9385?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      category: 'accesorios'
    }
  ];

  const categories = [
    { id: 'todos', name: 'Todos' },
    { id: 'laptops', name: 'Laptops' },
    { id: 'celulares', name: 'Celulares' },
    { id: 'accesorios', name: 'Accesorios' },
    { id: 'tablets', name: 'Tablets' }
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