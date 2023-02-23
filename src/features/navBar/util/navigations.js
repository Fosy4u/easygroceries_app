
import InventoryIcon from "@mui/icons-material/Inventory";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

// for the navigation side bar
export const navigations = [
  { label: "EasyGroceries E-Commerce Shop", type: "label" },

  {
    name: "Products",
    iconComponent: <InventoryIcon />,
    children: [
      { name: "All Products", iconText: "AP", path: "/easyGroceries-Shop" },
    ],
  },
  {
    name: "Basket",
    iconComponent: <ShoppingBasketIcon />,
    children: [
      {
        name: "Cart",
        iconText: "CA",
        path: "/easyGroceries-Shop/checkOut/cart",
      },
    ],
  },
];
