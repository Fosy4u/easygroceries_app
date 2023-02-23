import React from "react";
import { useSelector } from "react-redux";
import { globalSelectors } from "../../../global/global.slice";
import { H3, Span } from "../../../utils/components/Typography";

const ProductPrice = ({ product }) => {
  const currentUser = useSelector(globalSelectors.selectCurrentUser);
  const isRoyaltyMembership = currentUser?.isRoyaltyMembership;
  const price = isRoyaltyMembership
    ? product?.price - (20 / 100) * product?.price
    : product?.price;

  return (
    <Span className="d-flex text-danger">
      <H3
        className={
          isRoyaltyMembership ? " text-decoration-line-through me-2" : " "
        }
      >
        {product?.currency || "£"}
        {product?.price}
      </H3>
      {isRoyaltyMembership && (
        <H3>
          {product?.currency || "£"}
          {price}
        </H3>
      )}
    </Span>
  );
};

export default ProductPrice;
