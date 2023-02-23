import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useLocation, useNavigate } from "react-router-dom";
import { globalActions, globalSelectors } from "../global/global.slice";
import AuthLayout from "../layout/AuthLayout";
import Layout1 from "../layout/Layout1";
import organisationsApi from "../services/organisationsApi.slice";
import Loader from "../utils/components/Loader";
const noMenuBarRoutes = ["/easyGroceries-Shop/login"];

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation().pathname;
  const currentUser = globalSelectors.selectCurrentUser;
  const userId = localStorage.getItem("userId");
  const placedOrder = useSelector(globalSelectors.selectPlacedOrder);
  const cart = useSelector(globalSelectors.selectCart);
  const order = useSelector(globalSelectors.selectOrder);
  const localStorageCart = localStorage.getItem("cart");
  const localStorageOrder = localStorage.getItem("order");
  const localStoragePlacedOrder = localStorage.getItem("placedOrder");
  const localStorageUserId = localStorage.getItem("userId");

  const getCustomerQuery = organisationsApi.useGetCustomerQuery(
    { id: userId },
    { skip: !userId || currentUser?.id }
  );
  const customer = getCustomerQuery?.data;


//managing sync of local storage and redux store
  const manageAuth = useCallback(() => {
    if (!currentUser?.id) {
      if (customer?.id) {
        localStorage.setItem("userId", customer.id);
        dispatch(globalActions.setCurrentUser(customer));
        const currentUrl = localStorage.getItem("currentUrl");
        return navigate(currentUrl || "/easyGroceries-Shop");
      }
      localStorage.setItem("currentUrl", location);
      navigate("/easyGroceries-Shop/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser?.id, customer]);

  const manageLocalStorage = useCallback(() => {
    if (localStorageCart && !cart?.length && localStorageUserId === userId) {
      dispatch(globalActions.setCart(JSON.parse(localStorageCart)));
    }
    if (localStorageOrder && !order?.id && localStorageUserId === userId) {
      dispatch(globalActions.setOrder(JSON.parse(localStorageOrder)));
    }
    if (
      localStoragePlacedOrder &&
      !placedOrder?.id &&
      localStorageUserId === userId
    ) {
      dispatch(
        globalActions.setPlacedOrder(JSON.parse(localStoragePlacedOrder))
      );
    }
    if (cart?.length) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
    if (order?.id) {
      localStorage.setItem("order", JSON.stringify(order));
    }
    if (placedOrder?.id) {
      localStorage.setItem("placedOrder", JSON.stringify(placedOrder));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart?.length, order?.id, placedOrder?.id, userId]);

  useEffect(() => {
    manageAuth();
  }, [manageAuth]);

  useEffect(() => {
    manageLocalStorage();
  }, [manageLocalStorage]);
  return (
    <>
      <Loader showLoading={getCustomerQuery?.isLoading} />
      {noMenuBarRoutes.includes(location) && (
        <AuthLayout>{children}</AuthLayout>
      )}
      {!noMenuBarRoutes.includes(location) && <Layout1>{children}</Layout1>}
    </>
  );
};

export default AuthProvider;
