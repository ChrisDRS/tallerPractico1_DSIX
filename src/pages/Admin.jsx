import { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';

const Admin = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const q = query(
          collection(db, 'invoices'),
          orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const invoicesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setInvoices(invoicesData);
      } catch (error) {
        console.error('Error al obtener las facturas:', error);
        setError('Error al cargar las facturas');
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-light">Cargando facturas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-accent">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8 text-text">Panel de Administración</h1>

        {/* Resumen */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-contrast rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-2 text-text">Total de Facturas</h3>
            <p className="text-3xl font-bold text-light">{invoices.length}</p>
          </div>
          <div className="bg-contrast rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-2 text-text">Total Vendido</h3>
            <p className="text-3xl font-bold text-light">
              ${invoices.reduce((total, invoice) => total + invoice.total, 0).toFixed(2)}
            </p>
          </div>
          <div className="bg-contrast rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-2 text-text">Facturas Pendientes</h3>
            <p className="text-3xl font-bold text-light">
              {invoices.filter(invoice => invoice.status === 'pending').length}
            </p>
          </div>
        </div>

        {/* Tabla de Facturas */}
        <div className="bg-contrast rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-background">
              <thead className="bg-background">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-text uppercase tracking-wider">
                    Comprobante
                  </th>
                </tr>
              </thead>
              <tbody className="bg-contrast divide-y divide-background">
                {invoices.map(invoice => (
                  <tr key={invoice.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-light">
                      {invoice.id.slice(0, 8)}...
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-light">
                      {new Date(invoice.createdAt.toDate()).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-light">
                      {invoice.items.length} items
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-light">
                      ${invoice.total.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        invoice.status === 'pending'
                          ? 'bg-accent text-text'
                          : 'bg-background text-text'
                      }`}>
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-light">
                      <a
                        href={invoice.paymentProof}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:text-light"
                      >
                        Ver comprobante
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin; 