import React, { useRef, useState } from "react";
import style from "./TextInput.module.css";

interface InputAttributes {
  placeholder: string;
  inputId: number | string;
  required?: boolean;
  onInputFunc?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: React.FC<InputAttributes> = (props) => {
  const labelRef = useRef<HTMLLabelElement>(null);
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <div className={style.inputGroup}>
      <input
        id={`${props.inputId}`}
        onInput={props.onInputFunc}
        onChange={(e) =>
          e.target.value.length < 0 ? setIsActive(false) : setIsActive(true)
        }
        onFocus={() => setIsActive(true)}
        onBlur={(e) =>
          e.target.value.length < 1 ? setIsActive(false) : setIsActive(true)
        }
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
