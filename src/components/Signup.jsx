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
      console.error('Signup failed', err);
      setError(err.message || 'Signup failed');
    }
  };

  return (
    <div style={{display:'flex',justifyContent:'center',alignItems:'center',minHeight:'70vh'}}>
      <form onSubmit={handleSubmit} style={{width:'360px',padding:'24px',border:'1px solid #eee',borderRadius:'8px',boxShadow:'0 2px 8px rgba(0,0,0,0.08)'}}>
        <h2 style={{textAlign:'center',marginBottom:'16px'}}>Sign Up</h2>

        <label style={{display:'block',marginBottom:'8px'}}>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          style={{width:'100%',padding:'10px',marginBottom:'12px',borderRadius:'6px',border:'1px solid #ddd'}}
        />

        <label style={{display:'block',marginBottom:'8px'}}>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Create a password"
          required
          style={{width:'100%',padding:'10px',marginBottom:'16px',borderRadius:'6px',border:'1px solid #ddd'}}
        />

        <button type="submit" style={{width:'100%',padding:'10px',background:'#28a745',color:'#fff',border:'none',borderRadius:'6px',cursor:'pointer',marginBottom:'12px'}}>Create account</button>

        {error && <div style={{color:'red',marginTop:'8px'}}>{error}</div>}

        <div style={{textAlign:'center'}}>
          <span>Already have an account? </span>
          <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
}

export default Signup;
