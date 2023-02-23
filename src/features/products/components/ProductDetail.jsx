import { useMediaQuery } from "@mui/material";
import React from "react";
import ProductImageList from "./ProductImageList";
import ProductProperties from "./ProductProperties";
import Image from "../../../images/noImage.jpeg";


const ProductDetail = ({ product }) => {
  const mediumScreen = useMediaQuery("(min-width:1100px)");
  const imageArray = Array(10).fill({
    imageUrl: product.imageUrl || Image,
  });
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div
        className={
          mediumScreen
            ? "d-flex justify-content-between p-3 m-2 w-100 "
            : "d-flex flex-column mt-3 p-3 m-2 w-100 "
        }
      >
        <div className="h-100">
          <ProductImageList images={imageArray} />
        </div>
        <div className="m-2 p-2">
          <ProductProperties product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
