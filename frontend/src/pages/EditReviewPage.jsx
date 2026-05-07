import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getPost, updatePost } from "../api/postsApi";
import { isAdmin, isAuthenticated } from "../api/authStorage";
import StatusMessage from "../components/StatusMessage.jsx";

function EditReviewPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    content: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  if (!isAuthenticated()) {
    navigate("/login");
    return null;
  }

  if (!isAdmin()) {
    navigate("/reviews");
    return null;
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    setIsSaving(true);
    setError("");

    updatePost(id, form)
      .then(() => {
        navigate(`/reviews/${id}`);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsSaving(false);
      });
  }

  useEffect(() => {
    setIsLoading(true);
    setError("");

    getPost(id)
      .then((review) => {
        setForm({
          title: review.title,
          content: review.content,
        });
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
        <Link to={`/reviews/${id}`}>Назад к отзыву</Link>

        <h1>Редактировать отзыв</h1>

        {isLoading && <StatusMessage>Загрузка...</StatusMessage>}
        {error && <StatusMessage>Ошибка: {error}</StatusMessage>}

        {!isLoading && (
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

            <button type="submit" disabled={isSaving}>
              Сохранить
            </button>
          </form>
        )}

        {isSaving && <StatusMessage>Сохранение...</StatusMessage>}
      </div>
    </section>
  );
}

export default EditReviewPage;