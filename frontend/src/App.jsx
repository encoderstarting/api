import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";
import CreateProductPage from "./pages/CreateProductPage";
import EditProductPage from "./pages/EditProductPage";
import ReviewsPage from "./pages/ReviewsPage";
import CreateReviewsPage from "./pages/CreateReviewsPage";
import ReviewDetalisPage from "./pages/ReviewDetalisPage";
import EditReviewPage from "./pages/EditReviewPage";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/products" />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailsPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/create-product" element={<ProtectedRoute><CreateProductPage /></ProtectedRoute>} />
        <Route path="/products/:id/edit" element={<ProtectedRoute><EditProductPage /></ProtectedRoute>} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/create-review" element={<ProtectedRoute><CreateReviewsPage /></ProtectedRoute>} />
        <Route path="/reviews/:id" element={<ReviewDetalisPage />} />
        <Route path="/reviews/:id/edit" element={<ProtectedRoute><EditReviewPage /></ProtectedRoute>} />
      </Routes>

      <div className="ticks"></div>
    </>
  );
}

export default App;