import React, { useState } from "react";
import "./styles/App.css";
import PostList from "./components/PostList";
import AddPostForm from "./components/AddPostForm";
import { Routes, Route, Link } from "react-router-dom";
import CompletedList from "./components/CompletedList";
import classes from "./components/UI/buttons/DefaultButton.module.css";

interface Post {
  title: string;
  text: string;
}

const App: React.FC = () => {
  const createPost = (
    event: React.FormEvent,
    title: string,
    text: string
  ): void => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const newPost = {
      title: title,
      text: text,
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

  const taskIsDone = (title: string, text: string): void => {
    const completedTask = {
      title: title,
      text: text,
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

  const [posts, setPosts] = useState<Post[]>([
    {
      title: "Task",
      text: "random task",
    },
    {
      title: "Task",
      text: "learn english lang",
    },
  ]);

  const [completed, setCompleted] = useState<Post[]>([
    {
      title: "Task",
      text: "Learn react",
    },
    {
      title: "Task",
      text: "Learn react router",
    },
  ]);

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
      </Routes>
    </div>
  );
};

export default App;
