import React, { useState } from "react";

interface FunctionsProps {
  createPost: (event: React.FormEvent, title: string, text: string) => void;
}

const AddPostForm: React.FC<FunctionsProps> = (props) => {
  const [postTitle, setPostTitle] = useState<string>("");
  const [postText, setPostText] = useState<string>("");

  const createNewPost = (event: React.FormEvent) => {
    event.preventDefault();
    if (postTitle && postText) {
      props.createPost(event, postTitle, postText);
    } else {
      alert("You need to fill text inputs");
    }
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
    <div className="post-form">
      <form
        onSubmit={createNewPost}
        id="addPostId">
        <input
          onInput={postTitleCreate}
          className="post-form__input"
          placeholder="Post title"
          type="search"
        />
        <input
          onInput={postTextCreate}
          className="post-form__input"
          placeholder="Post text"
          type="search"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddPostForm;
