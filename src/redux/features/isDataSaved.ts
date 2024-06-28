import { createSlice } from "@reduxjs/toolkit";

export interface isDataSavedState {
  isBlocked: boolean;
}

const initialState: isDataSavedState = {
  isBlocked: true,
};

export const isDataSaved = createSlice({
  name: "isDataSaved",
  initialState,
  reducers: {
    blockStatusFalse: (state) => {
      state.isBlocked = false;
    },
    blockStatusTrue: (state) => {
      state.isBlocked = true;
    },
  },
});

export const { blockStatusFalse, blockStatusTrue } = isDataSaved.actions;
export default isDataSaved.reducer;
