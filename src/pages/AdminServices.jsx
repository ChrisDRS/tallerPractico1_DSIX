import React, { useState, useEffect } from 'react';
import { supabase } from '@/supabase/client';
 
const AdminServices = () => {
  const initialFormData = { name: '', description: '', price: '', category: '', duration: '' };
  const [services, setServices] = useState([]);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState(initialFormData);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const { data, error } = await supabase.from('services').select('*').order('id', { ascending: true }); // Added order
    if (error) {
      console.error('Error fetching services:', error);
      // TODO: Add user-facing error message
    } else {
      setServices(data);
    }
  };

  const handleAddNewServiceClick = () => {
    setIsAdding(true);
    setEditingService(null);
    setFormData(initialFormData);
  };

  const handleRowClick = (serviceData) => {
    setEditingService(serviceData);
    setIsAdding(false);
    setFormData({
      name: serviceData.name || '',
      description: serviceData.description || '',
      price: serviceData.price || '',
      category: serviceData.category || '',
      duration: serviceData.duration || '',
    });
  };

  const handleCancel = () => {
    setEditingService(null);
    setIsAdding(false);
    setFormData(initialFormData);
  };

  const handleSaveService = async () => {
    // Basic validation example (can be expanded)
    if (!formData.name || !formData.price) {
      alert('Nombre y Precio son campos requeridos.'); // Replace with a better notification system
      return;
    }

    let error;
    if (isAdding) {
      // Handle add new service
      const { error: insertError } = await supabase.from('services').insert([formData]).select();
      error = insertError;
      if (!error) console.log('Adding new service:', formData);
    } else if (editingService) {
      // Handle update existing service
      const { error: updateError } = await supabase.from('services').update(formData).eq('id', editingService.id).select();
      error = updateError;
      if (!error) console.log('Saving service:', formData);
    }

    if (error) {
      console.error('Error saving service:', error);
      alert(`Error saving service: ${error.message}`); // Replace with a better notification system
    } else {
      fetchServices(); // Refresh the list
      handleCancel(); // Reset form and state
    }
  };

  const handleDeleteService = async () => {
    if (editingService && window.confirm('¿Estás seguro de que quieres eliminar este servicio?')) {
      const { error } = await supabase.from('services').delete().eq('id', editingService.id);
      if (error) {
        console.error('Error deleting service:', error);
        alert(`Error deleting service: ${error.message}`); // Replace with a better notification system
      } else {
        fetchServices(); // Refresh the list
        handleCancel(); // Clear the edit form and state
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Determine if the form should be visible
  const isFormVisible = isAdding || editingService;

  return (
    <div className="container mx-auto px-4 pb-4 pt-20" style={{ backgroundColor: '#1E201E' }}>
      {/* Header Section with Title and Navigation Links */}
      <div className="flex justify-between items-center bg-[#3C3D37] text-[#ECDFCC] p-4 rounded mb-4">
        <h2 className="text-xl font-bold">Gestión de Servicios</h2>
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
 {/* Services Table */}
 <div className={`px-2 mb-4 lg:mb-0 ${isFormVisible ? 'w-full lg:w-2/3' : 'w-full'}`}>
 <div className="bg-[#3C3D37] text-[#ECDFCC] p-4 rounded">
 <h3 className="text-lg font-semibold mb-3">Listado de Servicios</h3>
 <table className="min-w-full table-auto">
 <thead>
 <tr className="bg-[#1E201E] text-[#ECDFCC]">
 <th className="px-4 py-2 text-left">ID</th>
 <th className="px-4 py-2 text-left">Nombre</th>
 <th className="px-4 py-2 text-left">Description</th>
 <th className="px-4 py-2 text-left">Price</th>
 <th className="px-4 py-2 text-left">Category</th>
 <th className="px-4 py-2 text-left">Duration</th>
                </tr>
              </thead>
              <tbody>
                {services.length > 0 ? services.map((service, index) => (
 <tr
 key={service.id}
                    className={`cursor-pointer hover:bg-opacity-70 ${index % 2 === 0 ? 'bg-[#3C3D37]' : 'bg-[#697565]'}`}
 onClick={() => handleRowClick(service)}
 >
 <td className="border border-[#1E201E] px-4 py-2">{service.id}</td>
 <td className="border border-[#1E201E] px-4 py-2">{service.name}</td>
 <td className="border border-[#1E201E] px-4 py-2">{service.description}</td>
 <td className="border border-[#1E201E] px-4 py-2">{service.price}</td>
 <td className="border border-[#1E201E] px-4 py-2">{service.category}</td>
 <td className="border border-[#1E201E] px-4 py-2">{service.duration}</td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4 border border-[#1E201E]">No hay servicios disponibles.</td>
                  </tr>
                )}
              </tbody>
            </table>
            <div className="mt-4">
 <button
 className="bg-[#697565] text-[#ECDFCC] px-4 py-2 rounded hover:bg-green-700"
 onClick={handleAddNewServiceClick}
 >
                Añadir Nuevo Servicio
 </button>
            </div>
          </div>
        </div>

        {/* Edit/Add Service Form */}
        {isFormVisible && (
          <div className="w-full lg:w-1/3 px-2">
 <div className="bg-[#3C3D37] text-[#ECDFCC] p-4 rounded">
 <h2 className="text-xl font-bold mb-4">{isAdding ? 'Añadir Nuevo Servicio' : 'Editar Servicio'}</h2>
              {!isAdding && editingService && (
 <p className="mb-4">ID del servicio: {editingService.id}</p>
 )}

            <div className="mb-4">
              <label htmlFor="name" className="block mb-2">Nombre</label>
 <input
 type="text"
 id="name"
 name="name"
 value={formData.name}
 onChange={handleInputChange}
                  className="w-full p-2 rounded bg-[#1E201E] border border-[#697565] text-[#ECDFCC] focus:ring-[#697565] focus:border-[#697565]"
                placeholder="Nombre del servicio"
 />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block mb-2">Descripción</label>
 <textarea
 id="description"
 name="description"
 value={formData.description}
 onChange={handleInputChange}
                  rows="3" // Adjusted rows
                  className="w-full p-2 rounded bg-[#1E201E] border border-[#697565] text-[#ECDFCC] focus:ring-[#697565] focus:border-[#697565]"
                placeholder="Descripción del servicio"
 ></textarea>
            </div>
            <div className="mb-4">
              <label htmlFor="price" className="block mb-2">Precio</label>
 <input
                  type="number" // Changed to number
 id="price"
 name="price"
 value={formData.price}
 onChange={handleInputChange}
                  className="w-full p-2 rounded bg-[#1E201E] border border-[#697565] text-[#ECDFCC] focus:ring-[#697565] focus:border-[#697565]"
                placeholder="Precio del servicio"
                  step="0.01" // Optional: for decimal prices
 />
            </div>
            <div className="mb-4">
              <label htmlFor="category" className="block mb-2">Categoría</label>
 <input
 type="text"
 id="category"
 name="category"
 value={formData.category}
 onChange={handleInputChange}
 className="w-full p-2 rounded bg-[#1E201E] border border-[#697565] text-[#ECDFCC]"
                placeholder="Categoría del servicio"
 />
            </div>
            <div className="mb-4">
              <label htmlFor="duration" className="block mb-2">Duración</label>
 <input
                  type="text" // Duration can be text e.g., "1 hour", "30 mins"
 id="duration"
 name="duration"
 value={formData.duration}
 onChange={handleInputChange}
                  className="w-full p-2 rounded bg-[#1E201E] border border-[#697565] text-[#ECDFCC] focus:ring-[#697565] focus:border-[#697565]"
                  placeholder="Duración del servicio (e.g., 60 min)"
 />
            </div>
              <div className="flex justify-between items-center mt-6">
 <button
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  onClick={handleCancel}
 >
                  Cancelar
 </button>
                {!isAdding && editingService && (
 <button
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    onClick={handleDeleteService}
 >
                    Eliminar
 </button>
                )}
 <button
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  onClick={handleSaveService}
 >
                  {isAdding ? 'Añadir Servicio' : 'Guardar Cambios'}
 </button>
            </div>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default AdminServices;