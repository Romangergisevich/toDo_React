import React from "react";
import { RootState } from "../redux/store";
import { useAppSelector, useAppDispatch } from "../hooks/tsHooks";
import { increase, decrease } from "../redux/features/counter";

const Tests: React.FC = (props) => {
  const count = useAppSelector((state: RootState) => state.counter.value);
  const dispatch = useAppDispatch();

  const style = {
    padding: "10px",
    width: "100px",
    margin: "15px",
    lineHeight: "20x",
    borderRadius: "10px",
    cursor: "pointer",
  };

  return (
    <>
      Ready for new tests
      <h2>{count}</h2>
      <button
        onClick={() => dispatch(increase())}
        style={style}>
        +
      </button>
      <button
        onClick={() => dispatch(decrease())}
        style={style}>
        -
      </button>
    </>
  );
};

export default Tests;
