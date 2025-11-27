import { useOutletContext } from "react-router-dom";

import ElectronicsProductsGrid from "./electronics/ElectronicsProductGrid";

const Electronics = () => {
  const { onAddToCart } = useOutletContext();

  return (
    <>
      <ElectronicsProductsGrid onAddToCart={onAddToCart} />
    </>
  );
};

export default Electronics;
