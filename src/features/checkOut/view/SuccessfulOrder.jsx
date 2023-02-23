import { Card,  CardHeader } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { globalSelectors } from "../../../global/global.slice";
import Banner from "../../../utils/components/Banner";
import { Paragraph, Span } from "../../../utils/components/Typography";

import ReceiptActions from "../components/ReceiptActions";
import ShippingActions from "../components/ShippingActions";

const SuccessfulOrder = () => {
  const placedOrder = useSelector(globalSelectors.selectPlacedOrder);
  const currentReceipt = placedOrder?.receipt;

  const currentShipment = placedOrder?.shipment;

  return (
    <div className="h-100">
      {!currentReceipt?.id && !currentShipment?.id && (
        <div className="w-100 d-flex text-center justify-content-center mt-4 ">
          <Banner show variant="warning" className="mb-4">
            <Paragraph>
              <strong>
                Your do not have a receipt or shipment. Please check back later
                after you have made a purchase.
              </strong>
            </Paragraph>
          </Banner>
        </div>
      )}
      {currentReceipt?.id && currentShipment?.id && (
        <div className="d-flex h-100 justify-content-center align-items-center w-100">
          <Card>
            <CardHeader
              title="Congratulations! Your order has been placed."
              subheader="You will receive an email confirmation shortly."
            />
            <Span className="d-flex m-2 p-2">
              <ReceiptActions print />
              <ShippingActions print />
            </Span>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SuccessfulOrder;
