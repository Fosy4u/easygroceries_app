import React, { useState } from "react";
import { Chip, Select, Stack } from "@mui/material";
import { H4, Span } from "../../../utils/components/Typography";

const ProductQuantity = ({ stock, quantity, selectQuantity }) => {
  return (
    <div className="mt-3 mb-3 w-50 d-flex ">
      <Span className="mt-3 me-2">
        <H4>Quantity : </H4>
      </Span>
      <Select
        native
        value={quantity}
        onChange={(e) => selectQuantity(e.target.value)}
        inputProps={{
          name: "quantity",
          id: "quantity",
        }}
      >
        {Array.from(Array(stock).keys()).map((item, index) => (
          <option key={index} value={item + 1}>
            {item + 1}
          </option>
        ))}
      </Select>
    </div>
  );
};

export default ProductQuantity;
