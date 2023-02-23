import { Auth } from "../features/auth/SessionRoutes";
import Checkout from "../features/checkOut/view/Checkout";
import Payment from "../features/checkOut/view/Payment";
import SuccessfulOrder from "../features/checkOut/view/SuccessfulOrder";
import Product from "../features/products/view/Product";
import Products from "../features/products/view/Products";
import ShoppingCart from "../features/products/view/Products";


const routes = [
  {
    path: "/easyGroceries-Shop",
    component: Products,
    isDefault: true,
  },
  {
    path: "/easyGroceries-Shop/login",
    component: Auth,
  },
  {
    path: "/easyGroceries-Shop/product/:id",
    component: Product,
  },
  {
    path: "/easyGroceries-Shop/shoppingCart/",
    component: ShoppingCart,
  },
  {
    path: "/easyGroceries-Shop/checkOut/cart",
    component: Checkout,
  },
  {
    path: "/easyGroceries-Shop/checkOut/payment",
    component: Payment,
  },
  {
    path: "/easyGroceries-Shop/checkOut/sucess",
    component: SuccessfulOrder,
  }
  
];

export default routes;
