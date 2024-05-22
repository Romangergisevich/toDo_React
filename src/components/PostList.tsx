import React, { useState } from "react";
import PostItem from "./PostItem";
import TextInput from "./UI/inputs/TextInput";
import Radio from "./UI/radio/Radio";
import SortButton from "./UI/buttons/SortBtton";

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
  sortFunc: (variant: number, snackbarTitle: string) => void;
}

interface SortParamsState {
  variant: number;
  snackbarTitle: string;
}

const PostList: React.FC<PostListProps> = (props) => {
  const [sortParams, setSortParams] = useState<SortParamsState>({
    variant: 1,
    snackbarTitle: "Priority",
  });

  const newSortParams = (newVar: number, newTitle: string) => {
    setSortParams((prevState) => ({
      ...prevState,
      variant: newVar,
      snackbarTitle: newTitle,
    }));
  };

  const sortByparam = () => {
    props.sortFunc(sortParams.variant, sortParams.snackbarTitle);
  };

  return (
    <>
      <h1>{props.listTitle ? props.listTitle : "Random List Title"}</h1>
      <div className="filterPanel">
        <TextInput
          inputId={"Filter_input"}
          placeholder="Filter"
        />
        <div className="filterPanel__sort">
          <h3>Sort by</h3>
          <Radio
            changeSortParams={newSortParams}
            variant={sortParams.variant}
            title={sortParams.snackbarTitle}
          />
          <SortButton sortFunc={sortByparam} />
        </div>
      </div>
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
