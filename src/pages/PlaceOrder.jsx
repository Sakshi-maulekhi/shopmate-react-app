import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";

function PlaceOrder() {
  const location = useLocation();
  const navigate = useNavigate();
  const item = location.state?.item;

  const [quantity, setQuantity] = useState(item?.quantity || 1);
  const price = (item?.price / 100) * quantity;

  // Get cart & update function from parent (App.jsx)
  const { setCart } = useOutletContext();

  useEffect(() => {
    if (!item) navigate("/");
  }, [item, navigate]);

 const handleConfirmOrder = () => {
  // Remove purchased item from cart
  setCart(prev => prev.filter(cartItem => cartItem.id !== item.id));

  // ❗ FIX: Allow scrolling again
  document.body.classList.remove("no-scroll");

  alert("🎉 Order placed successfully!");
  navigate("/");
};


  if (!item) return null;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Place Your Order</h2>

      <div style={styles.card}>
        <img src={item.image} alt={item.name} style={styles.image} />

        <div>
          <h3 style={styles.name}>{item.name}</h3>
          <p style={styles.price}>Price: ₹{item.price / 100}</p>
          <p style={styles.subtext}>Category: {item.category || "Product"}</p>

          <div style={styles.quantityBox}>
            <button
              style={styles.qtyBtn}
              onClick={() => setQuantity(prev => (prev > 1 ? prev - 1 : 1))}
            >
              -
            </button>
            <span style={{ fontSize: "1.2rem", margin: "0 10px" }}>{quantity}</span>
            <button
              style={styles.qtyBtn}
              onClick={() => setQuantity(prev => prev + 1)}
            >
              +
            </button>
          </div>

          <h3 style={{ marginTop: "12px" }}>Total: ₹{price}</h3>

          <button style={styles.orderBtn} onClick={handleConfirmOrder}>
            Confirm Order
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "850px",
    margin: "40px auto",
    padding: "20px",
    borderRadius: "12px",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
  },
  card: {
    display: "flex",
    gap: "20px",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "12px",
    background: "#f7e4e4ff",
  },
  image: {
    width: "180px",
    height: "180px",
    objectFit: "cover",
    borderRadius: "12px",
  },
  name: {
    margin: "0 0 8px",
  },
  price: {
    fontSize: "1.1rem",
    fontWeight: "bold",
  },
  subtext: {
    color: "#777",
  },
  quantityBox: {
    marginTop: "12px",
    display: "flex",
    alignItems: "center",
  },
  qtyBtn: {
    width: "32px",
    height: "32px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    background: "#f31295",
    color: "#fff",
    fontSize: "1.2rem",
  },
  orderBtn: {
    marginTop: "20px",
    padding: "10px 18px",
    borderRadius: "6px",
    background: "#10b981",
    border: "none",
    cursor: "pointer",
    color: "#fff",
    fontSize: "1rem",
  },
};

export default PlaceOrder;
