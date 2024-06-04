import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import { authSliceReducer } from "../features/auth/authSlice";
import { conversationSliceReducer } from "../features/conversations/conversationsSlice";
import { messageSliceReducer } from "../features/messages/messagesSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
    conversations: conversationSliceReducer,
    messages: messageSliceReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddlewares) =>
    getDefaultMiddlewares().concat(apiSlice.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
