import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Stack,
  TextareaAutosize,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { globalActions, globalSelectors } from "../../../global/global.slice";
import organisationsApi from "../../../services/organisationsApi.slice";
import Loader from "../../../utils/components/Loader";
import { H3 } from "../../../utils/components/Typography";
import RoyaltyMembership from "../../products/components/RoyaltyMembership";

const PaymentCard = ({ total }) => {
  const currentUser = useSelector(globalSelectors.selectCurrentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");
  const [shipmentMethod, setShipmentMethod] = useState("Standard");
  const [shipmentNotes, setShipmentNotes] = useState("");
  const paymentMethods = ["Credit Card", "PayPal", "Bank Transfer", "Phone"];
  const shipmentMethods = ["Standard", "Express", "Next Day"];
  const [makePayment, makePaymentStatus] =
    organisationsApi.useMakePaymentMutation();
  const orderId = useSelector(globalSelectors.selectOrder).id;

  // default some values to the current user profile details to save time
  const handlePayment = () => {
    const payload = {
      paymentMethod,
      orderId,
      shipmentNotes,
      shipmentMethod,
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      address: currentUser.address,
      city: currentUser.city,
      country: currentUser.country,
      postCode: currentUser.postCode,
      paidAmount: total.cartTotal,
    };
    makePayment({ payload })
      .then((data) => {
      
        dispatch(globalActions.setOrder({}));
        dispatch(globalActions.setCart([]));
        dispatch(globalActions.setPlacedOrder(data.data));
        localStorage.removeItem("cart");
        localStorage.removeItem("order");
        localStorage.setItem("placedOrder", JSON.stringify(data.data));

        navigate("/easyGroceries-Shop/checkOut/sucess");
      })

      .catch((e) => {
        console.error(e.data);
      });
  };

  return (
    <div>
      <Card>
        <Loader showLoading={makePaymentStatus?.isLoading} />
        <CardHeader
          title="Complete Order"
          subheader="your shipping details will be same as your profile details"
        />
        <CardContent>
          <RoyaltyMembership />
        </CardContent>
        <CardContent>
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
        </CardContent>
        <CardContent>
          <H3>Shipping Method</H3>
          <Stack direction="row" spacing={1} className="mt-2">
            {shipmentMethods?.map((method, index) => (
              <Chip
                key={index}
                variant={shipmentMethod === method ? "default" : "outlined"}
                label={method}
                size="small"
                color={shipmentMethod === method ? "success" : "default"}
                sx={{
                  width: 150,
                }}
                onClick={() => setShipmentMethod(method)}
              />
            ))}
          </Stack>
        </CardContent>
        <CardContent>
          <H3>Shipment Notes</H3>
          <TextareaAutosize
            aria-label="empty textarea"
            placeholder="Add shipment notes here"
            value={shipmentNotes}
            onChange={(e) => setShipmentNotes(e.target.value)}
            style={{ width: 300 }}
            minRows={3}
          />
        </CardContent>

        <CardContent>
          <Button
            variant="contained"
            color="success"
            fullWidth
            onClick={handlePayment}
          >
            Pay £{total.cartTotal} to Complete Order
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentCard;
