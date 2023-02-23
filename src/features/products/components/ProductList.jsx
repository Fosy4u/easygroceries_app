import React from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ products }) => {
  return (
    <div className="d-flex flex-wrap justify-content-center  align-items-center m-2">
      {products.map((product) => (
        <div key={product.id} className="m-2">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductList;
