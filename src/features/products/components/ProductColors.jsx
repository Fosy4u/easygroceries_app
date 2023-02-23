import React, { useState } from "react";
import DoneIcon from "@mui/icons-material/Done";
import { Chip, Stack } from "@mui/material";
import { green } from "@mui/material/colors";
import { H4, Span } from "../../../utils/components/Typography";

const ProductColors = ({ colors, setColor, color }) => {
  const [hoveredColor, setHoveredColor] = useState(null);
  return (
    <div className="mt-3 mb-3 w-50  ">
      <Span className="d-flex">
        <H4>Colour : </H4> {hoveredColor ? hoveredColor : color}
      </Span>
      <Stack direction="row" spacing={1}>
        {colors?.map((colorItem, index) => (
          <Chip
            key={index}
            variant={colorItem === color ? "default" : "outlined"}
            label={colorItem}
            size="small"
            sx={{
              width: 150,
              backgroundColor: colorItem,
              color: color === colorItem ? "white" : "black",
            }}
            onMouseEnter={() => setHoveredColor(colorItem)}
            onMouseLeave={() => setHoveredColor(null)}
            onClick={() => setColor(colorItem)}
            avatar={
              colorItem === color ? (
                <DoneIcon sx={{ color: green[900], fontSize: 14 }} />
              ) : null
            }
          />
        ))}
      </Stack>
    </div>
  );
};

export default ProductColors;
