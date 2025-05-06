import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { id, name, price, image, description } = product;

  return (
    <div className="bg-text rounded-lg shadow-md overflow-hidden">
      <img
        src={image || '/img/placeholder.webp'}
        alt={name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-background">{name}</h3>
        <p className="text-sm text-contrast mt-2">{description}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-bold text-accent">
            ${price.toFixed(2)}
          </span>
          <button
            onClick={() => addToCart(product)}
            className="bg-accent text-light px-4 py-2 rounded-md hover:bg-background hover:text-accent transition-colors"
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 