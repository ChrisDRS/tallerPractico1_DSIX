import { useState, useEffect } from 'react';
import { supabase } from '@/supabase/client';
import ProductCard from '../components/ProductCard';

const Productos = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([{ id: 'todos', name: 'Todos' }]);
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('products').select('*');
      if (error) {
        setError('Error al cargar productos');
        setProducts([]);
        setCategories([{ id: 'todos', name: 'Todos' }]);
      } else {
        setProducts(data);
        // Extraer categorías únicas
        const uniqueCategories = Array.from(new Set(data.map(p => p.category).filter(Boolean)));
        setCategories([
          { id: 'todos', name: 'Todos' },
          ...uniqueCategories.map(cat => ({ id: cat, name: cat.charAt(0).toUpperCase() + cat.slice(1) }))
        ]);
      }
      setLoading(false);
    };
    fetchProducts();
  }, []);

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
        {loading ? (
          <div className="text-center py-12">
            <p className="text-contrast text-lg">Cargando productos...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500 text-lg">{error}</p>
          </div>
        ) : filteredProducts.length > 0 ? (
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