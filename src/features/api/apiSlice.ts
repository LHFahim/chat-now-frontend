import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PreparedHeaderState } from "./types.api";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    prepareHeaders: async (headers, { getState, endpoint }) => {
      const tokenObj = getState() as PreparedHeaderState;

      const token = tokenObj.auth.accessToken;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: [],
  endpoints: (build) => ({}),
});
