import { createSlice } from "@reduxjs/toolkit";

const conversationsInitialState = {};

const conversationsSlice = createSlice({
  name: "conversations",
  initialState: conversationsInitialState,
  reducers: {},
});

export const conversationSliceReducer = conversationsSlice.reducer;
export const {} = conversationsSlice.actions;
