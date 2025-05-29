import { useEffect, useState } from 'react';
import { supabase } from '../supabase/client';
import { Link } from 'react-router-dom';

const Admin = () => {
  const [invoices, setInvoices] = useState([]);
  const [itemsStats, setItemsStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInvoicesAndStats = async () => {
      setLoading(true);
      try {
        // Obtener facturas
        const { data: invoicesData, error: invoicesError } = await supabase
          .from('invoices')
          .select('*, invoice_items(*)')
          .order('created_at', { ascending: false });

        if (invoicesError) throw invoicesError;
        setInvoices(invoicesData);

        // Obtener todos los items y agrupar en JS
        const { data: itemsData, error: itemsError } = await supabase
          .from('invoice_items')
          .select('product_name, product_type, quantity');
        if (itemsError) throw itemsError;

        // Agrupar y sumar en JS
        const statsMap = {};
        itemsData.forEach(item => {
          const key = `${item.product_name}|${item.product_type}`;
          if (!statsMap[key]) {
            statsMap[key] = { product_name: item.product_name, product_type: item.product_type, total_vendido: 0 };
          }
          statsMap[key].total_vendido += item.quantity;
        });
        const statsData = Object.values(statsMap).sort((a, b) => b.total_vendido - a.total_vendido);
        setItemsStats(statsData);
      } catch (err) {
        setError('Error al cargar los datos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchInvoicesAndStats();
  }, []);

  if (loading) {
    return <div className="min-h-screen pt-24 pb-16 text-center">Cargando datos...</div>;
  }

  if (error) {
    return <div className="min-h-screen pt-24 pb-16 text-center text-red-500">{error}</div>;
  }

  // Estadísticas generales
  const totalFacturas = invoices.length;
  const totalVendido = invoices.reduce((acc, inv) => acc + Number(inv.total), 0);
  const facturasPendientes = invoices.filter(inv => inv.status === 'pending').length;

  return (
    <div className="min-h-screen pt-24 pb-16" style={{ backgroundColor: '#1E201E' }}>
      {/* Header Section with Title and Navigation Links */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center bg-[#3C3D37] text-[#ECDFCC] p-4 rounded mb-8">
          <h2 className="text-xl font-bold">Administración General</h2>
          <div>
            <Link to="/admin/products" className="bg-[#697565] text-[#ECDFCC] px-4 py-2 rounded mr-2 hover:bg-opacity-80">
              Productos
            </Link>
            <Link to="/admin/services" className="bg-[#697565] text-[#ECDFCC] px-4 py-2 rounded hover:bg-opacity-80">
              Servicios
            </Link>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 pb-4 pt-2">
        <div className="bg-[#3C3D37] text-[#ECDFCC] p-8 rounded shadow">
          <h1 className="text-3xl font-bold mb-8">Panel de Administración</h1>
          {/* Resumen */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-[#232420] rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-2">Total de Facturas</h3>
              <p className="text-3xl font-bold">{totalFacturas}</p>
            </div>
            <div className="bg-[#232420] rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-2">Total Vendido</h3>
              <p className="text-3xl font-bold">${totalVendido.toFixed(2)}</p>
            </div>
            <div className="bg-[#232420] rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-2">Facturas Pendientes</h3>
              <p className="text-3xl font-bold">{facturasPendientes}</p>
            </div>
          </div>
          {/* Estadísticas de productos/servicios más vendidos */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Productos y Servicios más vendidos</h2>
            <div className="bg-[#232420] rounded-lg shadow overflow-x-auto">
              <table className="min-w-full divide-y divide-background">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase">Nombre</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase">Tipo</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase">Cantidad Vendida</th>
                  </tr>
                </thead>
                <tbody>
                  {itemsStats.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="text-center py-4 text-[#ECDFCC]">No hay ventas registradas.</td>
                    </tr>
                  ) : (
                    itemsStats.map(item => (
                      <tr key={item.product_name}>
                        <td className="px-6 py-4">{item.product_name}</td>
                        <td className="px-6 py-4">{item.product_type}</td>
                        <td className="px-6 py-4">{item.total_vendido}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
          {/* Tabla de Facturas */}
          <div className="bg-[#232420] rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-background">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase">ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase">Fecha</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase">Total</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase">Estado</th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase">Comprobante</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-4 text-[#ECDFCC]">No hay facturas registradas.</td>
                    </tr>
                  ) : (
                    invoices.map(inv => (
                      <tr key={inv.id}>
                        <td className="px-6 py-4">{inv.id.slice(0, 8)}...</td>
                        <td className="px-6 py-4">{new Date(inv.created_at).toLocaleDateString()}</td>
                        <td className="px-6 py-4">${Number(inv.total).toFixed(2)}</td>
                        <td className="px-6 py-4">{inv.status}</td>
                        <td className="px-6 py-4">
                          {inv.payment_proof ? (
                            <a href={inv.payment_proof} target="_blank" rel="noopener noreferrer" className="text-accent hover:text-light">
                              Ver comprobante
                            </a>
                          ) : (
                            '—'
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;