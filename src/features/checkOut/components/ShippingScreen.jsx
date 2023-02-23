import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  useMediaQuery,
} from "@mui/material";

import { forwardRef } from "react";
import QRCode from "react-qr-code";
import { useSelector } from "react-redux";
import { globalSelectors } from "../../../global/global.slice";

import Logo from "../../../images/brand1.png";
import formatDate from "../../../utils/helper/formatDate";



const ShippingScreen = forwardRef((props, ref) => {
  const { shipment } = props;

  const matches = useMediaQuery("(min-width:600px)");

  const receipt = useSelector(globalSelectors.selectPlacedOrder)?.receipt;
  const customer = receipt?.customer;
  const organisation = useSelector(globalSelectors.selectOrganisation);
  const cart = useSelector(globalSelectors.selectPlacedOrder)?.order?.cart;
  const currency = shipment?.paymentCurrency?.currency || "£";

  return (
    organisation && (
      <div
        style={{ width: matches ? "50vw" : "90%" }}
        className="d-flex flex-column  overflow-scroll"
      >
        <Paper elevation={3} className="mt-4 w-100">
          <div className="me-auto mb-5 ms-auto  p-5  bg-white " ref={ref}>
            <section
              className={
                organisation?.logoUrl?.link && "d-flex  justify-content-between"
              }
            >
              <div>
                <img src={Logo} alt="alt" width={50} />
              </div>

              <div className="d-flex flex-column align-items-end justify-content-end">
                <strong
                  className={
                    matches ? "text-uppercase fs-4" : "text-uppercase fs-7"
                  }
                >
                  {organisation?.name}
                </strong>{" "}
                <p style={{ fontSize: !matches && "10px" }}>
                  {organisation?.address}
                </p>
                <p style={{ fontSize: !matches && "10px" }}>
                  {organisation?.email}
                </p>
                <p style={{ fontSize: !matches && "10px" }}>
                  {organisation?.phoneNo}
                </p>
              </div>
            </section>

            <section className="mt-3">
              <Divider />

              <h2 className="fs-6">shipment To :</h2>
              {customer && (
                <span className="d-flex flex-column">
                  <h2 className="fs-6">
                    {customer?.salutation && customer?.salutation}
                    {customer?.firstName} {customer?.lastName}
                  </h2>
                  <p style={{ fontSize: !matches && "10px" }}>
                    {customer?.address} {customer?.city}
                  </p>
                  <p style={{ fontSize: !matches && "10px" }}>
                    {customer?.email}
                  </p>
                  <p style={{ fontSize: !matches && "10px" }}>
                    {customer?.phoneNo}
                  </p>
                </span>
              )}

              <Divider />
            </section>

            <div className="d-flex  justify-content-between">
              <span className="d-flex flex-column">
                <span>
                  <strong className="mid-font-size">OrderID: </strong>{" "}
                  <span className="small-font-size"> {shipment?.orderId} </span>
                </span>
                <span>
                  <strong className="mid-font-size"> Status: </strong>{" "}
                  <span className="small-font-size">
                    {" "}
                    {shipment?.shipmentStatus}{" "}
                  </span>
                </span>
                <span>
                  <strong className="mid-font-size"> Method: </strong>{" "}
                  <span className="small-font-size">
                    {" "}
                    {shipment?.shipmentMethod}
                  </span>
                </span>
                <span>
                  <strong className="mid-font-size"> Carrier: </strong>{" "}
                  <span className="small-font-size">
                    {" "}
                    {shipment?.shipmentCompany}
                  </span>
                </span>
                <span>
                  <strong className="mid-font-size">shipment Date: </strong>
                  <span className="small-font-size">
                    {formatDate(shipment?.createdAt)}{" "}
                  </span>
                </span>
              </span>
              <span className="d-flex flex-column align-items-end justify-content-end">
                {" "}
                <span>
                  <QRCode
                    className="mt-2"
                    value={shipment?.shipmentTrackingUrl}
                    size={60}
                  />
                </span>
              </span>
            </div>

            <div className=" d-flex flex-column mt-4 w-100">
              <List
                className="w-100 overflow-scroll"
                style={{ maxHeight: "32rem" }}
              >
                {cart.length > 0 && (
                  <span className="d-flex justify-content-between w-75">
                    <ListItem sx={{ width: "20%" }}>
                      <ListItemText primary="Product" />
                    </ListItem>

                    <ListItem sx={{ width: "5%" }}>Colour</ListItem>
                    <ListItem sx={{ width: "5%" }}>Size</ListItem>
                    <ListItem sx={{ width: "5%" }}>Quantity</ListItem>

                    <ListItem sx={{ width: "5%" }}>Rate</ListItem>

                    <ListItem sx={{ width: "5%" }}>Price</ListItem>
                  </span>
                )}
              </List>
              <List
                className="w-100 overflow-scroll"
                style={{ maxHeight: "32rem" }}
              >
                {cart.length > 0 && (
                  <span>
                    {cart.map((item, index) => (
                      <span
                        key={index}
                        className="d-flex justify-content-between w-75"
                      >
                        <ListItem sx={{ width: "20%" }}>
                          <ListItemText primary={item?.product?.name} />
                        </ListItem>

                        <ListItem sx={{ width: "5%" }}>{item?.colour}</ListItem>
                        <ListItem sx={{ width: "5%" }}>{item?.size}</ListItem>
                        <ListItem sx={{ width: "5%" }}>
                          {item?.quantity}
                        </ListItem>

                        <ListItem sx={{ width: "5%" }}>
                          {currency + item?.unitPrice}
                        </ListItem>

                        <ListItem sx={{ width: "5%" }}>
                          {currency + item?.totalPrice}
                        </ListItem>
                      </span>
                    ))}
                  </span>
                )}
              </List>
              <Divider />
              <span className="d-flex flex-column justify-content-center p-4">
                <span className=" d-flex justify-content-between">
                  {" "}
                  <span className="">
                    <p>Payment Method</p>
                  </span>
                  <span>
                    <strong>{receipt?.paymentMethod}</strong>
                  </span>
                </span>
                <span className=" d-flex justify-content-between">
                  {" "}
                  <span className="">
                    <p>Status</p>
                  </span>
                  <span>
                    <strong>{receipt?.paymentStatus}</strong>
                  </span>
                </span>
                <span className=" d-flex justify-content-between">
                  <span className="">
                    <strong>TOTAL</strong>
                  </span>
                  <span>
                    <strong>{currency + Number(receipt?.amountDue)}</strong>
                  </span>
                </span>
                <span className=" d-flex justify-content-between">
                  <span className="">
                    <strong>Paid</strong>
                  </span>
                  <span>
                    <strong>{currency + Number(receipt?.paidAmount)}</strong>
                  </span>
                </span>
                <span className=" d-flex justify-content-between">
                  <span className="">
                    <strong>Balance</strong>
                  </span>
                  <span>
                    <strong>{currency + Number(receipt?.balance)}</strong>
                  </span>
                </span>
              </span>
              <Divider />
            </div>

            {shipment?.shipmentNotes && (
              <div className="mb-3 mt-2">
                {" "}
                <p style={{ fontSize: !matches && "10px" }}>
                  <strong>Notes: </strong> {shipment?.shipmentNotes}
                </p>
              </div>
            )}
          </div>
        </Paper>
      </div>
    )
  );
});

export default ShippingScreen;
