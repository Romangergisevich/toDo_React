import React, { useState } from "react";
import classes from "./DefaultButton.module.css";

interface ButtonValues {
  className: string;
  ButtonType?: "submit" | "reset" | "button" | undefined;
  children?: string;
  handleDelete?: () => void;
  taskIsDone?: () => void;
}

const DefaultButton: React.FC<ButtonValues> = (props) => {
  const [btnClass, setBtnClass] = useState<string>(props.className);

  return (
    <>
      <button
        onClick={props.handleDelete ? props.handleDelete : props.taskIsDone}
        className={classes[btnClass]}
        type={props.ButtonType ? props.ButtonType : "button"}>
        {props.children ? props.children : "Default button"}
      </button>
    </>
  );
};

export default DefaultButton;
