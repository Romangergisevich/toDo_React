import React, { useEffect, useRef, useState } from "react";
import style from "./RangeRating.module.css";

interface RatingId {
  id: number;
  name: string;
  rating: number;
  updateRating: (e: number) => void;
}

const RangeRating: React.FC<RatingId> = (props) => {
  const [rating, setRating] = useState<number>(props.rating);
  const rate1Ref = useRef<HTMLInputElement>(null);
  const rate2Ref = useRef<HTMLInputElement>(null);
  const rate3Ref = useRef<HTMLInputElement>(null);
  const rate4Ref = useRef<HTMLInputElement>(null);
  const rate5Ref = useRef<HTMLInputElement>(null);

  const changeRating = (e: number): void => {
    setRating(e);
    props.updateRating(e);
  };

  useEffect(() => {
    if (rating === 5 && rate5Ref.current) {
      rate5Ref.current.checked = true;
    }
    if (rating === 4 && rate4Ref.current) {
      rate4Ref.current.checked = true;
    }
    if (rating === 3 && rate3Ref.current) {
      rate3Ref.current.checked = true;
    }
    if (rating === 2 && rate2Ref.current) {
      rate2Ref.current.checked = true;
    }
    if (rating === 1 && rate1Ref.current) {
      rate1Ref.current.checked = true;
    }
  }, [rating]);

  return (
    <div className={style.rating}>
      <input
        value="5"
        ref={rate5Ref}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          changeRating(parseInt(e.target.value, 10))
        }
        name={props.name}
        id={`${props.id}-5`}
        type="radio"
      />
      <label htmlFor={`${props.id}-5`}></label>
      <input
        value="4"
        ref={rate4Ref}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          changeRating(parseInt(e.target.value, 10))
        }
        name={props.name}
        id={`${props.id}-4`}
        type="radio"
      />
      <label htmlFor={`${props.id}-4`}></label>
      <input
        value="3"
        ref={rate3Ref}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          changeRating(parseInt(e.target.value, 10))
        }
        name={props.name}
        id={`${props.id}-3`}
        type="radio"
      />
      <label htmlFor={`${props.id}-3`}></label>
      <input
        value="2"
        ref={rate2Ref}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          changeRating(parseInt(e.target.value, 10))
        }
        name={props.name}
        id={`${props.id}-2`}
        type="radio"
      />
      <label htmlFor={`${props.id}-2`}></label>
      <input
        value="1"
        ref={rate1Ref}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          changeRating(parseInt(e.target.value, 10))
        }
        name={props.name}
        id={`${props.id}-1`}
        type="radio"
      />
      <label htmlFor={`${props.id}-1`}></label>
    </div>
  );
};

export default RangeRating;
