import { createSlice } from "@reduxjs/toolkit";

export interface isDataSavedState {
  isBlocked: boolean;
}

const initialState: isDataSavedState = {
  isBlocked: false,
};

export const isDataSaved = createSlice({
  name: "isDataSaved",
  initialState,
  reducers: {
    changeDataStatus: (state, action) => {
      if (action.payload.length > 0) {
        state.isBlocked = true;
        console.log(state.isBlocked);
      } else {
        state.isBlocked = false;
        console.log(state.isBlocked);
      }
    },
    submitForm: (state) => {
      state.isBlocked = false;
      console.log(state.isBlocked);
    },
  },
});

export const { changeDataStatus, submitForm } = isDataSaved.actions;
export default isDataSaved.reducer;
