import { createSelector, createSlice } from "@reduxjs/toolkit";
export const GLOBAL_FEATURE_KEY = "global";

const initialState = {
  toasts: [],
  hideSideBar: false,
  currentUser: {},
  organisation: {
    id: 0,
    name: "EasyGroceries Shop",
    address: "3 Torridon Road",
    phone: "07463766778",
    email: "info@easy.com",
    website: "www.easyGroceries.com",
  },
  cart: [],
  order: {},
  placedOrder: {},
};

export const globalSlice = createSlice({
  name: GLOBAL_FEATURE_KEY,
  initialState,
  reducers: {
    addToast: (state, action) => {
      state.toasts.push({
        ...action.payload,
        id: Math.floor(Math.random() * 10000),
      });
    },
    removeToast: (state, action) => {
      state.toasts = state.toasts.filter(
        (toast) => action.payload !== toast.id
      );
    },

    addToCart: (state, action) => {
      const existingItem = state.cart.find(
        (item) =>
          item?.productId === action.payload.productId &&
          item?.size === action.payload.size &&
          item?.color === action.payload.color
      );

      if (existingItem) {
        existingItem.quantity =
          Number(existingItem.quantity) + Number(action.payload.quantity);
        state.cart = state.cart.map((item) =>
          item.productId === existingItem.productId ? existingItem : item
        );
      } else {
        state.cart.push(action.payload);
      }
    },
    updateCartItem: (state, action) => {
      state.cart = state.cart.map((item) =>
        item.productId === action.payload.productId &&
        item.size === action.payload.size &&
        item.color === action.payload.color
          ? { ...item, ...action.payload }
          : item
      );
    },

    removeFromCart: (state, action) => {
      state.cart = state.cart.filter(
        (item) =>
          item.productId !== action.payload.productId ||
          item.size !== action.payload.size ||
          item.color !== action.payload.color
      );
    },
    setCart: (state, action) => {
      state.cart = action.payload;
    },

    setCurrentUser: (state, action) => {
      state.currentUser = Object.assign(state.currentUser, action.payload);
    },

    setOrganisation: (state, action) => {
      state.organisation = Object.assign(state.organisation, action.payload);
    },

    setHideSideBar: (state, action) => {
      state.hideSideBar = action.payload;
    },
    setOrder: (state, action) => {
      state.order = action.payload;
    },
    setPlacedOrder: (state, action) => {
      state.placedOrder = action.payload;
    },
  },
});

export const globalReducer = globalSlice.reducer;

export const globalActions = globalSlice.actions;

const getGlobalState = (rootState) => rootState[GLOBAL_FEATURE_KEY];

export const selectCurrentUser = createSelector(
  getGlobalState,
  (state) => state.currentUser
);

const selectOrganisation = createSelector(
  getGlobalState,
  (state) => state.organisation
);

const selectToasts = createSelector(getGlobalState, (state) => state.toasts);
const selectHideSideBar = createSelector(
  getGlobalState,
  (state) => state.hideSideBar
);
const selectCart = createSelector(getGlobalState, (state) => state.cart);
const selectOrder = createSelector(getGlobalState, (state) => state.order);
const selectPlacedOrder = createSelector(
  getGlobalState,
  (state) => state.placedOrder
);

export const globalSelectors = {
  getGlobalState,
  selectToasts,
  selectCurrentUser,
  selectOrganisation,
  selectHideSideBar,
  selectCart,
  selectOrder,
  selectPlacedOrder,
};
