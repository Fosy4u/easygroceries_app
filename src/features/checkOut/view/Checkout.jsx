import React, { useState } from "react";
import { useSelector } from "react-redux";
import { globalSelectors } from "../../../global/global.slice";
import organisationsApi from "../../../services/organisationsApi.slice";
import Banner from "../../../utils/components/Banner";
import Loader from "../../../utils/components/Loader";
import { Small } from "../../../utils/components/Typography";
import CheckoutFooter from "../components/CheckoutFooter";
import CheckOutProductCard from "../components/CheckOutProductCard";

const Checkout = () => {
  const getProductsQuery = organisationsApi.useGetProductsQuery();
  const cart = useSelector(globalSelectors.selectCart);
  const products = getProductsQuery?.data;
  const [showBanner, setShowBanner] = useState(true);

// calc remaining stock. Backend does this too, but we need it here to show the user
  const calcRemainingStock = (productId) => {
    const product = products?.find((product) => product.id === productId);
    const cartItem = cart?.filter((item) => item.productId === productId);
    const totalQuantity = cartItem?.reduce(
      (acc, item) => acc + Number(item.quantity),
      0
    );
    return product?.stockQuantity - totalQuantity;
  };

  return (
    <>
      <Loader showLoading={getProductsQuery?.isLoading} />
      <div className="d-flex flex-wrap justify-content-center  align-items-center m-2">
        {cart?.length > 0 &&
          products?.length > 0 &&
          cart.map((item, index) => (
            <div key={index} className="m-2">
              <CheckOutProductCard
                item={item}
                product={products?.find(
                  (product) => product.id === item.productId
                )}
                remainingStock={calcRemainingStock(item.productId)}
              />
            </div>
          ))}
        {cart?.length > 0 && products?.length > 0 && <CheckoutFooter />}
      </div>
      {!getProductsQuery.isLoading && cart?.length === 0 && (
        <div className="w-100 d-flex text-center justify-content-center mt-4 ">
          <Banner
            show={showBanner}
            variant="warning"
            handleClose={() => setShowBanner(false)}
            className="mb-4"
          >
            <Small>
              <strong>Your cart is empty</strong>
            </Small>
          </Banner>
        </div>
      )}
    </>
  );
};

export default Checkout;
