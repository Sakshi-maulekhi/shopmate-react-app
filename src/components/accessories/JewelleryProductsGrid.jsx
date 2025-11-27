import React, { useEffect, useState } from "react";
import ProductCard from "../ProductCard";

const JewelleryProductsGrid = ({ onAddToCart }) => {
  const [jewelleryProducts, setJewelleryProducts] = useState([]);

  useEffect(() => {
    const fetchJewelleryProducts = async () => {
      try {
        const res = await fetch(
          "https://fakestoreapi.com/products/category/jewelery"
        );
        const data = await res.json();

        // Convert FakeStoreAPI → your ProductCard format
        const formatted = data.map((item) => ({
          id: item.id,
          name: item.title,
          image: item.image,
          price: item.price * 100, // because your card divides by 100
          rating: item.rating.rate,
        }));

        // If you want to skip first weird item → uncomment:
        // const withoutFirst = formatted.slice(1);

        setJewelleryProducts(formatted);
      } catch (error) {
        console.log("Error fetching jewellery products:", error);
      }
    };

    fetchJewelleryProducts();
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
  Accessories
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
        {jewelleryProducts.map((product) => (
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

export default JewelleryProductsGrid;
