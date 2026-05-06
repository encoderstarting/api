import { useEffect, useState } from "react";
import { getMe } from "../api/authApi";
import StatusMessage from "../components/StatusMessage.jsx";
import { logout } from "../api/authApi";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  function handleLogout() {
    logout()
    .finally(() => {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");


      navigate("/login");
    });
  }

  useEffect(() => {
    setIsLoading(true);
    setError("");

    getMe()
      .then((data) => {
        setUser(data.user);
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
        <h1>Профиль</h1>

        {isLoading && <StatusMessage>Загрузка...</StatusMessage>}

        {error && <StatusMessage>Ошибка: {error}</StatusMessage>}

        {!isLoading && !error && user && (
          <div>
            <p>ID: {user.id}</p>
            <p>Email: {user.email}</p>
            <p>Имя: {user.name}</p>
            <button onClick={handleLogout}>Выйти</button>
          </div>
        )}
      </div>
    </section>
  );
}

export default ProfilePage;