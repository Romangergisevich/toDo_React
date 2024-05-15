import React from "react";
import style from "./RangeRating.module.css";

interface RatingId {
  id: string;
  name: string;
}

const rangeLog = (event: React.ChangeEvent<HTMLInputElement>) => {
  console.log(event.target.value);
};

const RangeRating: React.FC<RatingId> = (props) => {
  document.querySelectorAll(`${props.name}`).forEach((e) => {
    console.log(e);
  });

  return (
    <div className={style.rating}>
      <input
        value="5"
        name={props.name}
        id={`${props.id}-5`}
        type="radio"
      />
      <label htmlFor={`${props.id}-5`}></label>
      <input
        value="4"
        name={props.name}
        id={`${props.id}-4`}
        type="radio"
      />
      <label htmlFor={`${props.id}-4`}></label>
      <input
        value="3"
        name={props.name}
        id={`${props.id}-3`}
        type="radio"
      />
      <label htmlFor={`${props.id}-3`}></label>
      <input
        value="2"
        name={props.name}
        id={`${props.id}-2`}
        type="radio"
      />
      <label htmlFor={`${props.id}-2`}></label>
      <input
        value="1"
        name={props.name}
        id={`${props.id}-1`}
        type="radio"
      />
      <label htmlFor={`${props.id}-1`}></label>
    </div>
  );
};

export default RangeRating;
