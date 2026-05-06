import ProductCard from "./ProductCard.jsx";

function ProductList({ products }) {
  return (
    <>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </>
  );
}

export default ProductList;