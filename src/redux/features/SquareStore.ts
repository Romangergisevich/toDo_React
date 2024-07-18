import { createSlice } from "@reduxjs/toolkit";
import uuid from "react-uuid";

export interface SquareArray {
  BGColor: string;
  id: string;
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
          ${Math.floor(Math.random() * 255)} 
          ${Math.floor(Math.random() * 255)} 
          ${Math.floor(Math.random() * 255)}
          `,
          id: uuid(),
        },
        ...state,
      ];
    },
    deleteLastSquare: (state) => {
      return state.slice(0, -1);
    },
  },
});

export const { addNewSquare, deleteLastSquare } = SquareStore.actions;
export default SquareStore.reducer;
