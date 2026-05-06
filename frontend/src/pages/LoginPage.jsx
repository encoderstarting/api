import { useState } from "react";
import { login } from "../api/authApi";
import StatusMessage from "../components/StatusMessage.jsx";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);
    setError("");

    login(email, password)
      .then((data) => {
        localStorage.setItem("access_token", data.token.access_token);
        localStorage.setItem("refresh_token", data.token.refresh_token);
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
        <h1>Вход</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />

          <button type="submit" disabled={isLoading}>
            Войти
          </button>
        </form>

        {isLoading && <StatusMessage>Вход...</StatusMessage>}

        {error && <StatusMessage>Ошибка: {error}</StatusMessage>}
      </div>
    </section>
  );
}

export default LoginPage;