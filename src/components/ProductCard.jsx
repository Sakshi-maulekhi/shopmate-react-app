import { Link } from "react-router-dom";

const ProductCard = ({ product, onAddToCart }) => {
  const title = product.title || product.name;

  return (
    <Link
      to={`/product/${product.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div className="product-card" style={{ cursor: "pointer" }}>

        <div className="image-container">
          <img src={product.image} alt={title} />
        </div>

        <h3>{title}</h3>

        <p className="rating">⭐ {product.rating}</p>
        <span className="price">₹{Math.round(product.price / 100)}</span>

        {/* Prevent navigation when clicking button */}
        <button
          className="add-to-cart-btn"
          onClick={(e) => {
            e.preventDefault(); // stops redirect
            onAddToCart(product);
          }}
        >
          <img
            src="https://media.istockphoto.com/id/1994666187/vector/add-to-cart.jpg?s=612x612&w=0&k=20&c=3dKQh6logiBchMqmGQUnBgeI6D2cMkE-ikGi7Li-t1o="
            alt="Add to Cart"
            style={{ width: "18px", height: "18px" }}
          />
          Add to Cart
        </button>

      </div>
    </Link>
  );
};

export default ProductCard;
