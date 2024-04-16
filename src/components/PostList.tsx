import React from "react";
import PostItem from "./PostItem";

type ListTitle = string | undefined | null;

interface Post {
  title: string;
  text: string;
}

interface PostListProps {
  postArr: Post[];
  listTitle?: ListTitle;
  deletePost: (title: string, text: string) => void;
}

const PostList: React.FC<PostListProps> = (props) => {
  return (
    <>
      <h1>{props.listTitle ? props.listTitle : "Random List Title"}</h1>
      {props.postArr.map((post) => (
        <PostItem
          myParent="ToDo"
          key={post.title + props.postArr.indexOf(post)}
          count={props.postArr.indexOf(post) + 1}
          title={post.title}
          text={post.text}
          deletePost={props.deletePost}
        />
      ))}
    </>
  );
};

export default PostList;
