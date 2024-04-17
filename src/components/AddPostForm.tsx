import React, { useState } from "react";
import DefaultButton from "./UI/buttons/DefaultButton";

interface FunctionsProps {
  createPost: (
    event: React.FormEvent,
    title: string,
    text: string,
    createDate: number
  ) => void;
}

const AddPostForm: React.FC<FunctionsProps> = (props) => {
  const [postTitle, setPostTitle] = useState<string>("");
  const [postText, setPostText] = useState<string>("");

  const createNewPost = (event: React.FormEvent) => {
    event.preventDefault();
    const newPostDate = Date.now();
    if (postTitle && postText)
      props.createPost(event, postTitle, postText, newPostDate);
  };

  const postTitleCreate = (event: React.SyntheticEvent): void => {
    event.preventDefault();
    const target = event.target as HTMLInputElement;
    setPostTitle(target.value);
  };

  const postTextCreate = (event: React.SyntheticEvent): void => {
    event.preventDefault();
    const target = event.target as HTMLInputElement;
    setPostText(target.value);
  };

  return (
    <>
      <h1>Create new Task</h1>
      <div className="post-form">
        <form
          onSubmit={createNewPost}
          id="addPostId">
          <input
            required
            onInput={postTitleCreate}
            className="post-form__input"
            placeholder="Post title"
            type="search"
          />
          <textarea
            required
            onInput={postTextCreate}
            className="post-form__input"
            placeholder="Post text"
          />
          <div className="post-form__buttons">
            <DefaultButton
              className="submitBtn"
              ButtonType="submit">
              Create task
            </DefaultButton>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddPostForm;
