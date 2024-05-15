import React, { useState } from "react";
import DefaultButton from "../components/UI/buttons/DefaultButton";
import Timer from "./Timer";
import RangeRating from "./UI/rating/RangeRating";

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
    deletePost: props.deletePost,
    taskIsDone: props.taskIsDone,
  });

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
              onClickFunc={taskIsDone}>
              Done
            </DefaultButton>
          )}
          <DefaultButton
            className={"deleteBtn"}
            onClickFunc={handleDelete}>
            Delete
          </DefaultButton>
          <RangeRating
            id={state.title}
            name={state.title}
          />
        </div>
      </div>
      {props.myParent == "ToDo" && <Timer createDate={props.createDate} />}
    </div>
  );
};

export default PostItem;
