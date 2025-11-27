import HeroSlider  from './components/HeroSlider';
import ListProductsCategory from './components/ListProductsCategory';
import ProductList from './components/ProductList';
import { useOutletContext } from 'react-router-dom';

const Home = () => {
  const outlet = useOutletContext() || {};
  const onAddToCart = outlet.onAddToCart;

  return (
    <>
      <HeroSlider  />
      <ListProductsCategory />

      {/* 🔥 Disable product detail links ONLY on Home products */}
      <ProductList onAddToCart={onAddToCart}  />
    </>
  );
};

export default Home;
