import React, { useState, useEffect, useRef, createRef } from "react";
import DefaultButton from "./UI/buttons/DefaultButton";
import styles from "./Tests.module.css";
import { useAppDispatch, useAppSelector } from "../hooks/tsHooks";
import {
  addNewSquare,
  deleteLastSquare,
  toggleSquareState,
} from "../redux/features/SquareStore";
import { RootState } from "../redux/store";
import { SquareArray } from "../redux/features/SquareStore";
import { CSSTransition } from "react-transition-group";

const Tests: React.FC = () => {
  const squareArray = useAppSelector((state: RootState) => state.SquareStore);
  const dispatch = useAppDispatch();
  const [coloredSquares, setColoredSquares] = useState<SquareArray[]>([]);
  const squareRefs = useRef<Array<React.RefObject<HTMLSpanElement>>>(
    Array.from({ length: squareArray.length }, () => createRef())
  );

  useEffect(() => {
    setColoredSquares([...squareArray]);
  }, [squareArray]);

  const addNew = () => {
    dispatch(addNewSquare());
  };

  const deletLast = () => {
    dispatch(toggleSquareState());
    setTimeout(() => {
      dispatch(deleteLastSquare());
      setColoredSquares([...squareArray]);
    }, 300);
  };

  return (
    <>
      <div>
        <DefaultButton
          onClickFunc={addNew}
          className="doneBtn">
          Добавить
        </DefaultButton>
        <DefaultButton
          onClickFunc={deletLast}
          className="deleteBtn">
          Удалить
        </DefaultButton>
      </div>
      <div className={styles.square__Parrent}>
        {coloredSquares.map((e, index) => (
          <CSSTransition
            unmountOnExit
            in={!e.delete}
            classNames="my-node"
            timeout={300}
            key={index}>
            <span
              ref={squareRefs.current[index]}
              className={styles.squqre_child}
              style={{ backgroundColor: `rgb(${e.BGColor})` }}></span>
          </CSSTransition>
        ))}
      </div>
    </>
  );
};

export default Tests;
