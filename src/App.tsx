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

  const [posts, setPosts] = useState<Post[]>([
    {
      title: "Javascript",
      text: "JS - programming language",
    },
    {
      title: "Python",
      text: "Python - programming language",
    },
  ]);

  const [completed, setCompleted] = useState<Post[]>([
    {
      title: "Javascript",
      text: "JS - programming language",
    },
    {
      title: "Python",
      text: "Python - programming language",
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
          New Post
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
            />
          }
        />
        <Route
          path="/comletedTasks"
          element={
            <CompletedList
              postArr={completed}
              deletePost={deleteComleted}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
