import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { globalActions, globalSelectors } from "../../../global/global.slice";
import { H4, Span, Tiny } from "../../../utils/components/Typography";

const CheckOutProductCard = ({ item, product, remainingStock }) => {
  const currentUser = useSelector(globalSelectors.selectCurrentUser);
  const dispatch = useDispatch();
  const isRoyaltyMembership = currentUser?.isRoyaltyMembership;

  const price = isRoyaltyMembership
    ? product?.price - (20 / 100) * product?.price.toFixed(2)
    : product?.price.toFixed(2);

  const removeFromCart = () => {
    const payload = {
      productId: product.id,
      quantity: 0,
      size: item.size,
      color: item.color,
    };
    dispatch(globalActions.removeFromCart(payload));
    dispatch(
      globalActions.addToast({
        title: `${product.name} | ${item.size} | ${item.color}   removed from cart`,
        message: "Request Successful",
      })
    );
  };

  const handleQuantityChange = (e) => {
    let quantity;
    if (e === "added") {
      quantity = Number(item.quantity) + 1;
    } else {
      quantity = Number(item.quantity) - 1;
    }
    const payload = {
      productId: product.id,
      quantity,
      size: item.size,
      color: item.color,
    };
    if (quantity === 0) {
      removeFromCart();
    } else {
      dispatch(globalActions.updateCartItem(payload));
      dispatch(
        globalActions.addToast({
          title: `${product.name}| ${item.quantity} | 1 | ${item.color}   ${e} to cart`,
          message: "Request Successful",
        })
      );
    }
  };

  return (
    <div className="d-flex flex-column">
      <Link to={`/easyGroceries-Shop/product/${product?.id}`}>
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
            </CardContent>
          </CardActionArea>
        </Card>
      </Link>
      <div className="d-flex justify-content-between p-3">
        <Span>£{(item.quantity * price).toFixed(2)}</Span>
        <Span>
          {item.size} | {item.color}
        </Span>
      </div>
      <div className="d-flex justify-content-between p-3">
        <Span className="d-flex flex-column">
          <Span>
            <Button
              color="success"
              onClick={() => handleQuantityChange("added")}
              disabled={remainingStock === 0}
            >
              +
            </Button>
            {item.quantity}
            <Button onClick={() => handleQuantityChange("removed")}> - </Button>
          </Span>
          {remainingStock === 0 && (
            <Tiny className="text-danger">Out of Stock</Tiny>
          )}
        </Span>
        <Span>
          <Button color="error" onClick={removeFromCart}>
            Delete
          </Button>
        </Span>
      </div>
    </div>
  );
};

export default CheckOutProductCard;
