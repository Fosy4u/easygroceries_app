import React from "react";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { H5, Span, Tiny } from "../../../utils/components/Typography";
import { orange } from "@mui/material/colors";
import { useMediaQuery } from "@mui/material";

const ProductStock = ({ stockQuantity }) => {
  const mediumScreen = useMediaQuery("(min-width:600px)");
  return (
    <div
      className={
        mediumScreen
          ? " border border-danger mt-3 mb-3 d-flex justify-content-center w-50 "
          : " border border-danger mt-3 mb-3 d-flex justify-content-center "
      }
    >
      <Span className="p-3 d-flex flex-wrap">
        <Span className="me-2">
          <ShoppingBasketIcon sx={{ fontSize: 38, color: orange[900] }} />
        </Span>
        <Span>
          <H5>
            <strong>SELLING OUT</strong>
          </H5>
          <Tiny className="text-danger">
            only {stockQuantity} left in stock.
          </Tiny>
        </Span>
      </Span>
    </div>
  );
};

export default ProductStock;
