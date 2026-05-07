import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../api/productsApi";
import StatusMessage from "../components/StatusMessage.jsx";
import { isAuthenticated, isAdmin } from "../api/authStorage";

function CreateProductPage() {
  const navigate = useNavigate();
  const authenticated = isAuthenticated();
  const admin = isAdmin();
  if(!authenticated || !admin) {
    navigate("/login");
    return null;
  }
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    brand: "",
    is_active: true,
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }
    setIsLoading(true);
    setError("");

    createProduct({
      ...form,
      price: Number(form.price),
      quantity: Number(form.quantity),
    })
      .then(() => {
        navigate("/products");
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <section id="center">
      <div className="hero">
        <h1>Добавить товар</h1>

        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Название"
            value={form.name}
            onChange={handleChange}
          />

          <input
            name="description"
            placeholder="Описание"
            value={form.description}
            onChange={handleChange}
          />

          <input
            name="price"
            type="number"
            placeholder="Цена"
            value={form.price}
            onChange={handleChange}
          />

          <input
            name="quantity"
            type="number"
            placeholder="Количество"
            value={form.quantity}
            onChange={handleChange}
          />

          <input
            name="brand"
            placeholder="Бренд"
            value={form.brand}
            onChange={handleChange}
          />

          <label>
            <input
              name="is_active"
              type="checkbox"
              checked={form.is_active}
              onChange={handleChange}
            />
            Активен
          </label>

          <button type="submit" disabled={isLoading}>
            Добавить
          </button>
        </form>

        {isLoading && <StatusMessage>Добавление...</StatusMessage>}
        {error && <StatusMessage>Ошибка: {error}</StatusMessage>}
      </div>
    </section>
  );
}

export default CreateProductPage;