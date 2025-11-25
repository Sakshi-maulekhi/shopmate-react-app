import HeroSection from './components/HeroSection';
import ListProductsCategory from './components/ListProductsCategory';
import ProductList from './components/ProductList';
import { useOutletContext } from 'react-router-dom';

const Home = () => {
  const outlet = useOutletContext() || {};
  const onAddToCart = outlet.onAddToCart;

  return (
    <>
      <HeroSection />
      <ListProductsCategory />
      <ProductList onAddToCart={onAddToCart} />
    </>
  );
};

export default Home;
