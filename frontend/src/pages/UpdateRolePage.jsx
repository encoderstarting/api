import { useState } from "react";
import { updateUserRole } from "../api/usersApi";
import StatusMessage from "../components/StatusMessage";

function UpdateUserRolePage() {
  const [userId, setUserId] = useState("");
  const [role, setRole] = useState("user");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    setMessage("");
    setError("");

    updateUserRole(userId, role)
      .then((data) => setMessage(data.message))
      .catch((error) => setError(error.message));
  }

  return (
    <section id="center">
      <div className="hero">
        <h1>Назначить роль</h1>

        <form onSubmit={handleSubmit}>
          <input
            value={userId}
            onChange={(event) => setUserId(event.target.value)}
            placeholder="ID пользователя"
          />

          <select value={role} onChange={(event) => setRole(event.target.value)}>
            <option value="user">user</option>
            <option value="admin">admin</option>
          </select>

          <button type="submit">Сохранить</button>
        </form>

        {message && <StatusMessage>{message}</StatusMessage>}
        {error && <StatusMessage>Ошибка: {error}</StatusMessage>}
      </div>
    </section>
  );
}

export default UpdateUserRolePage;