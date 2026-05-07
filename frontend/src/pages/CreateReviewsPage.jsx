import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../api/postsApi";
import StatusMessage from "../components/StatusMessage.jsx";

function CreateReviewsPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    content: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  function handleChange(event) {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);
    setError("");

    createPost(form)
      .then(() => {
        navigate("/reviews");
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
        <h1>Добавить отзыв</h1>

        <form onSubmit={handleSubmit}>
          <input
            name="title"
            placeholder="Заголовок"
            value={form.title}
            onChange={handleChange}
          />

          <textarea
            name="content"
            placeholder="Текст отзыва"
            value={form.content}
            onChange={handleChange}
          />

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

export default CreateReviewsPage;