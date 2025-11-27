import React from 'react';

const ContactUs = () => {
  return (
    <section
      className="contact-us"
      style={{
        padding: "50px 20px",
        background: "#f4f5f7",
        color: "#222",
      }}
    >
      <div
        style={{
          maxWidth: 900,
          margin: "0 auto",
          background: "#fff",
          padding: "40px 35px",
          borderRadius: 16,
          boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
        }}
      >
        {/* Heading */}
        <h2 style={{ marginTop: 0, fontSize: "2rem", fontWeight: 700 }}>
          Contact Us
        </h2>
        <p style={{ color: "#666", marginTop: 6, lineHeight: 1.6 }}>
          Have questions about your order, products or returns?  
          Send us a message — we usually reply within 1–2 business days.
        </p>

        {/* FORM */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Thanks — your message was received (demo).");
          }}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 20,
            marginTop: 30,
          }}
        >
          <input
            name="name"
            placeholder="Your name"
            required
            style={inputStyle}
          />
          <input
            name="email"
            type="email"
            placeholder="Email address"
            required
            style={inputStyle}
          />

          <input
            name="subject"
            placeholder="Subject"
            style={{
              ...inputStyle,
              gridColumn: "1 / -1",
            }}
          />

          <textarea
            name="message"
            placeholder="Your message"
            required
            style={{
              ...inputStyle,
              gridColumn: "1 / -1",
              minHeight: 140,
              resize: "vertical",
            }}
          />

          <div
            style={{
              gridColumn: "1 / -1",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <button
              type="submit"
              style={{
                background: "linear-gradient(135deg, #ff4da6, #ff6ec7)",
                color: "#fff",
                border: "none",
                padding: "12px 28px",
                fontSize: "1rem",
                borderRadius: 8,
                cursor: "pointer",
                boxShadow: "0 4px 14px rgba(255, 77, 166, 0.4)",
                transition: "0.25s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "translateY(-2px)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              Send Message
            </button>
          </div>
        </form>

        {/* CONTACT DETAILS */}
        <div style={{ marginTop: 30, color: "#444", fontSize: "0.95rem" }}>
          <p>
            <strong>📧 Email:</strong> support@example.com
          </p>
          <p>
            <strong>📞 Phone:</strong> +1 (555) 123-4567
          </p>
        </div>
      </div>
    </section>
  );
};

// Shared input styling
const inputStyle = {
  padding: "12px 14px",
  borderRadius: 8,
  border: "1px solid #ddd",
  fontSize: "0.95rem",
  outline: "none",
  transition: "0.2s",
};

export default ContactUs;
