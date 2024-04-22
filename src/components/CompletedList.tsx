import React from "react";
import PostItem from "./PostItem";

type ListTitle = string | undefined | null;

interface Post {
  title: string;
  text: string;
  createDate: number;
}

interface PostListProps {
  postArr: Post[];
  listTitle?: ListTitle;
  deletePost: (title: string, text: string) => void;
  taskIsDone: (title: string, text: string, createDate: number) => void;
}
const CompletedList: React.FC<PostListProps> = (props) => {
  return (
    <>
      <h1>Completed Tasks</h1>
      {props.postArr.map((post) => (
        <PostItem
          myParent="completed"
          key={post.title + props.postArr.indexOf(post)}
          count={props.postArr.indexOf(post) + 1}
          title={post.title}
          text={post.text}
          deletePost={props.deletePost}
          taskIsDone={props.taskIsDone}
          createDate={post.createDate}
        />
      ))}
    </>
  );
};

export default CompletedList;
