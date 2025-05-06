import { useCart } from '../context/CartContext';

const ServiceCard = ({ service }) => {
  const { addToCart } = useCart();
  const { id, name, price, description, duration } = service;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold text-[#222831] mb-2">{name}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gray-500">
          Duración estimada: {duration}
        </span>
        <span className="text-lg font-bold text-[#948979]">
          ${price.toFixed(2)}
        </span>
      </div>
      <button
        onClick={() => addToCart(service)}
        className="w-full bg-[#948979] text-white px-4 py-2 rounded-md hover:bg-[#393E46] transition-colors"
      >
        Agregar al carrito
      </button>
    </div>
  );
};

export default ServiceCard; 