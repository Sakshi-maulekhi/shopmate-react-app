import { useOutletContext } from "react-router-dom";
import MenProductsGrid from "./men/MenProductsGrid";

const MenPage = () => {
  const { onAddToCart } = useOutletContext();

  return (
    <>
      <MenProductsGrid onAddToCart={onAddToCart} />
    </>
  );
};

export default MenPage;
