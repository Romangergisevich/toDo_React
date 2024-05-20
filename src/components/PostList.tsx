import React from "react";
import PostItem from "./PostItem";

type ListTitle = string | undefined | null;

interface Post {
  title: string;
  text: string;
  rating: number;
  createDate: number;
}

interface PostListProps {
  postArr: Post[];
  listTitle?: ListTitle;
  updatePost: (createDate: number, newTitle: string, newText: string) => void;
  updateRating: (createDate: number, newRating: number) => void;
  deletePost: (title: string, text: string) => void;
  taskIsDone: (title: string, text: string, createDate: number) => void;
}

const PostList: React.FC<PostListProps> = (props) => {
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
            rating={post.rating}
            postUpdate={props.updatePost}
            updateRating={props.updateRating}
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
