import { useEffect, useState } from "react";
import { useNavigate, useParams,Link } from "react-router-dom";
import { getProduct, deleteProduct } from "../api/productsApi";
import StatusMessage from "../components/StatusMessage.jsx";
import { createOrder } from "../api/ordersApi";
import { isAuthenticated } from "../api/authStorage";
import { isAdmin } from "../api/authStorage";

function ProductDetailsPage() {
  const { id } = useParams();
  const[message, setMessage] = useState("");
  const navigate = useNavigate();
  const admin = isAdmin();
  function handleDeleteProduct() {
    const confirmed = window.confirm("Вы уверены, что хотите удалить товар?");
    if (confirmed) {
      deleteProduct(id)
        .then(() => {
          setMessage("Товар удален");
          navigate("/products");
        })
        .catch((error) => {
          setMessage(error.message);
        });
    }
  }
  function handleCreateOrder() {
    setMessage("");
    setError("");
    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }
    if (quantity <= 0 || quantity > product.quantity) {
    setMessage("Количество не может быть меньше 1 или больше количества на складе");
      return;
    }
  
    createOrder(product.id, quantity)
      .then(() => {
        setProduct({...product, quantity: product.quantity - quantity});
        setQuantity(1);
        setMessage("Заказ создан");
      })
      .catch((error) => {
        setError(error.message);
      });
  }
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

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
            <p>Количество на складе: {product.quantity}</p>
            <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} min={1} max={product.quantity} />
            <button onClick={handleCreateOrder} disabled={product.quantity <= 0 || !isAuthenticated() || quantity <= 0 || quantity > product.quantity}>{isAuthenticated() ? "Купить" : "Войдите для покупки"}</button>
            {isAdmin() && <Link to={`/products/${product.id}/edit`}>Редактировать</Link>}
            {isAdmin() && (
  <button type="button" onClick={handleDeleteProduct}>
    Удалить
  </button>
)}
            
            {product.quantity <= 0 && <StatusMessage>Товара нет в наличии</StatusMessage>} {quantity <= 0 && <StatusMessage>Количество не может быть меньше 1</StatusMessage>} {quantity > product.quantity && <StatusMessage>Количество не может быть больше {product.quantity}</StatusMessage>}
            {message && <StatusMessage>{message}</StatusMessage>}
          </div>
        )}
      </div>
    </section>
  );
}
export default ProductDetailsPage;