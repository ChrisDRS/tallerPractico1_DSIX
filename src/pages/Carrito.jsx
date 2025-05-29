import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import QRCode from 'qrcode';
import logo from '../assets/img/logo.png';
import { supabase } from '@/supabase/client';

const Carrito = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, getTotal, clearCart } = useCart();
  const { user } = useAuth();
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
      // TODO: Migrar a Supabase
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
          <h1 className="text-3xl font-bold mb-4 text-text">Tu carrito está vacío</h1>
          <p className="text-light mb-8">
            Agrega algunos productos o servicios para continuar
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => navigate('/productos')}
              className="bg-accent text-text px-6 py-3 rounded-md hover:bg-contrast transition-colors"
            >
              Ver Productos
            </button>
            <button
              onClick={() => navigate('/servicios')}
              className="bg-accent text-text px-6 py-3 rounded-md hover:bg-contrast transition-colors"
            >
              Ver Servicios
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Generar y abrir PDF de factura electrónica
  const handleGeneratePDF = async (invoiceId, invoiceData, items) => {
    const doc = new jsPDF();
    // Logo
    const img = new Image();
    img.src = logo;
    doc.addImage(img, 'PNG', 10, 10, 30, 30);
    // Empresa y CUFE
    doc.setFontSize(16);
    doc.text('3MPRND, S.A.', 50, 20);
    doc.setFontSize(10);
    doc.text(`Factura Electrónica (CUFE): ${invoiceId}`, 50, 28);
    doc.text(`Fecha: ${new Date(invoiceData.created_at).toLocaleString()}`, 50, 34);
    // Emisor y receptor
    doc.setFillColor(200, 220, 255);
    doc.rect(10, 45, 90, 16, 'F');
    doc.setFontSize(11);
    doc.text('DATOS DEL EMISOR', 12, 51);
    doc.text('3MPRND, S.A.', 12, 56);
    doc.text('DATOS DEL RECEPTOR', 60, 51);
    doc.text(invoiceData.customer_name || user?.email || 'Usuario', 60, 56);
    // QR
    const qrDataUrl = await QRCode.toDataURL(window.location.origin);
    doc.addImage(qrDataUrl, 'PNG', 160, 10, 30, 30);
    // Items
    autoTable(doc, {
      startY: 65,
      head: [['#', 'ARTÍCULO', 'CANT.', 'PRECIO']],
      body: items.map((item, idx) => [
        idx + 1,
        item.name,
        item.quantity,
        `$${item.price.toFixed(2)}`
      ]),
      theme: 'grid',
      headStyles: { fillColor: [255, 204, 102] },
      bodyStyles: { fillColor: [255, 255, 255] },
      margin: { left: 10, right: 10 },
    });
    // Subtotales y total
    const y = doc.lastAutoTable.finalY + 10;
    doc.setFillColor(120, 60, 180);
    doc.rect(10, y, 190, 20, 'F');
    doc.setTextColor(255,255,255);
    doc.setFontSize(12);
    doc.text(`SUBTOTAL: $${invoiceData.total.toFixed(2)}`, 15, y + 8);
    doc.text(`TOTAL: $${invoiceData.total.toFixed(2)}`, 15, y + 16);
    doc.text(`FORMA DE PAGO: Efectivo`, 80, y + 16);
    // Información comercial adicional
    doc.setFillColor(80, 120, 100);
    doc.rect(10, y + 25, 190, 28, 'F');
    doc.setTextColor(255,255,255);
    doc.setFontSize(10);
    doc.text('Utilice esta factura para efectuar su compra en:', 15, y + 32);
    doc.text('Lassonde, Universidad Tecnologica de Panamá', 15, y + 38);
    doc.text('Teléfono: (507) 6913-2396', 15, y + 44);
    doc.text('Email: chrisdrs.dev@3mprnd.com', 15, y + 50);
    // Guardar en localStorage para Factura.jsx
    const pdfBlob = doc.output('blob');
    const pdfUrl = URL.createObjectURL(pdfBlob);
    localStorage.setItem('last_invoice_pdf', pdfUrl);
    // Ya no abrir en nueva pestaña
  };

  // Proceder con el pago
  const handleProceedToPay = async () => {
    // 1. Guardar factura en la base de datos
    const invoiceData = {
      total: getTotal(),
      status: 'paid',
      customer_name: user?.email || 'Usuario',
    };
    const { data: invoice, error: invoiceError } = await supabase
      .from('invoices')
      .insert([invoiceData])
      .select()
      .single();
    if (invoiceError) {
      alert('Error al guardar la factura.');
      return;
    }
    // 2. Guardar items
    const itemsToInsert = cart.map(item => ({
      invoice_id: invoice.id,
      product_name: item.name,
      product_type: item.type || 'producto',
      quantity: item.quantity,
      price: item.price
    }));
    const { error: itemsError } = await supabase
      .from('invoice_items')
      .insert(itemsToInsert);
    if (itemsError) {
      alert('Error al guardar los items de la factura.');
      return;
    }
    // 3. Generar PDF
    await handleGeneratePDF(invoice.id, invoice, cart);
    // 4. Limpiar carrito y redirigir a factura
    clearCart();
    navigate('/factura');
  };

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8 text-text">Carrito de Compras</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de Items */}
          <div className="lg:col-span-2">
            {cart.map(item => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b border-background py-4"
              >
                <div>
                  <h3 className="font-semibold text-text">{item.name}</h3>
                  <p className="text-light">${item.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-background rounded">
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      className="px-3 py-1 hover:bg-background text-text"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 text-text">{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className="px-3 py-1 hover:bg-background text-text"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-accent hover:text-light"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* Resumen y Pago */}
          <div className="lg:col-span-1">
            <div className="bg-contrast p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-text">Resumen del Pedido</h2>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-light">
                  <span>Subtotal:</span>
                  <span>${getTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold text-text">
                  <span>Total:</span>
                  <span>${getTotal().toFixed(2)}</span>
                </div>
              </div>
              {/* Pago y sesión */}
              {!user && (
                <div className="mb-4">
                  <p className="text-accent text-sm mb-2">Para proceder con el pago debe iniciar sesión</p>
                  <button
                    onClick={() => navigate('/login')}
                    className="w-full bg-accent text-text px-4 py-2 rounded-md hover:bg-contrast transition-colors"
                  >
                    Iniciar sesión
                  </button>
                </div>
              )}
              <button
                type="button"
                disabled={!user}
                onClick={handleProceedToPay}
                className={`w-full bg-accent text-text px-4 py-2 rounded-md hover:bg-contrast transition-colors ${!user ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Proceder al Pago
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carrito; 