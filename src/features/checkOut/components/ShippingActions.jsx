import {
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  useMediaQuery,
} from "@mui/material";

import PrintIcon from "@mui/icons-material/Print";

import { forwardRef, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";


import { useSelector } from "react-redux";
import { globalSelectors } from "../../../global/global.slice";

import ShippingScreen from "./ShippingScreen";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const ShippingActions = ({ print, }) => {
  const shippingRef = useRef();
  const matches = useMediaQuery("(min-width:600px)");
  const [showModal, setShowModal] = useState(false);
  const placedOrder = useSelector(globalSelectors.selectPlacedOrder);
  const shipment = placedOrder?.shipment;

  // print shipment
  const handlePrint = useReactToPrint({
    onBeforeGetContent: () => {},
    content: () => shippingRef.current,
    onAfterPrint: () => {},
  });

  return (
    <div className="w-100">
      {print && (
        <Chip
          style={{ width: matches ? "10rem" : "8rem" }}
          label="Print shipment"
          onDelete={() => setShowModal(true)}
          onClick={() => setShowModal(true)}
          deleteIcon={<PrintIcon />}
          color="primary"
          size="small"
          variant="outlined"
        />
      )}
  

      <div>
        <Dialog
          open={showModal}
          TransitionComponent={Transition}
          keepMounted
          fullWidth={true}
          maxWidth="md"
        >
          <DialogTitle className=" bg-dark text-white">Shipment</DialogTitle>
          <DialogContent className=" fosyTech-tertiary-background-colour">
            <span className="d-flex justify-content-center align-items-center w-100 overflow-scroll">
              {shipment?.id && (
                <ShippingScreen ref={shippingRef} shipment={shipment} />
              )}
            </span>
          </DialogContent>
          <DialogActions className="bg-dark">
            {print && (
              <Button
                onClick={() => {
                  handlePrint();
                }}
                color="primary"
                variant="contained"
              >
                Print
              </Button>
            )}
          
            <Button
              onClick={() => {
                setShowModal(false);
              }}
              color="primary"
              variant="contained"
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default ShippingActions;
