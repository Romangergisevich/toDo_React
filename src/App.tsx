import React, { useState } from "react";
import "./styles/App.css";
import PostList from "./components/PostList";
import AddPostForm from "./components/AddPostForm";

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

  const [posts, setPosts] = useState<Post[]>([
    {
      title: "Javascript",
      text: "JS - programming language",
    },
    {
      title: "Python",
      text: "Python - programming language",
    },
    {
      title: "PHP",
      text: "PHP - programming language",
    },
    {
      title: "C++",
      text: "C++ - programming language",
    },
  ]);

  return (
    <div className="App">
      <AddPostForm createPost={createPost} />
      <PostList
        postArr={posts}
        listTitle={"List Title"}
      />
    </div>
  );
};

export default App;
