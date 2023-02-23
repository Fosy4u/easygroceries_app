import * as React from "react";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

const ProductImageList = ({ images }) => {
  return (
    <Box sx={{ width: 500, height: 600, overflowY: "scroll" }}>
      <ImageList variant="woven" cols={3} gap={8}>
        {images.map((item, index) => (
          <ImageListItem key={index}>
            <img src={item.imageUrl} alt="product" loading="lazy" />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
};


export default ProductImageList;
