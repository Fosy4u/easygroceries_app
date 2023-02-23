import React, { useState } from "react";
import { Chip, Stack } from "@mui/material";
import { H4, Span } from "../../../utils/components/Typography";

const ProductSizes = ({ sizes, setSize, size }) => {
    const [hoveredSize, sethoveredSize] = useState(null);

  return (
    <div className="mt-3 mb-3 w-50  ">
         <Span className="d-flex">
        <H4>Size : </H4> {hoveredSize ? hoveredSize : size}
      </Span>
      <Stack direction="row" spacing={1}>
        {sizes?.map((sizeItem, index) => (
          <Chip
            variant={sizeItem === size ? "default" : "outlined"}
            key={index}
            color={sizeItem === size ? "success" : "default"}
            label={sizeItem}
            size="small"
            sx={{ width: 70 }}
            onClick={() => setSize(sizeItem)}
            onMouseEnter={() => sethoveredSize(sizeItem)}
            onMouseLeave={() => sethoveredSize(null)}
          
          />
        ))}
      </Stack>
    </div>
  );
};

export default ProductSizes;
