import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Factura = () => {
  const navigate = useNavigate();
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    const url = localStorage.getItem('last_invoice_pdf');
    setPdfUrl(url);
  }, []);

  if (!pdfUrl) {
    return (
      <div className="min-h-screen pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold mb-4 text-text">No se encontró la factura</h1>
          <button
            onClick={() => navigate('/productos')}
            className="bg-accent text-text px-6 py-3 rounded-md hover:bg-contrast transition-colors"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-contrast rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-text mb-6 text-center">Factura Electrónica</h1>
          <iframe
            src={pdfUrl}
            title="Factura Electrónica"
            width="100%"
            height="700px"
            style={{ border: 'none', background: 'white' }}
          />
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => navigate('/')}
              className="bg-background text-text px-6 py-3 rounded-md hover:bg-contrast transition-colors"
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