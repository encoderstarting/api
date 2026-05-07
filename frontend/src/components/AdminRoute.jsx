import { Navigate } from "react-router-dom";
import { isAdmin, isAuthenticated } from "../api/authStorage";

function AdminRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin()) {
    return <Navigate to="/products" replace />;
  }

  return children;
}

export default AdminRoute;