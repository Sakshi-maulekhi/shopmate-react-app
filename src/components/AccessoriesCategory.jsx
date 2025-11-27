import { useOutletContext } from "react-router-dom";
import JewelleryProductsGrid from "./accessories/JewelleryProductsGrid";

const JewelleryPage = () => {
  const { onAddToCart } = useOutletContext();

  return <JewelleryProductsGrid onAddToCart={onAddToCart} />;
};

export default JewelleryPage;
