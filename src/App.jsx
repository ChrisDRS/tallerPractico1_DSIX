import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import Home from './pages/Home';
import Productos from './pages/Productos';
import Servicios from './pages/Servicios';
import Carrito from './pages/Carrito';
import Factura from './pages/Factura';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Admin from './pages/Admin';
import AdminProducts from './pages/AdminProducts';
import AdminServices from './pages/AdminServices';

function App() {
  return (
    <Router>
      <CartProvider>
        <div className="flex flex-col min-h-screen">
          <NavBar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/productos" element={<Productos />} />
              <Route path="/servicios" element={<Servicios />} />
              <Route path="/carrito" element={<Carrito />} />
              <Route path="/factura" element={<Factura />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/products" element={<AdminProducts />} />
              <Route path="/admin/services" element={<AdminServices />} />
            </Routes>
          </main>
          <Footer />
          <Chatbot />
        </div>
      </CartProvider>
    </Router>
  );
}

export default App; 