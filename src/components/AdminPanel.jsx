import React, { useState, useEffect } from 'react';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../firebase/products';
import { getServices, addService, updateService, deleteService } from '../firebase/services';

const AdminPanel = () => {
    const [products, setProducts] = useState([]);
    const [services, setServices] = useState([]);
    const [activeTab, setActiveTab] = useState('products');
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        image: ''
    });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const productsData = await getProducts();
            const servicesData = await getServices();
            setProducts(productsData);
            setServices(servicesData);
        } catch (error) {
            console.error('Error loading data:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (activeTab === 'products') {
                if (editingId) {
                    await updateProduct(editingId, formData);
                } else {
                    await addProduct(formData);
                }
            } else {
                if (editingId) {
                    await updateService(editingId, formData);
                } else {
                    await addService(formData);
                }
            }
            resetForm();
            loadData();
        } catch (error) {
            console.error('Error saving data:', error);
        }
    };

    const handleEdit = (item) => {
        setFormData({
            name: item.name,
            description: item.description,
            price: item.price,
            image: item.image
        });
        setEditingId(item.id);
    };

    const handleDelete = async (id) => {
        try {
            if (activeTab === 'products') {
                await deleteProduct(id);
            } else {
                await deleteService(id);
            }
            loadData();
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            description: '',
            price: '',
            image: ''
        });
        setEditingId(null);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Panel de Administración</h1>
            
            <div className="mb-4">
                <button
                    className={`mr-2 px-4 py-2 ${activeTab === 'products' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => setActiveTab('products')}
                >
                    Productos
                </button>
                <button
                    className={`px-4 py-2 ${activeTab === 'services' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => setActiveTab('services')}
                >
                    Servicios
                </button>
            </div>

            <form onSubmit={handleSubmit} className="mb-8 p-4 border rounded">
                <h2 className="text-xl mb-4">{editingId ? 'Editar' : 'Agregar'} {activeTab === 'products' ? 'Producto' : 'Servicio'}</h2>
                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Nombre"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="border p-2 rounded"
                        required
                    />
                    <input
                        type="number"
                        name="price"
                        placeholder="Precio"
                        value={formData.price}
                        onChange={handleInputChange}
                        className="border p-2 rounded"
                        required
                    />
                    <input
                        type="text"
                        name="image"
                        placeholder="URL de la imagen"
                        value={formData.image}
                        onChange={handleInputChange}
                        className="border p-2 rounded"
                        required
                    />
                    <textarea
                        name="description"
                        placeholder="Descripción"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="border p-2 rounded"
                        required
                    />
                </div>
                <div className="mt-4">
                    <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded mr-2">
                        {editingId ? 'Actualizar' : 'Guardar'}
                    </button>
                    {editingId && (
                        <button type="button" onClick={resetForm} className="bg-gray-500 text-white px-4 py-2 rounded">
                            Cancelar
                        </button>
                    )}
                </div>
            </form>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {(activeTab === 'products' ? products : services).map((item) => (
                    <div key={item.id} className="border p-4 rounded">
                        <img src={item.image} alt={item.name} className="w-full h-48 object-cover mb-2" />
                        <h3 className="font-bold">{item.name}</h3>
                        <p className="text-gray-600">{item.description}</p>
                        <p className="font-bold">${item.price}</p>
                        <div className="mt-2">
                            <button
                                onClick={() => handleEdit(item)}
                                className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => handleDelete(item.id)}
                                className="bg-red-500 text-white px-2 py-1 rounded"
                            >
                                Eliminar
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminPanel; 