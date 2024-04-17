import React, { useEffect, useState } from "react";
import DefaultButton from "../components/UI/buttons/DefaultButton";

interface PostState {
  count: number;
  title: string;
  text: string;
  myParent: string;
  createDate: number;
  deletePost: (title: string, text: string) => void;
  taskIsDone: (title: string, text: string, createDate: number) => void;
}

interface PostItemsStates {
  count: number;
  title: string;
  text: string;
  myParent: string;
  createDate: number;
  dateDifference: string;
  deletePost: (title: string, text: string) => void;
  taskIsDone: (title: string, text: string, createDate: number) => void;
}

const PostItem: React.FC<PostState> = (props) => {
  const [state, setState] = useState<PostItemsStates>({
    count: props.count,
    title: props.title,
    text: props.text,
    myParent: props.myParent,
    createDate: props.createDate,
    dateDifference: getDateTimeDifference(props.createDate, Date.now()),
    deletePost: props.deletePost,
    taskIsDone: props.taskIsDone,
  });

  function getDateTimeDifference(date1: number, date2: number): string {
    const diff = Math.abs(date1 - date2) / 1000;
    const hours = String(Math.floor(diff / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((diff % 3600) / 60)).padStart(2, "0");
    const seconds = String(Math.floor(diff % 60)).padStart(2, "0");

    return `${hours} : ${minutes} : ${seconds}`;
  }
  useEffect(() => {
    setInterval(() => {
      setState((prevState) => ({
        ...prevState,
        dateDifference: getDateTimeDifference(state.createDate, Date.now()),
      }));
    }, 1000);
  }, []);

  const handleDelete = (): void => {
    state.deletePost(state.title, state.text);
  };

  const taskIsDone = (): void => {
    state.taskIsDone(state.title, state.text, state.createDate);
  };

  return (
    <div className="post">
      <div className="post-mainBlock">
        <div className="post__content">
          <strong>
            {state.count}. {state.title}
          </strong>
          <div className="post__content-text">{state.text}</div>
        </div>
        <div className="post__btns">
          {state.myParent == "ToDo" && (
            <DefaultButton
              className={"doneBtn"}
              taskIsDone={taskIsDone}>
              Done
            </DefaultButton>
          )}
          <DefaultButton
            className={"deleteBtn"}
            handleDelete={handleDelete}
            taskIsDone={taskIsDone}>
            Delete
          </DefaultButton>
        </div>
      </div>
      {props.myParent == "ToDo" && (
        <span className="post-timer">{state.dateDifference}</span>
      )}
    </div>
  );
};

export default PostItem;
