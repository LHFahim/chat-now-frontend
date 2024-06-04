import { createSlice } from "@reduxjs/toolkit";

const messagesInitialState = {};

const messagesSlice = createSlice({
  name: "messages",
  initialState: messagesInitialState,
  reducers: {},
});

export const messageSliceReducer = messagesSlice.reducer;
export const {} = messagesSlice.actions;
