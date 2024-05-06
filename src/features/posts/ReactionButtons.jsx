import React from "react";
import { useAddReactionMutation } from "./postsSlice";

const reactionEmoji = {
  thumbsUp: "thumbsUp",
  wow: "wow",
  heart: "heart",
  rocket: "rocket",
  coffee: "coffee",
};
const ReactionButtons = ({ post }) => {
  const [addReaction] = useAddReactionMutation();
  return (
    <div>
      {Object.entries(reactionEmoji).map(([name, emoji]) => {
        return (
          <button
            key={name}
            type="button"
            className="reactionButton"
            onClick={() => {
              const newValue = post.reactions[name] + 1;
              addReaction({
                postId: post.id,
                reactions: { ...post.reactions, [name]: newValue },
              });
            }}
          >
            {emoji} {post.reactions[name]}
          </button>
        );
      })}
    </div>
  );
};

export default ReactionButtons;
