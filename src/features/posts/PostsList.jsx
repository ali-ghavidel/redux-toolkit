import React from "react";
import { useSelector } from "react-redux";
import {
  selectPostIds,
  useGetPostsQuery,
} from "./postsSlice";
import PostsExcerpt from "./PostsExcerpt";

const PostsList = () => {
  const {
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPostsQuery();
  

  const orderedPostIds = useSelector(selectPostIds);
  
  let content;
  if (isLoading) {
    content = <p>"Loading..."</p>;
  } else if (isSuccess) {
    // const orderedPosts = posts.slice().sort((a,b)=> b.date.localeCompare(a.date))
    content = orderedPostIds.map((postId) => (
      <PostsExcerpt key={postId} postId={postId} />
    ));
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return (
    <section>
      <h2>Posts</h2>
      {content}
    </section>
  );
};

export default PostsList;
