import { useEffect, useState } from "react";
import { getProducts } from "../api/productsApi";
import SearchInput from "../components/SearchInput.jsx";
import ProductList from "../components/ProductList.jsx";
import StatusMessage from "../components/StatusMessage.jsx";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(search.toLowerCase()));

  function loadProducts() {
    setIsLoading(true);
    setError("");

    getProducts()
      .then((products) => {
        setProducts(products);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <section id="center">
      <div className="hero">
        <h1>Мой магазин</h1>

        <button onClick={loadProducts}>Загрузить товары</button>
        <SearchInput value = {search} onChange = {setSearch} />

        {isLoading && <StatusMessage>Загрузка...</StatusMessage>}

        {error && <StatusMessage>Ошибка: {error}</StatusMessage>}

        {!isLoading && !error && filteredProducts.length === 0 && (
          <StatusMessage>Товары не найдены</StatusMessage>
        )}
        {!isLoading && !error && <ProductList products={filteredProducts} />}
      </div>
    </section>
  );
}

export default ProductsPage;