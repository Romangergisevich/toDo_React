import React, { useEffect, useState } from "react";
import "./styles/App.css";
import PostList from "./components/PostList";
import AddPostForm from "./components/AddPostForm";
import { Routes, Route, Link, useBlocker } from "react-router-dom";
import CompletedList from "./components/CompletedList";
import classes from "./components/UI/buttons/DefaultButton.module.css";
import Tests from "./components/Tests";
import Snackbar from "@mui/material/Snackbar";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import Alert from "@mui/material/Alert";
import { useAppSelector } from "./hooks/tsHooks";
import { RootState } from "./redux/store";
import { useAppDispatch } from "./hooks/tsHooks";
import { blockStatusFalse } from "./redux/features/isDataSaved";

interface NewPost {
  title: string;
  text: string;
  rating: number;
  createDate: number;
}

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  //blockRouting

  const dataStatus = useAppSelector((state: RootState) => state.isDataSaved);
  const blocker = useBlocker(dataStatus.isBlocked);

  useEffect(() => {
    if (blocker.state === "blocked")
      if (
        window.confirm(
          "Несохраненные данные могут быть утеряны. Вы уверены что хотите покинуть страницу?"
        )
      ) {
        dispatch(blockStatusFalse());
        blocker.proceed();
      } else {
        blocker.reset();
      }
  }, [blocker.state]);

  // snackbar

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    text: string;
    Transition: React.ComponentType<
      TransitionProps & {
        children: React.ReactElement<any, any>;
      }
    >;
  }>({
    open: false,
    text: "success",
    Transition: Slide,
  });

  const handleClose = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };

  // создание поста

  const createPost = (
    event: React.FormEvent,
    title: string,
    text: string,
    createDate: number
  ): void => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const newPost = {
      title: title,
      text: text,
      rating: 1,
      createDate: createDate,
    };
    setPosts((prevState) => [...prevState, newPost]);
    form.reset();
    setSnackbar({
      open: true,
      text: "New task is created!",
      Transition: Slide,
    });
  };

  // удаление поста

  const deletePost = (title: string, text: string): void => {
    setPosts((prevState) =>
      prevState.filter(
        (p) =>
          p.title.toLowerCase().split(" ").join() !=
            title.toLowerCase().split(" ").join() ||
          p.text.toLowerCase().split(" ").join() !=
            text.toLowerCase().split(" ").join()
      )
    );
    setSnackbar({
      open: true,
      text: "Post was deleted.",
      Transition: Slide,
    });
  };

  // удаление выполненного поста

  const deleteComleted = (title: string, text: string): void => {
    setCompleted((prevState) =>
      prevState.filter(
        (p) =>
          p.title.toLowerCase().split(" ").join() !=
            title.toLowerCase().split(" ").join() ||
          p.text.toLowerCase().split(" ").join() !=
            text.toLowerCase().split(" ").join()
      )
    );
    setSnackbar({
      open: true,
      text: "Post was deleted.",
      Transition: Slide,
    });
  };

  // перенос выполненног поста в "выполненное"

  const taskIsDone = (
    title: string,
    text: string,
    createDate: number
  ): void => {
    const completedTask = {
      title: title,
      text: text,
      rating: 0,
      createDate: createDate,
    };

    setPosts((prevState) =>
      prevState.filter(
        (p) =>
          p.title.toLowerCase().split(" ").join() !=
            title.toLowerCase().split(" ").join() ||
          p.text.toLowerCase().split(" ").join() !=
            text.toLowerCase().split(" ").join()
      )
    );
    setCompleted((prevState) => prevState.concat(completedTask));
    setSnackbar({
      open: true,
      text: "Task is done!",
      Transition: Slide,
    });
  };

  // изменение поста

  const updateRating = (createDate: number, newRating: number) => {
    setPosts((prevState) =>
      prevState
        .map((p) =>
          p.createDate === createDate ? { ...p, rating: newRating } : p
        )
        .sort((a, b) => b.rating - a.rating)
    );
    setSnackbar({
      open: true,
      text: "Rating was changed.",
      Transition: Slide,
    });
  };

  const postUpdate = (
    createDate: number,
    newTitle: string,
    newText: string
  ) => {
    setPosts((prevState) =>
      prevState.map((p) =>
        p.createDate === createDate
          ? { ...p, title: newTitle, text: newText }
          : p
      )
    );
    setSnackbar({
      open: true,
      text: "Changes was saved.",
      Transition: Slide,
    });
  };

  // получение постов из LS

  const getLocalStorage = (key: string, initialValue: any): NewPost[] => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  };

  // получение постов "к выполнению"

  const [posts, setPosts] = useState<NewPost[]>(getLocalStorage("toDo", []));

  // получение выполненных постов

  const [completed, setCompleted] = useState<NewPost[]>(
    getLocalStorage("completed", [])
  );

  // обновление значений LS

  useEffect(() => {
    localStorage.setItem("toDo", JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem("completed", JSON.stringify(completed));
  }, [completed]);

  // Сортировка PostList

  const [sortReverse, setSortReverse] = useState(true);

  useEffect(
    () =>
      setPosts((prevState) =>
        [...prevState].sort((a, b) => b.rating - a.rating)
      ),
    []
  );

  const sortByFunc = (variant: number, snackbarTitle: string) => {
    if (variant == 1) {
      switch (sortReverse) {
        case false:
          setPosts((prevState) =>
            [...prevState].sort((a, b) => b.rating - a.rating)
          );
          break;
        case true:
          setPosts((prevState) =>
            [...prevState].sort((a, b) => a.rating - b.rating)
          );
          break;
      }
    } else if (variant == 2) {
      switch (sortReverse) {
        case false:
          setPosts((prevState) =>
            [...prevState].sort((a, b) => b.createDate - a.createDate)
          );
          break;
        case true:
          setPosts((prevState) =>
            [...prevState].sort((a, b) => a.createDate - b.createDate)
          );
          break;
      }
    }
    setSortReverse(() => !sortReverse);
    setSnackbar({
      open: true,
      text: `Sorted by ${snackbarTitle}`,
      Transition: Slide,
    });
  };

  return (
    <div className="App">
      <div className="main-head">
        <Link
          className={classes.link}
          to="*">
          ToDo
        </Link>
        <Link
          className={classes.link}
          to="/comletedTasks">
          Completed
        </Link>
        <Link
          className={classes.link}
          to="/newPost">
          New Task
        </Link>
        <Link
          className={classes.link}
          to="/tests">
          Tests
        </Link>
      </div>
      <Routes>
        <Route
          path="/newPost"
          element={<AddPostForm createPost={createPost} />}
        />
        <Route
          path="*"
          element={
            <PostList
              sortFunc={sortByFunc}
              postArr={posts}
              listTitle={"Tasks ToDo"}
              updatePost={postUpdate}
              updateRating={updateRating}
              deletePost={deletePost}
              taskIsDone={taskIsDone}
            />
          }
        />
        <Route
          path="/comletedTasks"
          element={
            <CompletedList
              postArr={completed}
              updatePost={postUpdate}
              updateRating={updateRating}
              deletePost={deleteComleted}
              taskIsDone={taskIsDone}
            />
          }
        />
        <Route
          path="/tests"
          element={<Tests />}
        />
      </Routes>
      <Snackbar
        open={snackbar.open}
        onClose={handleClose}
        TransitionComponent={snackbar.Transition}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        key={snackbar.Transition.name}
        autoHideDuration={2000}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}>
          {snackbar.text}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default App;
