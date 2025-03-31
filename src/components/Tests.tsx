import React, { useEffect, useState } from "react";
import DefaultButton from "./UI/buttons/DefaultButton";
import { useAppDispatch, useAppSelector } from "../hooks/tsHooks";
import { RootState } from "../redux/store";
import { addNewSquare, deleteLastSquare } from "../redux/features/SquareStore";
import { SquareArray } from "../redux/features/SquareStore";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import styles from './Tests.module.css'

const Tests: React.FC = () => {
  const dispatch = useAppDispatch();
  const squareArray = useAppSelector((state: RootState) => state.SquareStore);
  const [squares, setSquares] = useState<SquareArray[]>([]);
  const [squarePage, setSquarePage] = useState<boolean>(true)

  const goToSquares = () => {
    setSquarePage(true)
  }

  const goToEmpty = () => {
    setSquarePage(false)
  }
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
      <div className={styles.sublinks__container}>
        <DefaultButton onClick={goToSquares} className='link'>Squares</DefaultButton>
        <DefaultButton onClick={goToEmpty} className='link'>Empty</DefaultButton>
      </div>
      {squarePage ?
        <div className={styles.squares__container}>
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
        </div>
        :
        <div>Nothing</div>
      }
    </>
  );
};

export default Tests;
