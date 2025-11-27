
import { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import productsData from './data/products.js';
import { useAuth } from './AuthContext';
import { setCartToFirestore, mergeGuestWithFirestoreCart, flushPendingMerges } from './firestore';

function App() {
  // App now acts as the shared layout: it owns cart/search state and renders Header + Outlet + Footer
  const [cart, setCart] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [products, setProducts] = useState([]);
  const { user } = useAuth();
  const location = useLocation();

  const guestKey = 'cart:guest';

  const cartKeyFor = (u) => (u && u.uid ? `cart:${u.uid}` : guestKey);

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem(cartKeyFor(user)); // remove from correct storage key
  };
  useEffect(() => {
  const formatted = productsData.map(p => ({
    ...p,
    name: p.name ?? p.title ?? "Unknown Product",
    rating: typeof p.rating === "object" ? p.rating?.rate : p.rating ?? 0,
    price: (p.price ?? 0) * 100
  }));

  setProducts(formatted);
}, []);


  useEffect(() => {
    const key = cartKeyFor(user);
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCart(parsed);
      } catch (e) {
        // ignore
      }
    }

    (async () => {
      if (user) {
        const guest = localStorage.getItem(guestKey);
        let guestCart = [];
        if (guest) {
          try {
            guestCart = JSON.parse(guest);
          } catch (e) {
            guestCart = [];
          }
        }

        const localCart = (() => {
          try {
            const v = localStorage.getItem(cartKeyFor(user));
            return v ? JSON.parse(v) : [];
          } catch (e) {
            return [];
          }
        })();
        


        try {
          const preMerge = [...(localCart || []), ...(guestCart || [])];
          console.debug('Attempting merge for user', user.uid, { localCart, guestCart, preMerge });
          const merged = await mergeGuestWithFirestoreCart(user.uid, preMerge);
          console.debug('Merge result', merged);
          setCart(merged || []);
          localStorage.setItem(cartKeyFor(user), JSON.stringify(merged || []));
          localStorage.removeItem(guestKey);
        } catch (e) {
          console.error('Error merging carts with Firestore', e);
        }
      } else {
        const guest = localStorage.getItem(guestKey);
        if (guest) {
          try {
            setCart(JSON.parse(guest));
          } catch (e) {
            setCart([]);
          }
        } else {
          setCart([]);
        }
      }
    })();
  }, [user]);

  useEffect(() => {
    flushPendingMerges();
    const onOnline = () => flushPendingMerges();
    window.addEventListener('online', onOnline);
    return () => window.removeEventListener('online', onOnline);
  }, []);

  useEffect(() => {
    const key = cartKeyFor(user);
    try {
      localStorage.setItem(key, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart', e);
    }
    (async () => {
      if (user && user.uid) {
        try {
          await setCartToFirestore(user.uid, cart);
        } catch (e) {
          console.error('Failed to save cart to Firestore', e);
        }
      }
    })();
  }, [cart, user]);

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  return (
    <>
      {/* Hide header on login and signup pages */}
      {location.pathname !== '/login' && location.pathname !== '/signup' && (
        <Header
          cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
          cart={cart}
          setCart={setCart}
          products={products}
          searchText={searchText}
          setSearchText={setSearchText}
          onSearchResultClick={id => {
            const el = document.getElementById(`product-${id}`);
            if (el) {
              el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            setSearchText('');
          }}
          onRemoveFromCart={id => {
            setCart(prevCart => {
              return prevCart
                .map(item =>
                  item.id === id
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
                )
                .filter(item => item.quantity > 0);
            });
          }}
        />
      )}

      {/* Outlet provides page content; pass shared handlers via context */}
      <Outlet context={{ onAddToCart: handleAddToCart,clearCart, products, searchText, setSearchText, cart, setCart }} />

      {/* Show ContactUs + Footer only on the home page */}
      {location.pathname === '/' && <Footer />}
    </>
  );
}

export default App;