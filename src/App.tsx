import React, { useEffect, useState } from "react";
import "./styles/App.css";
import PostList from "./components/PostList";
import AddPostForm from "./components/AddPostForm";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import CompletedList from "./components/CompletedList";
import classes from "./components/UI/buttons/DefaultButton.module.css";
import Tests from "./components/Tests";
import { create } from "@mui/material/styles/createTransitions";

interface NewPost {
  title: string;
  text: string;
  rating: number;
  createDate: number;
}

const App: React.FC = () => {
  // создание поста

  let navigate = useNavigate();
  const createPost = (
    event: React.FormEvent,
    title: string,
    text: string,
    createDate: number
  ): void => {
    event.preventDefault();
    navigate("/");
    const form = event.target as HTMLFormElement;
    const newPost = {
      title: title,
      text: text,
      rating: 1,
      createDate: createDate,
    };
    setPosts((prevState) => [...prevState, newPost]);
    form.reset();
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

  return (
    <div className="App">
      <div className="main-head">
        <Link
          className={classes.link}
          to="/">
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
          path="/"
          element={
            <PostList
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
    </div>
  );
};

export default App;
