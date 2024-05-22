import React, { useEffect, useRef, useState } from "react";
import style from "./TextInput.module.css";

interface InputAttributes {
  placeholder: string;
  inputId: number | string;
  required?: boolean;
  reservedValue?: string;
  type?: string;
  onInputFunc?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: React.FC<InputAttributes> = (props) => {
  const labelRef = useRef<HTMLLabelElement>(null);
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    if (props.reservedValue) {
      labelRef.current?.classList.add(style.userLabelActive);
    }
  }, [props.reservedValue]);

  return (
    <div className={style.inputGroup}>
      <input
        value={props.reservedValue}
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
        type={props.type ? props.type : "text"}
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
