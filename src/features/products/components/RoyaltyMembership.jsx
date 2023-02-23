import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { globalActions, globalSelectors } from "../../../global/global.slice";
import organisationsApi from "../../../services/organisationsApi.slice";
import Loader from "../../../utils/components/Loader";
import { H3 } from "../../../utils/components/Typography";

const RoyaltyMembership = ({ nonMemberText, memberText }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(globalSelectors.selectCurrentUser);
  const isRoyaltyMembership = currentUser?.isRoyaltyMembership;

  const currentOrder = useSelector(globalSelectors.selectOrder);

  const customerId = currentUser?.id;
  const cart = useSelector(globalSelectors.selectCart);
  const [subscribe, suscribeStatus] =
  organisationsApi.useSubscribeRoyaltyMutation();
  const [updateOrder, updateOrderStatus] =
    organisationsApi.useUpdateOrderMutation();


// update cart after subscribing to royalty membership.
// This is done to update the price of the items in the cart as well as the order total.
// And allow backend to calculate the discount for the order.
  const updateCart = () => {
    const payload = {
      customerId,
      cart,
      ...(currentOrder?.id && { id: currentOrder?.id }),
    };

    if (currentOrder?.id) {
      updateOrder({ payload })
        .then((data) => {
          if (data?.data?.order.id) {
            dispatch(globalActions.setOrder(data.data.order));
          }
        })

        .catch((e) => {
          console.error(e.data);
        });
    }
  };

 
// subscribe to royalty membership
  const handleSubscribe = () => {
    const payload = {
      id: currentUser?.id,
    };
    subscribe({ payload })
      .then((data) => {
        dispatch(globalActions.setCurrentUser(data.data));
        updateCart();
      })

      .catch((e) => {
        console.error(e.data);
      });
  };
  return (
    <>
      <Loader
        showLoading={suscribeStatus.isLoading || updateOrderStatus?.isLoading}
      />
      <div className="mt-4">
        {!isRoyaltyMembership && (
          <Button onClick={handleSubscribe} color="success">
            {nonMemberText || "20% DISCOUNT FOR OUR ROYALTY MEMBERS. JOIN NOW"}
          </Button>
        )}
        {isRoyaltyMembership && (
          <H3>{memberText || "20% DISCOUNT APPLIED AS OUR ROYALTY MEMBER"}</H3>
        )}
      </div>
    </>
  );
};

export default RoyaltyMembership;
