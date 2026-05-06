import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/products" />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailsPage />} />
      </Routes>

      <div className="ticks"></div>
    </>
  );
}

export default App;