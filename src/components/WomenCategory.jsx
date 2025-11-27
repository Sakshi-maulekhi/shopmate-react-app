import { useOutletContext } from "react-router-dom";
import WomenProductsGrid from "./women/WomenProductsGrid";

const WomenPage = () => {
  const { onAddToCart } = useOutletContext();

  return (
    <>
      <WomenProductsGrid onAddToCart={onAddToCart} />
    </>
  );
};

export default WomenPage;
