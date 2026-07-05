import React, { useState, useContext } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { UserContext } from "../../Context/ContextProvider";

const CommentPost = ({ post }) => {
  const { DBUser } = useContext(UserContext);
  const currentUserId = DBUser?._id;

  const [comments, setComments] = useState(post.comments || []);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!currentUserId) {
      alert("Please login to comment!");
      return;
    }
    if (!inputText.trim()) return;

    const date = new Date();
    const months = [
      "jan",
      "feb",
      "mar",
      "apr",
      "may",
      "jun",
      "jul",
      "aug",
      "sep",
      "oct",
      "nov",
      "dec",
    ];
    const fakeId = Date.now().toString();

    const localNewComment = {
      _id: fakeId,
      userId: currentUserId,
      userName: DBUser?.name || "Anonymous",
      userPhoto: DBUser?.photoURL || "",
      commentText: inputText,
      createdAt: `${date.getDate()}-${months[date.getMonth()]}-${date.getFullYear()}`,
    };

    setComments((prev) => [...prev, localNewComment]);
    const typedText = inputText;
    setInputText("");
    setLoading(true);

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/post/comment`,
        {
          postId: post?._id,
          userId: currentUserId,
          userName: DBUser?.name,
          userPhoto: DBUser?.photoURL,
          commentText: typedText,
        },
      );

      console.log(response);
      if (response.data.success) {
        setComments(response.data.commentsList);
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      setComments((prev) => prev.filter((c) => c?._id !== fakeId));
      setInputText(typedText);
      alert("Failed to send comment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      {/* 🎬 Framer Motion Smooth Dropdown Dropdown */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 'auto' }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="pt-4 border-t border-base-200 text-left">
            {/* Comment Input Form  */}
            <form
              onSubmit={handleCommentSubmit}
              className="flex gap-2 items-center mb-4"
            >
              <div className="avatar hidden sm:block">
                <div className="w-8 rounded-full">
                  <img
                    src={DBUser?.photoURL || "https://placehold.co"}
                    alt={`${DBUser?.name}`}
                  />
                </div>
              </div>
              <div className="join w-full">
                <input
                  type="text"
                  placeholder="Write a public comment..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  disabled={loading}
                  className="input input-bordered join-item w-full input-sm sm:input-md focus:outline-none focus:border-primary"
                />
                <button
                  type="submit"
                  disabled={loading || !inputText.trim()}
                  className="btn btn-primary join-item btn-sm sm:btn-md"
                >
                  {loading ? (
                    <span className="loading loading-spinner loading-xs"></span>
                  ) : (
                    "Post"
                  )}
                </button>
              </div>
            </form>

            {/* 📜 Comment List area */}
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
              {comments.length === 0 ? (
                <p className="text-center text-sm opacity-50 my-4">
                  No comments yet. Be the first to comment!
                </p>
              ) : (
                comments.map((comment) => (
                  <motion.div
                    key={comment?._id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex gap-3 items-start"
                  >
                    <div className="avatar mt-1">
                      <div className="w-8 rounded-full">
                        <img
                          src={comment.userPhoto || "https://placehold.co"}
                          alt={comment.userName}
                        />
                      </div>
                      
                    </div>
                    <div className="bg-base-200 rounded-2xl px-4 py-2 max-w-[85%]">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-sm hover:underline cursor-pointer">
                          {comment.userName}
                        </span>
                        <span className="text-[10px] opacity-50">
                          {comment.createAt}
                        </span>
                      </div>
                      <p className="text-sm mt-0.5 break-words text-base-content/90">
                        {comment.commentText}
                      </p>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default CommentPost;
