import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Цена: {product.price} руб.</p>
      <Link to={`/products/${product.id}`}>Подробнее</Link>
    </div>
  );
}

export default ProductCard;