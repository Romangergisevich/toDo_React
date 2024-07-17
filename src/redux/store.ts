import { configureStore } from "@reduxjs/toolkit";
import counter from "./features/counter";
import isDataSaved from "./features/isDataSaved";
import SquareStore from "./features/SquareStore";

export const store = configureStore({
  reducer: {
    counter,
    isDataSaved,
    SquareStore,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof configureStore>;
export type AppDispatch = typeof store.dispatch;
