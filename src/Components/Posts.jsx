import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router";

const Posts = ({ post }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const words = (post?.postText || "").split(" ");
  const preview = words.slice(0, 20).join(" ");

  return (
    <motion.div
      key={post._id}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card bg-base-100 shadow-xl mb-6 hover:shadow-2xl transition-shadow"
    >
      <div className="card-body">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="avatar">
              {/* Post Heading  */}
              <div className="w-12 rounded-full">
                <Link to={`/otherprofile/${post?.uid}`}>
                  <img src={post?.userPhoto} alt="profile photo" />
                </Link>
              </div>
            </div>
            <div>
              <Link to={`otherprofile/${post.uid}`}>
                <h3 className="font-semibold">{post?.userName}</h3>
              </Link>
              <p className="lg:text-sm md:text-sm text-[10px] opacity-70">
                {post?.createAt} · 🌐
              </p>
            </div>
          </div>
          <button className="btn btn-ghost btn-sm btn-circle">⋯</button>
        </div>

        {/* Post Text */}
        <div>
          {!isExpanded && words.length > 21 ? (
            <p className="mt-4 lg:text-[15px] md:text-md text-sm ">
              {preview}...{" "}
              <button
                className="text-blue-500 text-sm hover:underline"
                onClick={() => setIsExpanded(true)}
              >
                Read more
              </button>
            </p>
          ) : (
            <p className="mt-4 lg:text-[15px] md:text-md text-sm ">
              {post?.postText}
            </p>
          )}

          {isExpanded && (
            <button
              onClick={() => setIsExpanded(false)}
              className="text-blue-500 hover:underline"
            >
              Show less
            </button>
          )}
        </div>

        {post.imageLink && (
          <figure className="mt-4">
            <img
              src={post?.imageLink}
              alt="Post"
              className="w-full rounded-xl object-cover max-h-[500px]"
            />
          </figure>
        )}

        <div className="flex justify-between mt-4 pt-4 border-t">
          <button className="btn btn-ghost flex-1 gap-2 hover:bg-red-50 hover:text-red-600 ">
            ❤️ Like
          </button>
          <button className="btn btn-ghost flex-1 gap-2">💬 Comment</button>
          <button className="btn btn-ghost flex-1 gap-2">🔄 Share</button>
        </div>
      </div>
    </motion.div>
  );
};

export default Posts;
