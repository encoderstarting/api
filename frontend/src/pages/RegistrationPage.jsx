import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/authApi";
import { saveTokens, saveUser } from "../api/authStorage";
import StatusMessage from "../components/StatusMessage";

const genderOptions = [
  { value: "male", label: "Мужской" },
  { value: "female", label: "Женский" },
  { value: "other", label: "Другой" },
];

function RegistrationPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    const safeRequestForConsole = {
      email,
      password: "•".repeat(password.length),
      gender,
    };

    console.log("POST /api/registration", safeRequestForConsole);

    try {
      const data = await register(email, password, gender);
      console.log("Registration response", data);
      saveTokens(data.token);
      saveUser(data.user);
      navigate("/profile");
    } catch (requestError) {
      console.error("Registration error", requestError);
      setError(requestError.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main id="center" className="auth-page">
      <section className="auth-card">
        <div className="auth-intro">
          <span className="eyebrow">Тестовое задание</span>
          <h1>Создание профиля</h1>
          <p>
            Заполните три поля. После регистрации откроется страница с
            данными нового пользователя.
          </p>
        </div>

        <form className="registration-form" onSubmit={handleSubmit}>
          <label htmlFor="registration-email">Email</label>
          <input
            id="registration-email"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="name@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <label htmlFor="registration-password">Пароль</label>
          <div className="password-field">
            <input
              id="registration-password"
              type={showPassword ? "text" : "password"}
              name="password"
              autoComplete="new-password"
              placeholder="Минимум 8 символов"
              minLength={8}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            <button
              type="button"
              className="password-toggle"
              aria-pressed={showPassword}
              onClick={() => setShowPassword((isVisible) => !isVisible)}
            >
              {showPassword ? "Скрыть" : "Показать"}
            </button>
          </div>

          <label htmlFor="registration-gender">Пол</label>
          <select
            id="registration-gender"
            name="gender"
            value={gender}
            onChange={(event) => setGender(event.target.value)}
            required
          >
            <option value="" disabled>
              Выберите значение
            </option>
            {genderOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <button className="registration-submit" type="submit" disabled={isLoading}>
            {isLoading ? "Создаём профиль…" : "Зарегистрироваться"}
          </button>

          {error && <StatusMessage>Ошибка: {error}</StatusMessage>}
        </form>
      </section>
    </main>
  );
}

export default RegistrationPage;
