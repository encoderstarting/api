function CartNotification({ productName, quantity, onGoToCart, onClose }) {
    return (
      <div className="order-notification">
        <div className="order-notification__visual" aria-hidden="true">
          <div className="order-notification__bag">
            <span>✓</span>
          </div>
        </div>
  
        <div className="order-notification__content">
          <span className="order-notification__label">Корзина обновлена</span>
          <h3>Товар добавлен в корзину</h3>
          <p>
            {productName} добавлен в количестве {quantity} шт.
          </p>
        </div>
  
        <button type="button" onClick={onGoToCart}>
          Перейти в корзину
        </button>
  
        <button type="button" onClick={onClose}>
          Закрыть
        </button>
      </div>
    );
  }
  
  export default CartNotification;