import React from "react";
import PostItem from "./PostItem";
import { useAppSelector } from "../hooks/tsHooks";
import { RootState } from "../redux/store";

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

const PostList: React.FC<PostListProps> = (props) => {
  const count = useAppSelector((state: RootState) => state.counter.value);

  return (
    <>
      <h1>{props.listTitle ? props.listTitle : "Random List Title"}</h1>
      <div className="listContainer">
        {props.postArr.map((post) => (
          <PostItem
            myParent="ToDo"
            key={post.title + props.postArr.indexOf(post)}
            count={props.postArr.indexOf(post) + 1}
            title={post.title}
            text={post.text}
            deletePost={props.deletePost}
            taskIsDone={props.taskIsDone}
            createDate={post.createDate}
          />
        ))}
      </div>
    </>
  );
};

export default PostList;
