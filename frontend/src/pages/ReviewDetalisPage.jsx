import { useEffect, useState } from "react";
import { Link, useParams,useNavigate } from "react-router-dom";
import { getPost, deletePost } from "../api/postsApi";
import StatusMessage from "../components/StatusMessage.jsx";
import { isAdmin, isAuthenticated } from "../api/authStorage";

function ReviewDetalisPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [review, setReview] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const admin = isAdmin();
  function handleDeleteReview() {
    deletePost(id)
      .then(() => {
        setMessage("Отзыв удален");
        navigate("/reviews");
      })
      .catch((error) => {
        setError(error.message);
      });
  }
  if (!admin || !isAuthenticated()) {
    navigate("/reviews");
    return null;
  }
  useEffect(() => {
    setIsLoading(true);
    setError("");

    getPost(id)
      .then((review) => {
        setReview(review);
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
        <Link to="/reviews">Назад к отзывам</Link>

        {isLoading && <StatusMessage>Загрузка...</StatusMessage>}
        {error && <StatusMessage>Ошибка: {error}</StatusMessage>}

        {!isLoading && !error && review && (
          <div className="product-card">
            <h1>{review.title}</h1>
            <p>{review.content}</p>
            <p>Автор: {review.author?.name}</p>
            <p>Создан: {review.created_at}</p>
            {admin && <Link to={`/reviews/${id}/edit`}>Редактировать</Link>}
            {admin && <Link to={`/reviews/${id}/delete`}><button type="button" onClick={handleDeleteReview}>Удалить</button></Link>}
          </div>
        )}
      </div>
    </section>
  );
}

export default ReviewDetalisPage;