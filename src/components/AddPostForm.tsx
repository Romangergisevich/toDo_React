import React, { useEffect, useState } from "react";
import DefaultButton from "./UI/buttons/DefaultButton";
import TextInput from "./UI/inputs/TextInput";
import TextArea from "./UI/inputs/TextArea";
import { useAppDispatch } from "../hooks/tsHooks";
import {
  blockStatusFalse,
  blockStatusTrue,
} from "../redux/features/isDataSaved";

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
  const dispatch = useAppDispatch();

  const blockStatus = () => {
    if (postTitle.length < 1 && postText.length < 1) {
      dispatch(blockStatusFalse());
    } else {
      dispatch(blockStatusTrue());
    }
  };

  useEffect(() => {
    blockStatus();
  }, [postTitle, postText]);

  const createNewPost = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(blockStatusFalse());
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
          <TextInput
            required={true}
            inputId="postTitle"
            placeholder="Post title"
            onInputFunc={postTitleCreate}
          />
          <TextArea
            required={true}
            textAreaId={"postText"}
            placeholder="Post text"
            onInputFunc={postTextCreate}
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
