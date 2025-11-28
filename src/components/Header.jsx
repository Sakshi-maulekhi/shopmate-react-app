
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import Toast from './Toast';
import { useNavigate } from 'react-router-dom';




function Header({ cartCount, cart, products, searchText, setSearchText, onSearchResultClick, onRemoveFromCart, onShowToast }) {
  const [showCart, setShowCart] = useState(false);
  const { user, logout } = useAuth();
    const [toastMsg, setToastMsg] = useState(null);
    const navigate = useNavigate();

  
  console.log('Hello, I am inside Header component');


  useEffect(() => {
    console.log('Hello, I am inside useEffect() with dependency');
  }, []);

  return (
    <header>
      <div className='logo'>Shopmate</div>

      <div>
        <nav>
          <ul className='menu'>
            <li className='menu-item'>
              <a href='/'>Home</a>
            </li>
            <li className='menu-item'>
              <a href='/men'>Men</a>
            </li>
            <li className='menu-item'>
              <a href='/women'>Women</a>
            </li>
            <li className='menu-item'>
              <a href='/Electronics'>Electronics</a>
            </li>
            <li className='menu-item'>
              <a href='/accessories'>Accessories</a>
            </li>
            <li className='menu-item'>
              <Link to='/contact'>Contact</Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className='header-right' style={{position:'relative'}}>
        <input
          type='search'
          placeholder='Search for products...'
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              const match = products.find(p => p.name.toLowerCase().includes(searchText.toLowerCase()));
              if (match) {
                onSearchResultClick(match.id);
              }
            }
          }}
          style={{ padding: '10px', fontSize: '16px', marginRight: '10px', borderRadius: '10px', border: '1px solid #ddd', outline: 'none' }}
        />

        {searchText && (
          <div className='search-results-window' style={{
            position: 'absolute',
            top: '45px',
            left: 0,
            background: '#fff',
            color: '#222',
            border: '1px solid #ddd',
            borderRadius: '10px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
            zIndex: 1000,
            minWidth: '260px',
            padding: '12px',
            maxHeight: '260px',
            overflowY: 'auto'
          }}>
            <h4 style={{marginTop:0,marginBottom:'10px'}}>Search Results</h4>
            {products.filter(p => p.name.toLowerCase().includes(searchText.toLowerCase())).length === 0 ? (
              <p>No products found.</p>
            ) : (
              <ul style={{listStyle:'none',padding:0,margin:0}}>
                {products.filter(p => p.name.toLowerCase().includes(searchText.toLowerCase())).map(product => (
                  <li key={product.id}
                      style={{display:'flex',alignItems:'center',marginBottom:'10px',borderBottom:'1px solid #eee',paddingBottom:'8px',cursor:'pointer'}}
                      onClick={() => {
                        onSearchResultClick(product.id);
                        setSearchText('');
                      }}
                  >
                    <img src={product.image} alt={product.name} style={{width:'40px',height:'40px',borderRadius:'8px',marginRight:'10px',objectFit:'cover'}} />
                    <div>
                      <span style={{fontWeight:'normal'}}>{product.name}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {!user ? (
          <Link to="/login" state={{ resetForm: true }}>

            <button className='login-btn'>
              Login
            </button>
          </Link>
        ) : (
          <div style={{display:"flex", flexDirection:"column", alignItems:"center", gap:"4px"}}>
  {user && user.email && (
    <span style={{fontSize:'0.9rem',color:'white', maxWidth:"120px", textAlign:"center", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap"}}>
      {user.email}
    </span>
  )}

  <button
    onClick={async () => {
      try {
        await logout();
        setToastMsg('Logged out successfully!!');
        document.body.classList.remove("no-scroll");
      } catch (err) {
        setToastMsg('Logout failed');
      }
    }}
    className='login-btn'
  >
    Logout
  </button>
</div>

        )}

        <button 
          className='cart-btn' 
          style={{ position: 'relative', marginLeft: '16px', background: 'transparent', border: '1px solid pink',borderRadius:'15px', cursor: 'pointer', padding: '2px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={() => {
  setShowCart(prev => {
    const newState = !prev;
    if (newState) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
    return newState;
  });
}}

        >
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWcUpKJi6hD6A9UKoxMKJfNuDPx5Iv5yi-ug&s" alt="Cart" style={{width:'35px',height:'35px',borderRadius:'50%',verticalAlign:'middle',background:'#fff',padding:'2px',objectFit:'cover'}} />
          {cartCount > 0 && (
            <span style={{
              position: 'absolute',
              top: '-8px',
              right: '-8px',
              background: '#222',
              color: '#fff',
              borderRadius: '50%',
              padding: '2px 7px',
              fontSize: '0.9rem',
              fontWeight: 'bold'
            }}>{cartCount}</span>
          )}
        </button>

        {showCart && (
          <div className="cart-modal" style={{
            position: 'absolute',
            top: '60px',
            right: '30px',
            background: '#fff',
            color: '#222',
            border: '1px solid #ddd',
            borderRadius: '10px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
            zIndex: 1000,
            minWidth: '260px',
            padding: '18px'
          }}>
            <h4 style={{marginTop:0}}>Cart</h4>
            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <ul style={{listStyle:'none',padding:0}}>
                {cart.map(item => (
  <li 
    key={item.id} 
    style={{
      marginBottom: '12px',
      borderBottom: '1px solid #eee',
      paddingBottom: '8px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}
  >
    <div>
      <span style={{ fontWeight: 'bold' }}>{item.name}</span> <br />
      <span>Qty: {item.quantity}</span> <br />
      <span>Price: ₹{item.price / 100}</span>
    </div>

    <div style={{ display: 'flex', gap: '6px', marginLeft: '10px' }}>
      
      {/* BUY BUTTON */}
      <button
  onClick={() => {
    if (!user) {
      setToastMsg("⚠️ Please login first to continue.");
      setShowCart(false);

      // Redirect after 1.5 seconds (optional)
      setTimeout(() => {
        navigate("/login");
      }, 1500);

      return;
    }

    // If logged in, go to order page
    navigate('/place-order', { state: { item } });
    setShowCart(false);
  }}
  style={{
    background: '#5661f8ff',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    padding: '4px 10px',
    cursor: 'pointer',
    fontSize: '0.85rem'
  }}
>
  Buy
</button>


      {/* REMOVE BUTTON */}
      <button
        onClick={() => onRemoveFromCart(item.id)}
        style={{
          background: '#ee3098ff',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          padding: '4px 10px',
          cursor: 'pointer',
          fontSize: '0.85rem'
        }}
      >
        Remove
      </button>
    </div>
  </li>
))}

              </ul>
            )}
            <button
  onClick={() => {
    setShowCart(false);
    document.body.classList.remove("no-scroll");
  }}
  style={{
    marginTop:'10px',
    background:'#f31295ff',
    color:'#fff',
    border:'none',
    borderRadius:'6px',
    padding:'6px 16px',
    cursor:'pointer'
  }}
>
  Close
</button>

          </div>
        )}

        {toastMsg && (
          <Toast
            message={toastMsg}
            onClose={() => setToastMsg(null)}
            style={{
              position: 'absolute',
              top: '64px',
              left: '50%',
              transform: 'translateX(-50%)',
              right: 'auto',
              background: '#222',
              color: '#fff',
              zIndex: 1500,
            }}
          />
        )}

      </div>
    </header>
  );
}

export default Header;