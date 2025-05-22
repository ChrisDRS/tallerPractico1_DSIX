import React, { useState, useEffect } from 'react';
import { supabase } from '@/supabase/client';

const AdminProducts = () => {
  const initialFormData = { name: '', description: '', price: '', category: '', image: '' };
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState(initialFormData);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('id', { ascending: true }); // Added order
    if (error) {
      console.error('Error fetching products:', error);
    } else {
      setProducts(data);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddNewProductClick = () => {
    setIsAdding(true);
    setEditingProduct(null);
    setFormData(initialFormData);
  };

  const handleRowClick = (productData) => {
    setEditingProduct(productData);
    setIsAdding(false);
    setFormData({
      name: productData.name || '',
      description: productData.description || '',
      price: productData.price || '',
      category: productData.category || '',
      image: productData.image || '',
    });
  };

  const handleCancel = () => {
    setEditingProduct(null);
    setIsAdding(false);
    setFormData(initialFormData);
  };

  const handleSaveProduct = async () => {
    if (!formData.name || !formData.price) {
      alert('Nombre y Precio son campos requeridos.'); // Replace with a better notification system
      return;
    }

    let error;
    if (isAdding) {
      const { error: insertError } = await supabase.from('products').insert([formData]).select();
      error = insertError;
      if (!error) console.log('Adding new product:', formData);
    } else if (editingProduct) {
      const { error: updateError } = await supabase.from('products').update(formData).eq('id', editingProduct.id).select();
      error = updateError;
      if (!error) console.log('Updating product:', formData);
    }

    if (error) {
      console.error('Error saving product:', error);
      alert(`Error saving product: ${error.message}`); // Replace with a better notification system
    } else {
      fetchProducts();
      handleCancel();
    }
  };

  const handleDeleteProduct = async () => {
    if (editingProduct && window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      const { error } = await supabase.from('products').delete().eq('id', editingProduct.id);
      if (error) {
        console.error('Error deleting product:', error);
        alert(`Error deleting product: ${error.message}`); // Replace with a better notification system
      } else {
        fetchProducts();
        handleCancel();
      }
    }
  };

  const isFormVisible = isAdding || editingProduct;

  return (
    <div className="container mx-auto px-4 pb-4 pt-20" style={{ backgroundColor: '#1E201E' }}>
      {/* Header Section with Title and Navigation Links */}
      <div className="flex justify-between items-center bg-[#3C3D37] text-[#ECDFCC] p-4 rounded mb-4">
        <h2 className="text-xl font-bold">Gestión de Productos</h2>
        <div>
          <a href="/admin/products" className="bg-[#697565] text-[#ECDFCC] px-4 py-2 rounded mr-2 hover:bg-opacity-80">
            Productos
          </a>
          <a href="/admin/services" className="bg-[#697565] text-[#ECDFCC] px-4 py-2 rounded mr-2 hover:bg-opacity-80">
            Servicios
          </a>
          <a href="/" className="bg-[#697565] text-[#ECDFCC] px-4 py-2 rounded hover:bg-opacity-80">Home</a>
        </div>
      </div>

      <div className="flex flex-wrap -mx-2">
        {/* Products Table */}
        <div className={`px-2 mb-4 lg:mb-0 ${isFormVisible ? 'w-full lg:w-2/3' : 'w-full'}`}>
          <div className="bg-[#3C3D37] text-[#ECDFCC] p-4 rounded">
            <h3 className="text-lg font-semibold mb-3">Listado de Productos</h3>
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-[#1E201E] text-[#ECDFCC]">
                  <th className="px-4 py-2 text-left">ID</th>
                  <th className="px-4 py-2 text-left">Nombre</th>
                  <th className="px-4 py-2 text-left">Descripción</th>
                  <th className="px-4 py-2 text-left">Precio</th>
                  <th className="px-4 py-2 text-left">Categoría</th>
                  <th className="px-4 py-2 text-left">Imagen URL</th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 ? products.map((product, index) => (
                  <tr
                    key={product.id}
                    className={`cursor-pointer hover:bg-opacity-70 ${index % 2 === 0 ? 'bg-[#3C3D37]' : 'bg-[#697565]'}`}
                    onClick={() => handleRowClick(product)}
                  >
                    <td className="border border-[#1E201E] px-4 py-2">{product.id}</td>
                    <td className="border border-[#1E201E] px-4 py-2">{product.name}</td>
                    <td className="border border-[#1E201E] px-4 py-2">{product.description}</td>
                    <td className="border border-[#1E201E] px-4 py-2">{product.price}</td>
                    <td className="border border-[#1E201E] px-4 py-2">{product.category}</td>
                    <td className="border border-[#1E201E] px-4 py-2 break-all">{product.image}</td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4 border border-[#1E201E]">No hay productos disponibles.</td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="mt-4">
              <button
                className="bg-[#697565] text-[#ECDFCC] px-4 py-2 rounded hover:bg-green-700"
                onClick={handleAddNewProductClick}
              >
                Añadir Nuevo Producto
              </button>
            </div>
          </div>
        </div>

        {/* Edit/Add Product Form */}
        {isFormVisible && (
          <div className="w-full lg:w-1/3 px-2">
            <div className="bg-[#3C3D37] text-[#ECDFCC] p-4 rounded">
              <h2 className="text-xl font-bold mb-4">{isAdding ? 'Añadir Nuevo Producto' : 'Editar Producto'}</h2>
              {!isAdding && editingProduct && (
                <p className="mb-4">ID del producto: {editingProduct.id}</p>
              )}

              <div className="mb-4">
                <label htmlFor="name" className="block mb-2">Nombre</label>
                <input
                  type="text"
                  id="name"
                  name="name" // Added name attribute
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded bg-[#1E201E] border border-[#697565] text-[#ECDFCC] focus:ring-[#697565] focus:border-[#697565]"
                  placeholder="Nombre del producto"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block mb-2">Descripción</label>
                <textarea
                  id="description"
                  name="description" // Added name attribute
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full p-2 rounded bg-[#1E201E] border border-[#697565] text-[#ECDFCC] focus:ring-[#697565] focus:border-[#697565]"
                  placeholder="Descripción del producto"
                ></textarea>
              </div>
              <div className="mb-4">
                <label htmlFor="price" className="block mb-2">Precio</label>
                <input
                  type="number"
                  id="price"
                  name="price" // Added name attribute
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded bg-[#1E201E] border border-[#697565] text-[#ECDFCC] focus:ring-[#697565] focus:border-[#697565]"
                  placeholder="Precio del producto"
                  step="0.01"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="category" className="block mb-2">Categoría</label>
                <input
                  type="text"
                  id="category"
                  name="category" // Added name attribute
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded bg-[#1E201E] border border-[#697565] text-[#ECDFCC] focus:ring-[#697565] focus:border-[#697565]"
                  placeholder="Categoría del producto"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="image" className="block mb-2">Imagen URL</label>
                <input
                  type="text"
                  id="image"
                  name="image" // Added name attribute
                  value={formData.image}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded bg-[#1E201E] border border-[#697565] text-[#ECDFCC] focus:ring-[#697565] focus:border-[#697565]"
                  placeholder="URL de la imagen del producto"
                />
              </div>
              <div className="flex justify-between items-center mt-6">
                <button
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  onClick={handleCancel}
                >
                  Cancelar
                </button>
                {!isAdding && editingProduct && (
                  <button
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    onClick={handleDeleteProduct}
                  >
                    Eliminar
                  </button>
                )}
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={handleSaveProduct}
                >
                  {isAdding ? 'Añadir Producto' : 'Guardar Cambios'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProducts;