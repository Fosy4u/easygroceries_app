import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { useSelector } from "react-redux";
import { globalSelectors } from "../../../global/global.slice";
import { Span } from "../../../utils/components/Typography";
import { Chip } from "@mui/material";
import Badge from "@mui/material/Badge";
import { Stack } from "@mui/system";
import styled from "@emotion/styled";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const CheckoutSummary = ({ products, total }) => {
  const currentUser = useSelector(globalSelectors.selectCurrentUser);
  const cart = useSelector(globalSelectors.selectCart);
  const isRoyaltyMembership = currentUser?.isRoyaltyMembership;
  const { cartTotal, originalProductTotal } = total;

    // get the product in the cart
  const getProduct = (id) => {
    return products?.find((product) => product?.id === id);
  };

// calculate the total price of the product on cart
  const getPrice = (id, quantity) => {
    const product = products?.find((product) => product?.id === id);

    const price = isRoyaltyMembership
      ? product?.price - (20 / 100) * product?.price
      : product?.price;
    const totalPrice = price * quantity;
    return totalPrice.toFixed(2);
  };
  return (
    <List sx={{ bgcolor: "background.paper" }}>
      {cart?.length > 0 &&
        cart.map((item, index) => (
          <Span key={index} className="w-100">
            {" "}
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar
                  alt="product"
                  src={getProduct(item?.productId)?.imageUrl}
                  style={{ backgroundColor: item.color }}
                />
              </ListItemAvatar>

              <ListItemText
                primary={getProduct(item?.productId)?.name}
                secondary={
                  <Stack direction="row" spacing={1} className="me-5">
                    <Chip
                      variant="outlined"
                      label={item.size}
                      size="small"
                      sx={{ width: 70 }}
                    />
                    <Chip
                      label={item.color}
                      size="small"
                      sx={{
                        width: 100,
                        backgroundColor: item.color,
                        color: item.color === "black" ? "white" : "black",
                      }}
                    />
                  </Stack>
                }
              />

              <ListItemText
                primary={`£${getPrice(item?.productId, item.quantity)}`}
                secondary={
                  <ListItemAvatar>
                    <StyledBadge badgeContent={item.quantity} color="secondary">
                      <ShoppingCartIcon />
                    </StyledBadge>
                  </ListItemAvatar>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </Span>
        ))}
      <ListItem alignItems="flex-start">
        <ListItemText>
          <Span className="fw-bold">Total</Span>{" "}
          <Span className="fw-bold">£{cartTotal}</Span>
        </ListItemText>
        {isRoyaltyMembership && (
          <ListItemText>
            <Span className="fw-bold">Original Total</Span>{" "}
            <Span className="fw-bold text-decoration-line-through">
              £{originalProductTotal}
            </Span>
          </ListItemText>
        )}
      </ListItem>
    </List>
  );
};

export default CheckoutSummary;
