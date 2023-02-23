import { useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { globalSelectors } from "../../../global/global.slice";
import organisationsApi from "../../../services/organisationsApi.slice";
import Banner from "../../../utils/components/Banner";
import { Paragraph, Span } from "../../../utils/components/Typography";
import CheckoutSummary from "../components/CheckoutSummary";
import PaymentCard from "../components/PaymentCard";

const Payment = () => {
  const mediumScreen = useMediaQuery("(min-width:1100px)");
  const currentUser = useSelector(globalSelectors.selectCurrentUser);
  const cart = useSelector(globalSelectors.selectCart);
  const isRoyaltyMembership = currentUser?.isRoyaltyMembership;
  const getProductsQuery = organisationsApi.useGetProductsQuery();
  const products = getProductsQuery?.data;

  //calculate total both original and discounted price

  const calcTotal = () => {
    const cartTotal = cart?.reduce((acc, item) => {
      const product = products?.find(
        (product) => product.id === item.productId
      );

      if (isRoyaltyMembership) {
        return (
          acc +
          (Number(product?.price) - (20 / 100) * Number(product?.price)) *
            Number(item.quantity)
        );
      }
      return acc + Number(product?.price) * Number(item.quantity);
    }, 0);

    const originalProductTotal = cart?.reduce((acc, item) => {
      const product = products?.find(
        (product) => product.id === item.productId
      );
      return acc + Number(product?.price) * Number(item.quantity);
    }, 0);

    return { cartTotal, originalProductTotal };
  };

  return (
    <div>
      {cart.length > 0 && (
        <div
          className={
            mediumScreen
              ? "d-flex justify-content-between p-5 align-items-center h-100 bg-light"
              : "d-flex flex-column justify-content-center align-items-center h-75"
          }
        >
          <Span className={mediumScreen ? "w-50 me-3" : "w-100 p-1"}>
            <PaymentCard total={calcTotal()} />
          </Span>
          <Span>
            <CheckoutSummary products={products} total={calcTotal()} />
          </Span>
        </div>
      )}
      {cart?.length === 0 && (
        <div className="w-100 d-flex text-center justify-content-center mt-4 ">
          <Banner show variant="warning" className="mb-4">
            <Paragraph>
              <strong>
                Your cart is empty. Please add some products to your cart.
              </strong>
            </Paragraph>
          </Banner>
        </div>
      )}
    </div>
  );
};

export default Payment;
