import React, { useState } from "react";
import DefaultButton from "../components/UI/buttons/DefaultButton";

interface PostState {
  count: number;
  title: string;
  text: string;
  deletePost: (title: string, text: string) => void;
}

const PostItem: React.FC<PostState> = (props) => {
  const [state, setState] = useState<PostState>({
    count: props.count,
    title: props.title,
    text: props.text,
    deletePost: props.deletePost,
  });

  const handleDelete = (): void => {
    state.deletePost(state.title, state.text);
  };

  return (
    <div className="post">
      <div className="post__content">
        <strong>
          {state.count}. {state.title}
        </strong>
        <div className="post__content-text">{state.text}</div>
      </div>
      <div className="post__btns">
        <DefaultButton className={"doneBtn"}>Done</DefaultButton>
        <DefaultButton
          className={"deleteBtn"}
          onClick={handleDelete}>
          Delete
        </DefaultButton>
      </div>
    </div>
  );
};

export default PostItem;
