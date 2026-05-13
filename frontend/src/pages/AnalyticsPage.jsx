import { useEffect, useState } from "react";
import { getAnalytics } from "../api/analyticsApi";
import StatusMessage from "../components/StatusMessage";

function AnalyticsPage() {
  const [analytics, setAnalytics] = useState(null);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function loadAnalytics() {
    setIsLoading(true);
    setError("");

    getAnalytics(from, to)
      .then((data) => {
        setAnalytics(data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleSubmit(event) {
    event.preventDefault();
    loadAnalytics();
  }

  useEffect(() => {
    loadAnalytics();
  }, []);

  return (
    <section id="center">
      <div className="hero">
        <h1>Аналитика</h1>

        <form onSubmit={handleSubmit}>
          <label>
            Дата от
            <input
              type="date"
              value={from}
              onChange={(event) => setFrom(event.target.value)}
            />
          </label>

          <label>
            Дата до
            <input
              type="date"
              value={to}
              onChange={(event) => setTo(event.target.value)}
            />
          </label>

          <button type="submit" disabled={isLoading}>
            Показать аналитику
          </button>
        </form>

        {isLoading && <StatusMessage>Загрузка...</StatusMessage>}
        {error && <StatusMessage>Ошибка: {error}</StatusMessage>}

        {analytics && !isLoading && !error && (
          <>
            <div className="product-card">
              <h2>Общие показатели</h2>
              <p>Количество заказов: {analytics.orders_count}</p>
              <p>Общая выручка: {analytics.total_revenue}</p>
              <p>Средний чек: {analytics.average_order_value}</p>
              <p>Активных товаров: {analytics.active_products_count}</p>
              <p>Пользователей: {analytics.users_count}</p>
            </div>

            <div className="product-card">
              <h2>Топ товаров</h2>

              {analytics.top_products.length === 0 && (
                <p>Нет данных по продажам</p>
              )}

              {analytics.top_products.map((product) => (
                <div key={product.id}>
                  <h3>{product.name}</h3>
                  <p>Продано: {product.sold_quantity}</p>
                  <p>Выручка: {product.revenue}</p>
                </div>
              ))}
            </div>

            <div className="product-card">
              <h2>Товары с малым остатком</h2>

              {analytics.low_stock_products.length === 0 && (
                <p>Таких товаров нет</p>
              )}

              {analytics.low_stock_products.map((product) => (
                <div key={product.id}>
                  <h3>{product.name}</h3>
                  <p>Остаток: {product.quantity}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default AnalyticsPage;