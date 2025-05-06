import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { id, name, price, image, description } = product;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={image || '/img/placeholder.webp'}
        alt={name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-[#222831]">{name}</h3>
        <p className="text-sm text-gray-600 mt-2">{description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold text-[#948979]">
            ${price.toFixed(2)}
          </span>
          <button
            onClick={() => addToCart(product)}
            className="bg-[#948979] text-white px-4 py-2 rounded-md hover:bg-[#393E46] transition-colors"
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 