import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,

} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { globalActions, globalSelectors } from "../../../global/global.slice";
import organisationsApi from "../../../services/organisationsApi.slice";
import Loader from "../../../utils/components/Loader";
import { H5, H3 } from "../../../utils/components/Typography";

const RoyaltyMembership = ({ nonMemberText, memberText }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(globalSelectors.selectCurrentUser);
  const isRoyaltyMembership = currentUser?.isRoyaltyMembership;
  const currentOrder = useSelector(globalSelectors.selectOrder);
  const [open, setOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");
  const paymentMethods = ["Credit Card", "PayPal", "Bank Transfer", "Phone"];
  const customerId = currentUser?.id;
  const cart = useSelector(globalSelectors.selectCart);
  const [subscribe, suscribeStatus] =
    organisationsApi.useSubscribeRoyaltyMutation();
  const [updateOrder, updateOrderStatus] =
    organisationsApi.useUpdateOrderMutation();

  

  const handleClose = () => {
    setOpen(false);
  };
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
      amountPaid: 5,
      paymentMethod,
    };
    subscribe({ payload })
      .then((data) => {
        dispatch(globalActions.setCurrentUser(data.data));
        updateCart();
        setOpen(false);
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
          <Button onClick={() => setOpen(true)} color="success">
            {nonMemberText ||
              "20% DISCOUNT FOR OUR ROYALTY MEMBERS. JOIN NOW FOR £5"}
          </Button>
        )}
        {isRoyaltyMembership && (
          <H5>{memberText || "20% DISCOUNT APPLIED AS OUR ROYALTY MEMBER"}</H5>
        )}
      </div>
      <div>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To become a royalty member, please select the mode of payment.
              Note that you will be charged £5 for the membership.
            </DialogContentText>

            <H3>Payment Method</H3>
            <Stack direction="row" spacing={1} className="mt-2">
              {paymentMethods?.map((method, index) => (
                <Chip
                  key={index}
                  variant={paymentMethod === method ? "default" : "outlined"}
                  label={method}
                  size="small"
                  color={paymentMethod === method ? "success" : "default"}
                  sx={{
                    width: 150,
                  }}
                  onClick={() => setPaymentMethod(method)}
                />
              ))}
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={() => handleSubscribe()}>Subscribe</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default RoyaltyMembership;
