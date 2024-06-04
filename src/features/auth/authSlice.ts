import { createSlice } from "@reduxjs/toolkit";

const authInitialState = {
  accessToken: undefined,
  user: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },
    userLoggedOut: (state) => {
      state.accessToken = undefined;
      state.user = undefined;
    },
  },
});

// export default authSlice.reducer;
export const authSliceReducer = authSlice.reducer;
export const { userLoggedIn, userLoggedOut } = authSlice.actions;
