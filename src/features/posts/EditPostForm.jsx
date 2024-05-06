import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { selectAllUsers } from "../users/usersSlice";
import {
  selectPostByID,
  useUpdatePostMutation,
  useDeletePostMutation,
} from "./postsSlice";

const EditPostForm = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [updatePost, { isLoading }] = useUpdatePostMutation();
  const [deletePost] = useDeletePostMutation();

  const post = useSelector((state) => selectPostByID(state, postId));
  const users = useSelector(selectAllUsers);

  const [title, setTitle] = useState(post?.title);
  const [content, setContent] = useState(post?.body);
  const [userId, setUserId] = useState(post?.userId);

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  const canSave = [title, content, userId].every(Boolean) && !isLoading;

  const handleSavePost = async () => {
    if (canSave) {
      try {
        await updatePost({
          id: post.id,
          title,
          body: content,
          userId,
          reactions: post.reactions,
        }).unwrap();

        setTitle("");
        setContent("");
        setUserId("");

        navigate(`/post/${postId}`);
      } catch (error) {
        console.error("Failed to save the post", error);
      }
    }
  };
  const handleDeletePost = async () => {
    try {
      await deletePost({ id: post.id }).unwrap();

      setTitle("");
      setContent("");
      setUserId("");
      navigate("/");
    } catch (error) {
      console.log(`failed to delete the post`, error);
    }
  };
  const usersOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));
  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select
          id="postAuthor"
          defaultValue={userId}
          onChange={(e) => setUserId(e.target.value)}
        >
          <option value="">Select an Author</option>
          {usersOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="button" onClick={handleSavePost} disabled={!canSave}>
          Save Post
        </button>
        <button type="button" onClick={handleDeletePost}>
          Delete Post
        </button>
      </form>
    </section>
  );
};
export default EditPostForm;
