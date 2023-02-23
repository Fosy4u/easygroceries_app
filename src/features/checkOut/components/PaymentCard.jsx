import {
  Button,
  Card,
  CardContent,
  Chip,
  Stack,
  TextareaAutosize,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { globalActions, globalSelectors } from "../../../global/global.slice";
import organisationsApi from "../../../services/organisationsApi.slice";
import Loader from "../../../utils/components/Loader";
import { H3, Span } from "../../../utils/components/Typography";
import RoyaltyMembership from "../../products/components/RoyaltyMembership";

const PaymentCard = ({ total }) => {
  const currentUser = useSelector(globalSelectors.selectCurrentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("Credit Card");
  const [shipmentMethod, setShipmentMethod] = useState("Standard");
  const [shipmentNotes, setShipmentNotes] = useState("");
  const [firstName, setFirstName] = useState(currentUser?.firstName);
  const [lastName, setLastName] = useState(currentUser?.lastName);
  const [email, setEmail] = useState(currentUser?.email);
  const [address, setAddress] = useState(currentUser?.address);
  const [city, setCity] = useState(currentUser?.city);
  const [country, setCountry] = useState(currentUser?.country);
  const [postCode, setPostCode] = useState(currentUser?.postCode);
  const [phone, setPhone] = useState(currentUser?.phone);
  const paymentMethods = ["Credit Card", "PayPal", "Bank Transfer", "Phone"];
  const shipmentMethods = ["Standard", "Express", "Next Day"];
  const [makePayment, makePaymentStatus] =
    organisationsApi.useMakePaymentMutation();
  const orderId = useSelector(globalSelectors.selectOrder).id;

  const validate = () => {
    if (
      !firstName ||
      !lastName ||
      !email ||
      !address ||
      !city ||
      !country ||
      !postCode ||
      !phone
    ) {
      dispatch(
        globalActions.addToast({
          title: "Please fill in all the fields",
          message: "Error",
          variant: "error",
        })
      );

      return false;
    }
    return true;
  };

  // default some values to the current user profile details to save time
  const handlePayment = () => {
    const payload = {
      paymentMethod,
      orderId,
      shipmentNotes,
      shipmentMethod,
      firstName,
      lastName,
      email,
      address,
      city,
      country,
      postCode,
      phone,

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
        <H3 className="d-flex w-100 justify-content-center mt-1">
          <strong>Shipping Details</strong>
        </H3>
        {!currentUser?.isRoyaltyMembership && (
          <CardContent>
            <RoyaltyMembership />
          </CardContent>
        )}
        <CardContent>
          <Span className="d-flex justify-content-between  p-1">
            <TextField
              autoFocus
              margin="dense"
              label="First Name"
              variant="standard"
              value={firstName || ""}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <TextField
              margin="dense"
              label="Last Name"
              variant="standard"
              required
              value={lastName || ""}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Span>
          <Span className="d-flex justify-content-between  p-1">
            <TextField
              required
              margin="dense"
              label="Email Address"
              type="email"
              variant="standard"
              value={email || ""}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              required
              margin="dense"
              label="Address"
              variant="standard"
              value={address || ""}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Span>
          <Span className="d-flex  justify-content-between p-1">
            <TextField
              required
              margin="dense"
              label="Post Code"
              variant="standard"
              value={postCode || ""}
              onChange={(e) => setPostCode(e.target.value)}
            />
            <TextField
              required
              margin="dense"
              label="Phone Number"
              type="email"
              variant="standard"
              value={phone || ""}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Span>
          <Span className="d-flex  justify-content-between p-1">
            <TextField
              required
              margin="dense"
              label="City"
              variant="standard"
              value={city || ""}
              onChange={(e) => setCity(e.target.value)}
            />
            <TextField
              required
              margin="dense"
              label="Country"
              type="email"
              variant="standard"
              value={country || ""}
              onChange={(e) => setCountry(e.target.value)}
            />
          </Span>
        </CardContent>
        <Span className="d-flex flex-column p-3">
          <H3>Payment Method</H3>
          <Stack direction="row" spacing={1} className="m-2">
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

          <H3>Shipping Method</H3>
          <Stack direction="row" spacing={1} className="m-2">
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
        </Span>

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
            onClick={() => {
              if (validate()) {
                handlePayment();
              }
            }}
          >
            Pay £{total.cartTotal.toFixed(2)} to Complete Order
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentCard;
