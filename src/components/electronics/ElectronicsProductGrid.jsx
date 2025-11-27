import React, { useEffect, useState } from "react";
import ProductCard from "../ProductCard";

const ElectronicsProductsGrid = ({ onAddToCart }) => {
  const [electronicsProducts, setElectronicsProducts] = useState([]);

  useEffect(() => {
    const fetchElectronics = async () => {
      try {
        const res = await fetch(
          "https://fakestoreapi.com/products/category/electronics"
        );
        const data = await res.json();

        // Format data to match ProductCard format
        const formatted = data.map((item) => ({
          id: item.id,
          name: item.title,
          image: item.image,
          price: item.price * 100, // Your cart system divides by 100
          rating: item.rating?.rate || 4.0,
        }));

        setElectronicsProducts(formatted);
      } catch (error) {
        console.error("Error fetching electronics:", error);
      }
    };

    fetchElectronics();
  }, []);

  return (
    <section style={{ padding: "40px 20px" }}>
      <h2
        style={{
          textAlign: "center",
          marginBottom: "30px",
          fontSize: "2.6rem",
          fontWeight: "900",
          background: "linear-gradient(45deg, #0a66c2, #fdba74)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        Electronics
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "20px",
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        {electronicsProducts.map((product) => (
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

export default ElectronicsProductsGrid;
