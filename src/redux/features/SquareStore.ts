import { createSlice } from "@reduxjs/toolkit";

export interface SquareArray {
  BGColor: string;
}

const initialState: SquareArray[] = [];

export const SquareStore = createSlice({
  name: "SquareStore",
  initialState,
  reducers: {
    addNewSquare: (state) => {
      return [
        ...state,
        {
          BGColor: `${Math.floor(Math.random() * 999)} ${Math.floor(
            Math.random() * 999
          )} ${Math.floor(Math.random() * 999)}`,
        },
      ];
    },

    deleteLastSquare: (state) => {
      return state.slice(0, -1);
    },
  },
});

export const { addNewSquare, deleteLastSquare } = SquareStore.actions;
export default SquareStore.reducer;
