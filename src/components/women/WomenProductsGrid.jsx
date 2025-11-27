import React, { useEffect, useState } from "react";
import ProductCard from "../ProductCard";

const WomenProductsGrid = ({ onAddToCart }) => {
  const [womenProducts, setWomenProducts] = useState([]);

  useEffect(() => {
    const fetchWomenProducts = async () => {
      try {
        const res = await fetch(
          "https://fakestoreapi.com/products/category/women%27s%20clothing"
        );
        const data = await res.json();

        // Convert FakeStoreAPI → your ProductCard format
        const formatted = data.map((item) => ({
          id: item.id,
          name: item.title,
          image: item.image,
          price: item.price * 100, // because ProductCard divides by 100
          rating: item.rating.rate,
        }));

        // ❗ Skip first item (API sometimes returns wrong item first)
        const withoutFirst = formatted.slice(1);

        setWomenProducts(withoutFirst);
      } catch (error) {
        console.log("Error fetching women products:", error);
      }
    };

    fetchWomenProducts();
  }, []);

  return (
    <section style={{ padding: "40px 20px" }}>
      <h2
  style={{
    textAlign: "center",
    marginBottom: "30px",
    fontSize: "2.6rem",
    fontWeight: "900",
    background: "linear-gradient(45deg, #0a66c2, #22c55e)",
    WebkitBackgroundClip: "text",
    color: "transparent",
  }}
>
  Women's Section
</h2>


      {/* GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "20px",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        {womenProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </section>
  );
};

export default WomenProductsGrid;
