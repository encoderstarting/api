import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import StatusMessage from "../components/StatusMessage.jsx";
import { deletePost } from "../api/postsApi";
function DeleteReviewsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  function handleDeleteReview() {
    setIsDeleting(true);
    deletePost(id)
      .then(() => {
        setMessage("Отзыв удален");
        navigate("/reviews");
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsDeleting(false);
      });
  }
  return (
    <section id="center">
      <div className="hero">
        <h1>Удалить отзыв</h1>
        {error && <StatusMessage>Ошибка: {error}</StatusMessage>}
        {isLoading && <StatusMessage>Загрузка...</StatusMessage>}
        {isDeleting && <StatusMessage>Удаление...</StatusMessage>}
        {message && <StatusMessage>{message}</StatusMessage>}
        <button type="button" onClick={handleDeleteReview}>Удалить</button>
      </div>
    </section>
  );
}
export default DeleteReviewsPage;