import React, { useEffect, useState } from "react";
import ProductCard from "../ProductCard";

const MenProductsGrid = ({ onAddToCart }) => {
  const [menProducts, setMenProducts] = useState([]);

  useEffect(() => {
    const fetchMenProducts = async () => {
      try {
        const res = await fetch(
          "https://fakestoreapi.com/products/category/men%27s%20clothing"
        );
        const data = await res.json();

        // Convert FakeStoreAPI data → your ProductCard format
        const formatted = data.map((item) => ({
          id: item.id,
          name: item.title,
          image: item.image,
          price: item.price * 100, // because ProductCard divides by 100
          rating: item.rating.rate,
        }));

        // ❗ SKIP FIRST ITEM (the laptop)
        const withoutFirst = formatted.slice(1);

        // Show all remaining items
        setMenProducts(withoutFirst);

      } catch (error) {
        console.log("Error fetching men products:", error);
      }
    };

    fetchMenProducts();
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
  Men's Section
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
        {menProducts.map((product) => (
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

export default MenProductsGrid;
