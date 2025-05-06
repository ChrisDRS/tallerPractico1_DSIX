import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { storage, db } from '../firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';

const Carrito = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, getTotal, clearCart } = useCart();
  const [paymentProof, setPaymentProof] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(itemId, newQuantity);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPaymentProof(file);
      setUploadError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!paymentProof) {
      setUploadError('Por favor, sube un comprobante de pago');
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      // Subir comprobante a Firebase Storage
      const storageRef = ref(storage, `payment-proofs/${Date.now()}-${paymentProof.name}`);
      await uploadBytes(storageRef, paymentProof);
      const downloadURL = await getDownloadURL(storageRef);

      // Crear factura en Firestore
      const invoiceData = {
        items: cart,
        total: getTotal(),
        paymentProof: downloadURL,
        createdAt: new Date(),
        status: 'pending'
      };

      await addDoc(collection(db, 'invoices'), invoiceData);

      // Limpiar carrito y redirigir
      clearCart();
      navigate('/factura');
    } catch (error) {
      console.error('Error al procesar el pago:', error);
      setUploadError('Error al procesar el pago. Por favor, intenta de nuevo.');
    } finally {
      setIsUploading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold mb-4">Tu carrito está vacío</h1>
          <p className="text-gray-600 mb-8">
            Agrega algunos productos o servicios para continuar
          </p>
          <button
            onClick={() => navigate('/productos')}
            className="bg-[#948979] text-white px-6 py-3 rounded-md hover:bg-[#393E46] transition-colors"
          >
            Ver Productos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Carrito de Compras</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de Items */}
          <div className="lg:col-span-2">
            {cart.map(item => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b py-4"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image || '/img/placeholder.webp'}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border rounded">
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      className="px-3 py-1 hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="px-3 py-1">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className="px-3 py-1 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Resumen y Pago */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Resumen del Pedido</h2>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${getTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>${getTotal().toFixed(2)}</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Comprobante de Pago
                  </label>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileChange}
                    className="w-full"
                  />
                  {uploadError && (
                    <p className="text-red-500 text-sm mt-1">{uploadError}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isUploading}
                  className={`w-full bg-[#948979] text-white px-4 py-2 rounded-md hover:bg-[#393E46] transition-colors ${
                    isUploading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isUploading ? 'Procesando...' : 'Proceder al Pago'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carrito; 