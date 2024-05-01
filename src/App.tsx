import React, { useEffect, useState } from "react";
import "./styles/App.css";
import PostList from "./components/PostList";
import AddPostForm from "./components/AddPostForm";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import CompletedList from "./components/CompletedList";
import classes from "./components/UI/buttons/DefaultButton.module.css";
import Tests from "./components/Tests";

interface Post {
  title: string;
  text: string;
  createDate: number;
}

const App: React.FC = () => {
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
      createDate: createDate,
    };
    setPosts((prevState) => [...prevState, newPost]);
    form.reset();
  };

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

  const taskIsDone = (
    title: string,
    text: string,
    createDate: number
  ): void => {
    const completedTask = {
      title: title,
      text: text,
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

  const getLocalStorage = (key: string, initialValue: any): Post[] => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  };

  const [toDo, setPosts] = useState<Post[]>(getLocalStorage("toDo", []));

  const [completed, setCompleted] = useState<Post[]>(
    getLocalStorage("completed", [])
  );

  useEffect(() => {
    localStorage.setItem("toDo", JSON.stringify(toDo));
  }, [toDo]);

  useEffect(() => {
    localStorage.setItem("completed", JSON.stringify(completed));
  }, [completed]);

  var location = useLocation();

  useEffect(() => {
    const oroginalTitle: string = document.title;
    var isFlash: Boolean = false;
    const titleSwap = (): void => {
      document.title = isFlash ? `${toDo.length} tasks` : oroginalTitle;
      isFlash = !isFlash;
    };

    let titleSwapInterval: number = 0;

    if (location.pathname === "/") {
      titleSwapInterval = setInterval(titleSwap, 2000);
    }
    return () => {
      document.title = oroginalTitle;
      clearInterval(titleSwapInterval);
    };
  }, [location.pathname]);

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
              postArr={toDo}
              listTitle={"Tasks ToDo"}
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
