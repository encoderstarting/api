import { useEffect, useState } from "react";
import { getPosts } from "../api/postsApi";
import StatusMessage from "../components/StatusMessage.jsx";
import { Link } from "react-router-dom";



function ReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setError("");

    getPosts()
      .then((posts) => {
        setReviews(posts);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <section id="center">
      <div className="hero">
        <h1>Отзывы</h1>

        {isLoading && <StatusMessage>Загрузка...</StatusMessage>}
        {error && <StatusMessage>Ошибка: {error}</StatusMessage>}

        {!isLoading && !error && reviews.length === 0 && (
          <StatusMessage>Отзывов пока нет</StatusMessage>
        )}

        {!isLoading &&
          !error &&
          reviews.map((review) => (
            <div key={review.id} className="product-card">
              <h2>{review.title}</h2>
              <p>{review.content}</p>
              <p>Автор: {review.author?.name}</p>
              <Link to={`/reviews/${review.id}`}>Подробнее...</Link>
            </div>
          ))}
      </div>
    </section>
  );
}

export default ReviewsPage;