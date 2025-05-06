import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase/config';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';

const Factura = () => {
  const navigate = useNavigate();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestInvoice = async () => {
      try {
        const q = query(
          collection(db, 'invoices'),
          orderBy('createdAt', 'desc'),
          limit(1)
        );
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          const latestInvoice = querySnapshot.docs[0].data();
          setInvoice(latestInvoice);
        }
      } catch (error) {
        console.error('Error al obtener la factura:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestInvoice();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p>Cargando factura...</p>
        </div>
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="min-h-screen pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold mb-4">No se encontró la factura</h1>
          <button
            onClick={() => navigate('/productos')}
            className="bg-[#948979] text-white px-6 py-3 rounded-md hover:bg-[#393E46] transition-colors"
          >
            Volver a la tienda
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Encabezado */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#222831]">3MPRND, S.A.</h1>
            <p className="text-gray-600">Factura de Compra</p>
          </div>

          {/* Información de la Factura */}
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-lg font-semibold mb-2">Detalles de la Factura</h2>
              <p>Fecha: {new Date(invoice.createdAt.toDate()).toLocaleDateString()}</p>
              <p>Estado: {invoice.status}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">Información de Pago</h2>
              <p>Método: Transferencia Bancaria</p>
              <p>Comprobante: <a href={invoice.paymentProof} target="_blank" rel="noopener noreferrer" className="text-[#948979] hover:underline">Ver comprobante</a></p>
            </div>
          </div>

          {/* Items */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Items</h2>
            <div className="border rounded-lg overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Producto/Servicio
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cantidad
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Precio
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subtotal
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {invoice.items.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {item.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{item.quantity}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          ${item.price.toFixed(2)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Total */}
          <div className="text-right">
            <div className="text-xl font-semibold">
              Total: ${invoice.total.toFixed(2)}
            </div>
          </div>

          {/* Botones de Acción */}
          <div className="mt-8 flex justify-center space-x-4">
            <button
              onClick={() => window.print()}
              className="bg-[#948979] text-white px-6 py-3 rounded-md hover:bg-[#393E46] transition-colors"
            >
              Imprimir Factura
            </button>
            <button
              onClick={() => navigate('/productos')}
              className="bg-gray-100 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-200 transition-colors"
            >
              Volver a la Tienda
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Factura; 