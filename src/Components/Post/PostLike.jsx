import React, { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../../Context/ContextProvider";

const PostLike = ({ post }) => {
  // logged in user can like the post
  const { DBUser } = useContext(UserContext);
  const currentUserId = DBUser._id;

  const [likes, setLikes] = useState(post.like);
  const isLikedByMe = likes.includes(currentUserId);

  const handleLikeToggle = async () => {
    try {
      // Optimistic UI update (optional, but makes app feel instantly fast)
      const updatedLikes = isLikedByMe
        ? likes.filter((id) => id !== currentUserId)
        : [...likes, currentUserId];
      setLikes(updatedLikes);

      // Send requests to backend
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/post/like`,
        {
          userId: currentUserId,
          postId: post._id,
        },
      );

      if (response.data.success) {
        // Sync with exact server response just to be sure
        setLikes(response.data.likeList);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
      // Revert state if backend request fails
      setLikes(post.like);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex">
      <button
        onClick={handleLikeToggle}
        className="flex justify-center items-center  cursor-pointer lg:gap-2 "
      >
        <p className=" text-2xl ">{isLikedByMe ? "❤️" : "🤍"} </p>
        <p className=" lg:text-md font-bold  ">
          {likes.length} {likes.length === 1 ? "Like" : "likes"}
        </p>    
      </button>
    </div>
  );
};

export default PostLike;
