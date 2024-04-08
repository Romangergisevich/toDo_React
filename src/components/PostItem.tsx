import React, { useState } from "react";

interface PostState {
  count: number;
  title: string;
  text: string;
}

const PostItem: React.FC<PostState> = (props) => {
  const [state, setState] = useState<PostState>({
    count: props.count,
    title: props.title,
    text: props.text,
  });

  const plusOne = () => {
    setState((prevState) => ({
      ...prevState,
      count: prevState.count + 1,
    }));
  };

  return (
    <div className="post">
      <div className="post__content">
        <strong>
          {state.count} {state.title}
        </strong>
        <div>{state.text}</div>
      </div>
      <div className="post__btns">
        <button
          onClick={plusOne}
          type="button">
          Delete
        </button>
      </div>
    </div>
  );
};

export default PostItem;
