import { AppBar, Button, ThemeProvider, Toolbar } from "@mui/material";
import { useTheme } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { globalActions, globalSelectors } from "../../../global/global.slice";
import useSettings from "../../../hooks/useSettings";
import organisationsApi from "../../../services/organisationsApi.slice";
import Loader from "../../../utils/components/Loader";

const CheckoutFooter = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { settings } = useSettings();
  const dispatch = useDispatch();
  const footerTheme = settings.themes[settings.footer.theme] || theme;
  const currentUser = useSelector(globalSelectors.selectCurrentUser);
  const currentOrder = useSelector(globalSelectors.selectOrder);
  const customerId = currentUser?.id;
  const cart = useSelector(globalSelectors.selectCart);
  const [createOrder, createOrderStatus] =
    organisationsApi.useCreateOrderMutation();
  const [updateOrder, updateOrderStatus] =
    organisationsApi.useUpdateOrderMutation();


    //either create or update order
  const handleProceedToCheckout = () => {
    const payload = {
      customerId,
      cart,
      ...(currentOrder?.id && { id: currentOrder?.id }),
    };
    if (!currentOrder?.id) {
      createOrder({ payload })
        .then((data) => {
          if (data?.data?.order?.id) {
            dispatch(globalActions.setOrder(data.data.order));
            navigate("/easyGroceries-Shop/checkOut/payment");
          }
        })

        .catch((e) => {
          console.error(e.data);
        });
    }
    if (currentOrder?.id) {
      updateOrder({ payload })
        .then((data) => {
          if (data?.data?.order.id) {
            dispatch(globalActions.setOrder(data.data.order));
            navigate("/easyGroceries-Shop/checkOut/payment");
          }
        })

        .catch((e) => {
          console.error(e.data);
        });
    }
  };

  return (
    <ThemeProvider theme={footerTheme}>
      <Loader
        showLoading={
          createOrderStatus?.isLoading || updateOrderStatus?.isLoading
        }
      />
      <AppBar
        color="primary"
        position="fixed"
        sx={{ zIndex: 96, top: "auto", bottom: 0 }}
      >
        <Toolbar className="d-flex justify-content-end">
          <Button
            color="success"
            variant="contained"
            onClick={handleProceedToCheckout}
          >
            Proceed to Checkout
          </Button>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
};

export default CheckoutFooter;
