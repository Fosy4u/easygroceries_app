import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import responseHandler from "./responseHandler";
// import fetchBaseQuery from "./baseQuery";

export default createApi({
  reducerPath: "organisationsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://localhost:5001/" }),
  refetchOnMountOrArgChange: true,
  tagTypes: ["Products", "Customers", "Orders"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => {
        return {
          url: `api/Product`,
        };
      },
      providesTags: ["Products", "Orders", "Customers"],
      onQueryStarted: async (_, queryArgs) => {
        responseHandler({}, queryArgs);
      },
    }),
    getCustomers: builder.query({
      query: () => {
        return {
          url: `api/Customer`,
        };
      },
      providesTags: ["Products", "Orders", "Customers"],
      onQueryStarted: async (_, queryArgs) => {
        responseHandler({}, queryArgs);
      },
    }),

    getCustomer: builder.query({
      query: (arg) => {
        const { id } = arg;
        return {
          url: `api/Customer/${id}`,
          params: { id },
        };
      },
      providesTags: [["Products", "Orders", "Customers"]],
      onQueryStarted: async (_, queryArgs) => {
        responseHandler({}, queryArgs);
      },
    }),
    getProduct: builder.query({
      query: (arg) => {
        const { id } = arg;
        return {
          url: `api/Product/${id}`,
          params: { id },
        };
      },
      providesTags: [["Products", "Orders", "Customers"]],
      onQueryStarted: async (_, queryArgs) => {
        responseHandler({}, queryArgs);
      },
    }),

    subscribeRoyalty: builder.mutation({
      query: ({ payload }) => ({
        url: `/api/Customer/${payload.id}/royaltyMembership/subscribe`,
        method: "PUT",
        body: payload.id,
      }),
      invalidatesTags: (result, error) =>
        error ? [] : ["Products", "Customers", "Orders"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "subscribed successfully",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    createOrder: builder.mutation({
      query: ({ payload }) => ({
        url: `/api/Order`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: (result, error) =>
        error ? [] : ["Products", "Customers", "Orders"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "order saved successfully",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    updateOrder: builder.mutation({
      query: ({ payload }) => ({
        url: `/api/Order/${payload.id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: (result, error) =>
        error ? [] : ["Products", "Customers", "Orders"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "order updated successfully",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
    makePayment: builder.mutation({
      query: ({ payload }) => ({
        url: `/api/Order/payment/${payload.orderId}`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: (result, error) =>
        error ? [] : ["Products", "Customers", "Orders"],
      onQueryStarted: async ({ successHandler, errorHandler }, queryArgs) => {
        responseHandler(
          {
            success: "order payment made successfully",
            successHandler,
            errorHandler,
          },
          queryArgs
        );
      },
    }),
  }),
});
