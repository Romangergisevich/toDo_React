import React, { useRef, useState } from "react";
import style from "./TextInput.module.css";

interface InputAttributes {
  placeholder: string;
  inputId: number | string;
  required?: boolean;
}

const TextInput: React.FC<InputAttributes> = (props) => {
  const labelRef = useRef(null);
  const [isActive, setIsActive] = useState(false);

  const isInputFilledCSS = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.value.length > 0) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  };

  return (
    <div className={style.inputGroup}>
      <input
        id={`${props.inputId}`}
        onInput={isInputFilledCSS}
        required={props.required ? props.required : false}
        className={style.textInput}
        type="text"
      />
      <label
        ref={labelRef}
        className={
          !isActive
            ? style.userLabel
            : `${style.userLabel} ${style.userLabelActive}`
        }
        htmlFor={`${props.inputId}`}>
        {props.placeholder}
      </label>
    </div>
  );
};

export default TextInput;
