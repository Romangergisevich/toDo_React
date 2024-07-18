import React, { useEffect, useState } from "react";
import DefaultButton from "./UI/buttons/DefaultButton";
import { useAppDispatch, useAppSelector } from "../hooks/tsHooks";
import { RootState } from "../redux/store";
import { addNewSquare, deleteLastSquare } from "../redux/features/SquareStore";
import { SquareArray } from "../redux/features/SquareStore";
import { CSSTransition, TransitionGroup } from "react-transition-group";

const Tests: React.FC = () => {
  const dispatch = useAppDispatch();
  const squareArray = useAppSelector((state: RootState) => state.SquareStore);
  const [squares, setSquares] = useState<SquareArray[]>([]);

  useEffect(() => {
    setSquares([...squareArray]);
  }, [squareArray]);

  const newSquare = () => {
    dispatch(addNewSquare());
  };

  const deleteSquare = () => {
    dispatch(deleteLastSquare());
  };

  return (
    <>
      <div>
        <DefaultButton
          onClick={newSquare}
          className="doneBtn">
          Добавить
        </DefaultButton>
        <DefaultButton
          onClick={deleteSquare}
          className="deleteBtn">
          Удалить
        </DefaultButton>
      </div>
      <div className="square__container">
        <TransitionGroup
          exit={true}
          component={null}>
          {squares.map((e) => {
            return (
              <CSSTransition
                key={e.id}
                classNames="squares"
                timeout={300}>
                <span
                  className="squareDefault"
                  style={{ backgroundColor: `rgb(${e.BGColor})` }}></span>
              </CSSTransition>
            );
          })}
        </TransitionGroup>
      </div>
    </>
  );
};

export default Tests;
