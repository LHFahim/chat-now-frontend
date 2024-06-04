import { createSlice } from "@reduxjs/toolkit";

const authInitialState = {};

const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {},
});

// export default authSlice.reducer;
export const authSliceReducer = authSlice.reducer;
// export const {} = authSlice.actions;
