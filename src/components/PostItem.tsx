import React, { useState, ChangeEvent, FormEvent } from "react";
import DefaultButton from "../components/UI/buttons/DefaultButton";
import Timer from "./Timer";
import RangeRating from "./UI/rating/RangeRating";
import EditButton from "./UI/buttons/EdditButton";
// modal parts
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextInput from "./UI/inputs/TextInput";
import TextArea from "./UI/inputs/TextArea";

interface PostState {
  count: number;
  title: string;
  text: string;
  rating: number;
  myParent: string;
  createDate: number;
  postUpdate: (createDate: number, newTitle: string, newText: string) => void;
  updateRating: (createDate: number, newRating: number) => void;
  deletePost: (title: string, text: string) => void;
  taskIsDone: (title: string, text: string, createDate: number) => void;
}

interface PostItemsStates {
  count: number;
  title: string;
  text: string;
  newTitle: string;
  newText: string;
  rating: number;
  myParent: string;
  createDate: number;
  updateRating: (createDate: number, newRating: number) => void;
  deletePost: (title: string, text: string) => void;
  taskIsDone: (title: string, text: string, createDate: number) => void;
}

const PostItem: React.FC<PostState> = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [state, setState] = useState<PostItemsStates>({
    count: props.count,
    title: props.title,
    text: props.text,
    newTitle: props.title,
    newText: props.text,
    rating: props.rating,
    myParent: props.myParent,
    createDate: props.createDate,
    updateRating: props.updateRating,
    deletePost: props.deletePost,
    taskIsDone: props.taskIsDone,
  });

  const taskRatngUpdate = (e: number) => {
    props.updateRating(state.createDate, e);
  };

  const handleDelete = (): void => {
    state.deletePost(state.title, state.text);
  };

  const taskIsDone = (): void => {
    state.taskIsDone(state.title, state.text, state.createDate);
  };

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "40%",
    bgcolor: "#242424",
    border: "1px solid teal",
    borderRadius: "8px",
    boxShadow: 24,
    p: 4,
  };

  const titleEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, newTitle: e.target.value }));
  };

  const textEdit = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setState((prev) => ({ ...prev, newText: e.target.value }));
  };

  const postEdit = () => {
    props.postUpdate(state.createDate, state.newTitle, state.newText);
    setState((prev) => ({
      ...prev,
      text: state.newText,
      title: state.newTitle,
    }));
    handleClose();
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
          {state.myParent == "ToDo" && (
            <RangeRating
              id={props.createDate}
              name={`${state.title}-${props.createDate}`}
              rating={state.rating}
              updateRating={taskRatngUpdate}
            />
          )}
        </div>
      </div>
      {props.myParent == "ToDo" && (
        <>
          <Timer createDate={props.createDate} />
          <EditButton onClickFunc={handleOpen} />
        </>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography
            style={{ display: "flex", justifyContent: "space-around" }}
            id="modal-modal-title"
            variant="h4"
            component="h2">
            Edit post
          </Typography>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <TextInput
              onInputFunc={titleEdit}
              reservedValue={state.newTitle}
              inputId={`${props.createDate}-title`}
              placeholder="New title"
            />
            <TextArea
              onInputFunc={textEdit}
              reservedValue={state.newText}
              textAreaId={`${props.createDate}-text`}
              placeholder="New Text"
            />
            <div
              style={{
                display: "flex",
                justifyContent: "end",
                marginRight: "-5px",
              }}>
              <DefaultButton
                onClickFunc={postEdit}
                className="doneBtn">
                Save
              </DefaultButton>
              <DefaultButton
                onClickFunc={handleClose}
                className="deleteBtn">
                Close
              </DefaultButton>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default PostItem;
