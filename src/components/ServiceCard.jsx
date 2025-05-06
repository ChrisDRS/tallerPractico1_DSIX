import { useCart } from '../context/CartContext';

const ServiceCard = ({ service }) => {
  const { addToCart } = useCart();
  const { id, name, price, description, duration } = service;

  return (
    <div className="bg-text rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold text-background mb-2">{name}</h3>
      <p className="text-contrast mb-4">{description}</p>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-contrast">
          Duración estimada: {duration}
        </span>
        <span className="text-lg font-bold text-accent">
          ${price.toFixed(2)}
        </span>
      </div>
      <button
        onClick={() => addToCart(service)}
        className="w-full bg-accent text-light px-4 py-2 rounded-md hover:bg-background hover:text-accent transition-colors"
      >
        Agregar al carrito
      </button>
    </div>
  );
};

export default ServiceCard; 