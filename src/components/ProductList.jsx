import ProductCard from './ProductCard';
import { useEffect, useState } from 'react';

const ProductList = ({ onAddToCart, disableDetails }) => {
  const [productList, setProductList] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [searchText, setSearchText] = useState('');

  const fetchData = async () => {
    const response = await fetch('https://fakestoreapi.com/products');
    const products = await response.json();

    // 🛠 Convert API data → ProductCard compatible format
    const formattedProducts = products.map(p => ({
      ...p,
      name: p.title,            // because your ProductCard expects "name"
      rating: p.rating.rate,    // FIX: convert rating object → number
      price: p.price * 100      // matches your existing price formatting
    }));

    setProductList(formattedProducts);
    setAllProducts(formattedProducts);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFilterButtonClick = () => {
    const filtered = allProducts.filter(product => product.rating > 4);
    setProductList(filtered);
  };

  const handleSearchButton = () => {
    const filtered = allProducts.filter(product =>
      (product.name ?? '').toLowerCase().includes(searchText.toLowerCase())
    );
    setProductList(filtered);
  };

  return (
    <section className='products'>
      <h1>Trending Products</h1>

      <div className='search-filter' style={{ marginBottom: '20px' }}>
        <input
  type="search"
  placeholder="Search for products..."
  value={searchText}
  onChange={(e) => setSearchText(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      handleSearchButton(); // 👈 call search function automatically
    }
  }}
  style={{
    padding: "10px",
    fontSize: "16px",
    marginRight: "10px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    outline: "none"
  }}
/>

        <button onClick={handleSearchButton} className='filter-button'>
          Search
        </button>
        <button onClick={handleFilterButtonClick} className='filter-button'>
          Filter Top Rated Products
        </button>
      </div>

      <div className='products-grid'>
        {productList.map(product => (
          <div id={`product-${product.id}`} key={product.id}>
            <ProductCard
              product={product}
              onAddToCart={onAddToCart}
              disableDetails={disableDetails}  // stays same
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductList;
