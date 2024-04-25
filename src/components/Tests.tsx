import React, { useState } from "react";
import DefaultButton from "./UI/buttons/DefaultButton";

const Tests: React.FC = (props) => {
  const [colored, setColored] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);

  const plus = () => {
    setCount((prev) => prev + 1);
  };

  const minus = () => {
    if (count >= 1) {
      setCount((prev) => prev - 1);
    }
    return;
  };

  const colorChange = () => {
    setColored((prev) => !prev);
  };

  const blockStyle = {
    display: "flex",
    alignIems: "center",
    justifyContent: "space-around",
    fontSize: 20,
    fontWeight: 600,
    color: colored ? "darkred" : "#ffffff",
  };

  return (
    <>
      <div>
        <div style={blockStyle}>{count}</div>
        <DefaultButton
          onClickFunc={minus}
          className="submitBtn">
          minus
        </DefaultButton>
        <DefaultButton
          onClickFunc={plus}
          className="submitBtn">
          plus
        </DefaultButton>
      </div>
      <DefaultButton
        onClickFunc={colorChange}
        className="submitBtn">
        color change
      </DefaultButton>
    </>
  );
};

export default Tests;
