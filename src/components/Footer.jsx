import React from "react";
import "../App.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">

        {/* BRAND + ADDRESS */}
        <div className="footer-section brand">
          <h3 className="footer-logo">Ecommerce App</h3>
          <p style={{ maxWidth: "220px", lineHeight: "1.5" }}>
            Your trusted store for clothing & lifestyle products.
          </p>
          
          <br></br>
          <div className="footer-address">
            <p><strong>Address:</strong></p>
            <p>123 Fashion Street</p>
            <p>New Delhi, India</p>
            <p>support@example.com</p>
          </div>
        </div>

        {/* QUICK LINKS */}
        <nav className="footer-section links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/men">Men</a></li>
            <li><a href="/women">Women</a></li>
            <li><a href="/cart">Cart</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </nav>

        {/* CUSTOMER SUPPORT */}
        <div className="footer-section support">
          <h4>Customer Support</h4>
          <ul>
            <li><a href="/faq">FAQ</a></li>
            <li><a href="/returns">Returns & Refunds</a></li>
            <li><a href="/shipping">Shipping Info</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* SOCIAL LINKS + NEWSLETTER */}
        <div className="footer-section social">
          <h4>Stay Connected</h4>

          <ul className="social-links">
            <li><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a></li>
            <li><a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a></li>
            <li><a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a></li>
          </ul>

          {/* NEWSLETTER */}
          <div className="footer-newsletter">
            <h4>Join Our Newsletter</h4>
            <p style={{ fontSize: "0.9rem", color: "#ccc" }}>
              Get updates on new arrivals & exclusive discounts.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Subscribed! (Demo)");
              }}
              className="newsletter-form"
            >
              <input
                type="email"
                placeholder="Enter your email"
                required
              />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>

      </div>

      {/* COPYRIGHT BAR */}
      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} Ecommerce App — All rights reserved.
        </p>

        <div className="payment-icons">
          <span>Visa</span>
          <span>MasterCard</span>
          <span>UPI</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
