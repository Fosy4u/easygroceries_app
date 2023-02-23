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


const ReceiptScreen = forwardRef((props, ref) => {
  const { receipt } = props;
  const matches = useMediaQuery("(min-width:600px)");
  const shipment = useSelector(globalSelectors.selectPlacedOrder)?.shipment;
  const organisation = useSelector(globalSelectors.selectOrganisation);
  const cart = useSelector(globalSelectors.selectPlacedOrder)?.order?.cart;
  const currency = receipt?.paymentCurrency?.currency || "£";

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

              <h2 className="fs-6">Receipt To :</h2>
              {shipment && (
                <span className="d-flex flex-column">
                  <h2 className="fs-6">
                    {shipment?.salutation && shipment?.salutation}
                    {shipment?.firstName} {shipment?.lastName}
                  </h2>
                  <p style={{ fontSize: !matches && "10px" }}>
                    {shipment?.address} {shipment?.city}
                  </p>
                  <p style={{ fontSize: !matches && "10px" }}>
                    {shipment?.email}
                  </p>
                  <p style={{ fontSize: !matches && "10px" }}>
                    {shipment?.phoneNo}
                  </p>
                </span>
              )}

              <Divider />
            </section>

            <div className="d-flex  justify-content-between">
              <span className="d-flex flex-column">
                <span>
                  <strong className="mid-font-size">Receipt No: </strong>{" "}
                  <span className="small-font-size">
                    {" "}
                    {receipt?.receiptNo}{" "}
                  </span>
                </span>
                <span>
                  <strong className="mid-font-size"> Paid: </strong>{" "}
                  <span className="small-font-size">
                    {" "}
                    {"£" + receipt?.paidAmount}{" "}
                  </span>
                </span>
                <span>
                  <strong className="mid-font-size"> Balance: </strong>{" "}
                  <span className="small-font-size">
                    {" "}
                    {"£" + Number(receipt.balance || 0)}{" "}
                  </span>
                </span>
                <span>
                  <strong className="mid-font-size">Receipt Date: </strong>
                  <span className="small-font-size">
                    {formatDate(receipt.createdAt)}{" "}
                  </span>
                </span>
              </span>
              <span className="d-flex flex-column align-items-end justify-content-end">
                {" "}
                <span>
                  <QRCode
                    className="mt-2"
                    value={`${organisation?.name} ${
                      receipt?.receiptNo + "-" + shipment?.firstName
                    } ${shipment?.lastName + "-total-" + receipt.total}`}
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
                    <p>Payment status</p>
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

            {/* {notes && (
                <div className="mb-3 mt-2">
                  {" "}
                  <p style={{ fontSize: !matches && "10px" }}>
                    <strong>Notes: </strong> {notes}
                  </p>
                </div>
              )} */}
          </div>
        </Paper>
      </div>
    )
  );
});

export default ReceiptScreen;
