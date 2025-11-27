import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login, signInWithGoogle } = useAuth();
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await login(email, password);

      // ✅ Clear fields after successful login
      setEmail('');
      setPassword('');

      navigate('/');
    } catch (err) {
      console.log(err);
      setError('⚠ Invalid login details');
    }
  };

  const handleGoogle = async () => {
    setError(null);
    try {
      await signInWithGoogle();

      // ✅ Clear fields after Google login too
      setEmail('');
      setPassword('');

      navigate('/');
    } catch (err) {
      console.log(err);
      setError('⚠ Google Sign-in failed');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome Back 👋</h2>
        <p style={styles.subtext}>Login to continue shopping</p>

        {error && <p style={styles.error}>{error}</p>}

        <form onSubmit={handleSubmit} style={styles.form} autoComplete="off">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            style={styles.input}
            autoComplete="off"       // 🔴 stops browser autofill
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            style={styles.input}
            autoComplete="new-password"  // 🔴 helps prevent saved password fill
          />

          <button type="submit" style={styles.loginBtn}>
            Login
          </button>
        </form>

        <button onClick={handleGoogle} style={styles.googleBtn}>
          <img
            src="https://neilpatel.com/wp-content/uploads/2019/08/google.jpg"
            alt="Google"
            style={{ width: '40px', marginRight: '8px' }}
          />
          Continue with Google
        </button>

        <p style={styles.bottomText}>
          Don't have an account?{' '}
          <Link to="/signup" style={styles.link}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(120deg,#fde2e4,#fad2e1)',
  },
  card: {
    width: '350px',
    background: '#fff',
    padding: '32px',
    borderRadius: '18px',
    boxShadow: '0px 8px 25px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  title: {
    fontSize: '1.9rem',
    marginBottom: '6px',
    fontWeight: '700',
    color: '#e81f91',
  },
  subtext: {
    marginBottom: '18px',
    color: '#666',
    fontSize: '0.95rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  input: {
    padding: '12px',
    fontSize: '1rem',
    borderRadius: '10px',
    border: '1px solid #ddd',
    outline: 'none',
    transition: '0.2s',
  },
  loginBtn: {
    marginTop: '10px',
    padding: '12px',
    borderRadius: '10px',
    background: 'linear-gradient(45deg,#e81f91,#ff6b9f)',
    border: 'none',
    color: '#fff',
    fontSize: '1.1rem',
    cursor: 'pointer',
  },
  googleBtn: {
    marginTop: '14px',
    padding: '12px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#fff',
    border: '1px solid #ddd',
    cursor: 'pointer',
    borderRadius: '10px',
  },
  bottomText: {
    marginTop: '18px',
    fontSize: '0.9rem',
    color: '#444',
  },
  link: {
    color: '#e81f91',
    fontWeight: 'bold',
    textDecoration: 'none',
  },
  error: {
    background: '#ffe5e5',
    color: 'red',
    padding: '8px',
    fontSize: '0.85rem',
    borderRadius: '6px',
    marginBottom: '12px',
  },
};

export default Login;
