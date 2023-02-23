import { Button, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { H2, Small, Span } from "../../../utils/components/Typography";
import ProductColors from "./ProductColors";
import ProductStock from "./ProductStock";
import ProductSizes from "./ProductSizes";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import RoyaltyMembership from "./RoyaltyMembership";
import ProductPrice from "./ProductPrice";
import { useDispatch, useSelector } from "react-redux";
import ProductQuantity from "./ProductQuantity";
import { globalActions, globalSelectors } from "../../../global/global.slice";

const ProductProperties = ({ product }) => {
  const mediumScreen = useMediaQuery("(min-width:600px)");
  const cart = useSelector(globalSelectors.selectCart);
  const dispatch = useDispatch();
  const [color, setColor] = useState(product?.colors[0]);
  const [size, setSize] = useState(product?.sizes[0]);
  const [quantity, setQuantity] = useState(1);


// calculate stock quantity
  // might be better to export this from util helper fuction since it is used in multiple places.
  // I will leave it here for now due to time constraint
  const getStock = () => {
    const items = cart.filter((item) => item.productId === product.id);
    const totalQuantity = items.reduce(
      (acc, item) => acc + Number(item.quantity),
      0
    );
    return product.stockQuantity - totalQuantity;
  };

  // add item  to cart
  const handleAddToCart = () => {
    const payload = {
      productId: product.id,
      quantity,
      color,
      size,
    };
    dispatch(globalActions.addToCart(payload));
    dispatch(
      globalActions.addToast({
        title: `${product.name}| ${quantity} | ${size} | ${color}   added to cart`,
        message: "Request Successful",
      })
    );
  };

  return (
    <div className="d-flex flex-column w-100">
      <H2>{product?.name}</H2>
      <ProductPrice product={product} />
      <ProductStock stockQuantity={getStock()} />
      <ProductSizes sizes={product?.sizes} size={size} setSize={setSize} />
      <ProductColors
        colors={product?.colors}
        color={color}
        setColor={setColor}
      />
      <ProductQuantity
        stock={getStock()}
        quantity={quantity}
        selectQuantity={setQuantity}
      />
      <Box
        className={mediumScreen ? "mb-3 w-75" : "mb-3 w-100"}
        sx={{ width: 400 }}
      >
        <Small>{product?.description}</Small>
      </Box>
      <Span className="mt-5">
        <Button
          variant="contained"
          endIcon={<ShoppingBasketIcon />}
          onClick={handleAddToCart}
          disabled={getStock() === 0 || quantity === 0 || !size || !color}
        >
          Add to cart
        </Button>
      </Span>
      <RoyaltyMembership />
    </div>
  );
};

export default ProductProperties;
