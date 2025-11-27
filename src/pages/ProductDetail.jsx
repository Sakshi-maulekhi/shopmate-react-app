import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { onAddToCart } = useOutletContext();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading) return <h2 style={{ textAlign: "center", marginTop: "50px" }}>Loading...</h2>;

  const formattedProduct = {
    id: product.id,
    name: product.title,
    image: product.image,
    price: product.price * 100,
    rating: product.rating.rate,
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <img src={product.image} alt={product.title} style={styles.image} />

        <div style={styles.details}>
          <h1 style={styles.title}>{product.title}</h1>

          <p style={styles.price}>₹{Math.round(product.price * 80)}</p>

          <p style={styles.rating}>⭐ {product.rating.rate} ({product.rating.count})</p>

          <p style={styles.description}>{product.description}</p>

          <button
            onClick={() => onAddToCart(formattedProduct)}
            style={styles.button}
          >
            🛒 Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---- Compact Style ---- */

const styles = {
  container: {
    maxWidth: "800px",
    margin: "40px auto",
    padding: "10px",
  },
  card: {
    display: "flex",
    gap: "20px",
    background: "#fff",
    padding: "20px",
    borderRadius: "14px",
    boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
  },
  image: {
    width: "260px",
    height: "260px",
    objectFit: "contain",
    borderRadius: "12px",
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: "1.4rem",
    marginBottom: "8px",
    fontWeight: "600",
  },
  price: {
    fontSize: "1.5rem",
    fontWeight: "700",
    color: "#e81f91",
    marginBottom: "5px",
  },
  rating: {
    background: "#fff3d6",
    fontSize: "0.9rem",
    padding: "4px 10px",
    display: "inline-block",
    borderRadius: "8px",
    marginBottom: "12px",
  },
  description: {
    fontSize: "0.95rem",
    lineHeight: "1.4",
    color: "#444",
    marginBottom: "18px",
  },
  button: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "#10b981",
    color: "white",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "0.3s",
  },
};
