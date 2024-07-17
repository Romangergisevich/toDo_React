import React, { useState, useEffect } from "react";
import DefaultButton from "./UI/buttons/DefaultButton";
import styles from "./Tests.module.css";
import { useAppDispatch, useAppSelector } from "../hooks/tsHooks";
import { addNewSquare, deleteLastSquare } from "../redux/features/SquareStore";
import { RootState } from "../redux/store";
import { SquareArray } from "../redux/features/SquareStore";
import { Transition } from "react-transition-group";

const Tests: React.FC = () => {
  const squareArray = useAppSelector((state: RootState) => state.SquareStore);
  const dispatch = useAppDispatch();
  const [coloredSquares, setColoredSquares] = useState<SquareArray[]>([]);

  useEffect(() => {
    setColoredSquares(() => [...squareArray]);
  }, [squareArray]);

  const addNew = () => {
    dispatch(addNewSquare());
    console.log(coloredSquares);
  };

  const deletLast = () => {
    dispatch(deleteLastSquare());
    console.log(coloredSquares);
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
        {coloredSquares.map((e) => {
          return (
            <span
              key={e.BGColor}
              className={styles.squqre_child}
              style={{ backgroundColor: `rgb(${e.BGColor})` }}></span>
          );
        })}
      </div>
    </>
  );
};

export default Tests;
