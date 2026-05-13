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
import AdminRoute from "./components/AdminRoute";
import DeleteReviewsPage from "./pages/DeleteReviewsPage";
import UpdateRolePage from "./pages/UpdateRolePage.jsx";
import WeatherPage from "./pages/WeatherPage";
import AnalyticsPage from "./pages/AnalyticsPage";
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
        <Route
  path="/create-product"
  element={
    <AdminRoute>
      <CreateProductPage />
    </AdminRoute>
  }
/>

<Route
  path="/products/:id/edit"
  element={
    <AdminRoute>
      <EditProductPage />
    </AdminRoute>
  }
/>
        
<Route
  path="/update-role"
  element={
    <AdminRoute>
      <UpdateRolePage />
    </AdminRoute>
  }
/>
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/create-review" element={<AdminRoute><CreateReviewsPage /></AdminRoute>} />
        <Route path="/reviews/:id" element={<ReviewDetalisPage />} />
        <Route path="/reviews/:id/edit" element={<AdminRoute><EditReviewPage /></AdminRoute>} />
        <Route path="/reviews/:id/delete" element={<AdminRoute><DeleteReviewsPage /></AdminRoute>} />
        <Route path="/weather" element={<WeatherPage />} />
        <Route
  path="/analytics"
  element={
    <AdminRoute>
      <AnalyticsPage />
    </AdminRoute>
  }
/>
        
      </Routes>

      <div className="ticks"></div>
    </>
  );
}

export default App;