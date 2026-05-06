import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProduct } from "../api/productsApi";
import StatusMessage from "../components/StatusMessage.jsx";

function ProductDetailsPage() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setError("");

    getProduct(id)
      .then((product) => {
        setProduct(product);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  return (
    <section id="center">
      <div className="hero">
        <Link to="/products">Назад к товарам</Link>

        {isLoading && <StatusMessage>Загрузка...</StatusMessage>}

        {error && <StatusMessage>Ошибка: {error}</StatusMessage>}

        {!isLoading && !error && product && (
          <div className="product-card">
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>Цена: {product.price} руб.</p>
            <p>Бренд: {product.brand}</p>
            <p>Количество: {product.quantity}</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default ProductDetailsPage;