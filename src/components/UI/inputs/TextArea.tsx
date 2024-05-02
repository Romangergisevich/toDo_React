import React, { useRef, useState } from "react";
import style from "./TextArea.module.css";

interface TextAreaAttributes {
  placeholder: string;
  textAreaId: number | string;
  required?: boolean;
  onInputFunc?: React.FormEventHandler<HTMLTextAreaElement>;
}

const TextArea: React.FC<TextAreaAttributes> = (props) => {
  const labelRef = useRef<HTMLLabelElement>(null);
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <div className={style.textAreaGroup}>
      <textarea
        id={`${props.textAreaId}`}
        className={style.textAreaInput}
        required={props.required ? props.required : false}
        onInput={props.onInputFunc}
        onFocus={() => setIsActive(true)}
        onBlur={(e) =>
          e.target.value.length < 1 ? setIsActive(false) : setIsActive(true)
        }></textarea>
      <label
        ref={labelRef}
        className={
          !isActive
            ? style.textAreaUserLabel
            : `${style.textAreaUserLabel} ${style.textAreaUserLabelActive}`
        }
        htmlFor={`${props.textAreaId}`}>
        {props.placeholder}
      </label>
    </div>
  );
};

export default TextArea;
