import { createSlice } from "@reduxjs/toolkit";

export interface SquareArray {
  BGColor: string;
  show: boolean;
  delete: boolean;
}

const initialState: SquareArray[] = [];

export const SquareStore = createSlice({
  name: "SquareStore",
  initialState,
  reducers: {
    addNewSquare: (state) => {
      return [
        {
          BGColor: `
          ${Math.floor(Math.random() * 999)} 
          ${Math.floor(Math.random() * 999)} 
          ${Math.floor(Math.random() * 999)}
          `,
          show: true,
          delete: false,
        },
        ...state,
      ];
    },

    deleteLastSquare: (state) => {
      return state.slice(0, -1);
    },

    toggleSquareState: (state) => {
      state[state.length - 1].show = false;
      state[state.length - 1].delete = true;
    },
  },
});

export const { addNewSquare, deleteLastSquare, toggleSquareState } =
  SquareStore.actions;
export default SquareStore.reducer;
