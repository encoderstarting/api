import { useEffect, useState } from "react";
import { getOrders } from "../api/ordersApi";
import StatusMessage from "../components/StatusMessage";

function OrdersHistoryPage() {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  function loadOrders() {
    setIsLoading(true);
    setError("");

    getOrders()
      .then((orders) => {
        setOrders(orders);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <section id="center">
      <div className="hero">
        <h1>История заказов</h1>

        <button type="button" onClick={loadOrders} disabled={isLoading}>
          Обновить
        </button>

        {isLoading && <StatusMessage>Загрузка...</StatusMessage>}
        {error && <StatusMessage>Ошибка: {error}</StatusMessage>}

        {!isLoading && !error && orders.length === 0 && (
          <StatusMessage>У вас пока нет заказов</StatusMessage>
        )}

        {!isLoading &&
          !error &&
          orders.map((order) => (
            <div className="product-card" key={order.id}>
              <h2>Заказ #{order.id}</h2>
              <p>Статус: {order.status}</p>
              <p>Сумма: {order.total_amount} руб.</p>
              <p>Дата: {new Date(order.created_at).toLocaleString()}</p>

              <h3>Товары</h3>

              {order.items.map((item) => (
                <div key={item.id}>
                  <p>{item.product_name}</p>
                  <p>Количество: {item.quantity}</p>
                  <p>Цена: {item.price} руб.</p>
                </div>
              ))}
            </div>
          ))}
      </div>
    </section>
  );
}

export default OrdersHistoryPage;