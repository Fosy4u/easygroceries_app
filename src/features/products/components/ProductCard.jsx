import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import Image from "../../../images/noImage.jpeg";
import { Link } from "react-router-dom";
import ProductPrice from "./ProductPrice";
import { H4 } from "../../../utils/components/Typography";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/easyGroceries-Shop/product/${product.id}`}>
      <Card sx={{ width: 345, height: 450 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="340"
            image={product.imageUrl || Image}
            alt="green iguana"
          />

          <CardContent>
            <H4>{product.name}</H4>
            <ProductPrice product={product} />
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};

export default ProductCard;
