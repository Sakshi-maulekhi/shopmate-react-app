import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await signup(email, password);
      navigate('/');
    } catch (err) {
      setError('⚠ Unable to create account. Try again.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        
        <h2 style={styles.title}>Create Your Account ✨</h2>
        <p style={styles.subtitle}>Join us & start shopping</p>

        {error && <p style={styles.error}>{error}</p>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />

          <input
            type="password"
            placeholder="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />

          <button type="submit" style={styles.signupBtn}>
            Create Account
          </button>
        </form>

        <p style={styles.bottomText}>
          Already have an account?{" "}
          <Link to="/login" style={styles.link}>
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

/* --------- Matching Login Styling -------- */

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(120deg,#fde2e4,#fad2e1)",
  },
  card: {
    width: "350px",
    background: "#fff",
    padding: "32px",
    borderRadius: "18px",
    boxShadow: "0px 8px 25px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  title: {
    fontSize: "1.9rem",
    fontWeight: "700",
    color: "#d80dacff",
    marginBottom: "6px",
  },
  subtitle: {
    marginBottom: "22px",
    color: "#666",
    fontSize: "0.95rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  input: {
    padding: "12px",
    fontSize: "1rem",
    borderRadius: "10px",
    border: "1px solid #ddd",
    outline: "none",
    transition: "0.2s",
  },
  signupBtn: {
    marginTop: "10px",
    padding: "12px",
    borderRadius: "10px",
    background: "linear-gradient(45deg,#e81f91,#ff6b9f)",
    border: "none",
    color: "#fff",
    fontSize: "1.1rem",
    cursor: "pointer",
  },
  bottomText: {
    marginTop: "18px",
    fontSize: "0.9rem",
    color: "#444",
  },
  link: {
    color: "#e81fcdff",
    fontWeight: "bold",
    textDecoration: "none",
  },
  error: {
    background: "#ffe5e5",
    color: "red",
    padding: "8px",
    fontSize: "0.85rem",
    borderRadius: "6px",
    marginBottom: "12px",
  },
};

export default Signup;
