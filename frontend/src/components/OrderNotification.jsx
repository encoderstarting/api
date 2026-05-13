function OrderNotification({ orderId, onClose }) {
    return (
      <div className="order-notification">
        <div className="order-notification__visual" aria-hidden="true">
          <div className="order-notification__bag">
            <span>✓</span>
          </div>
        </div>
  
        <div className="order-notification__content">
          <span className="order-notification__label">Покупка оформлена</span>
          <h3>Заказ успешно создан</h3>
          <p>Заказ #{orderId} оформлен. Администратор получил уведомление.</p>
        </div>
  
        <button type="button" onClick={onClose}>
          Закрыть
        </button>
      </div>
    );
  }
  
  export default OrderNotification;