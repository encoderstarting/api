import { Link, useNavigate } from "react-router-dom";
import { clearTokens, isAuthenticated, isAdmin } from "../api/authStorage";

function Header() {
  const navigate = useNavigate();
  const authenticated = isAuthenticated();
  const admin = isAdmin();
  function handleLogout() {
    clearTokens();
    navigate("/login");
  }

  return (
    <header className="header">
      <Link to="/products">Товары</Link>
      <Link to="/reviews">Отзывы</Link>

      <nav>
        {authenticated ? (
          <>
            <Link to="/profile">Профиль</Link>
            {admin && <Link to="/create-product">Добавить товар</Link>}
            {admin && <Link to="/create-review">Добавить отзыв</Link>}
            <button type="button" onClick={handleLogout}>
              Выйти
            </button>
          </>
        ) : (
          <Link to="/login">Войти</Link>
        )}
      </nav>
    </header>
  );
}

export default Header;