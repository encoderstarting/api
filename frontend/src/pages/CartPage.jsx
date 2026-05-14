import { useState } from "react";
import { createOrder } from "../api/ordersApi";
import { clearCart, getCart, removeFromCart } from "../api/cartStorage";
import StatusMessage from "../components/StatusMessage";
import OrderNotification from "../components/OrderNotification";

function CartPage() {
  const [cart, setCart] = useState(getCart());
  const [error, setError] = useState("");
  const [createdOrderId, setCreatedOrderId] = useState(null);

  const totalAmount = cart.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);

  function handleRemove(productId) {
    removeFromCart(productId);
    setCart(getCart());
  }

  function handleCreateOrder() {
    if(cart.length === 0) {
      setError("Корзина пуста");
      return;
    }
    setError("");

    const items = cart.map((item) => ({
      product_id: item.product.id,
      quantity: item.quantity,
    }));

    createOrder(items)
      .then((order) => {
        clearCart();
        setCart([]);
        setCreatedOrderId(order.data.id);
      })
      .catch((error) => {
        setError(error.message);
      });
  }

  return (
    <section id="center">
      <div className="hero">
        <h1>Корзина</h1>

        {error && <StatusMessage>Ошибка: {error}</StatusMessage>}

        {cart.length === 0 && !createdOrderId && (
          <StatusMessage>Корзина пустая</StatusMessage>
        )}

        {cart.map((item) => (
          <div className="product-card" key={item.product.id}>
            <h2>{item.product.name}</h2>
            <p>Цена: {item.product.price} руб.</p>
            <p>Количество: {item.quantity}</p>
            <p>Сумма: {item.product.price * item.quantity} руб.</p>

            <button type="button" onClick={() => handleRemove(item.product.id)}>
              Удалить
            </button>
          </div>
        ))}

        {cart.length > 0 && (
          <div className="product-card">
            <h2>Итого: {totalAmount} руб.</h2>

            <button type="button" onClick={handleCreateOrder}>
              Оформить заказ
            </button>
          </div>
        )}

        {createdOrderId && (
          <OrderNotification
            orderId={createdOrderId}
            onClose={() => setCreatedOrderId(null)}
          />
        )}
      </div>
    </section>
  );
}

export default CartPage;