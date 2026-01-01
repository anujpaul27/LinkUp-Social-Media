import React from "react";
import { motion } from "framer-motion";

const posts = [
  {
    id: 1,
    name: "Anastasia Vivent",
    time: "2h",
    text: "Travel is the only thing you buy that makes you richer 🌆✨",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Home Mary",
    time: "5h",
    text: "Just finished my morning coffee ritual ☕",
    image: "https://i.pinimg.com/236x/7f/8d/32/7f8d32503f173e65d8acbdc8ca339c68.jpg",
  },
  // Add more as needed
];

const Feed = () => {
  function handleCreatePost ()
  {
    alert("dont it")
  }
  return (
    <div className="flex-1 max-w-2xl mx-auto py-8 px-4">
      {/* Create Post Box */}
      <div className="card bg-base-100 shadow-xl mb-6">
        <div className="card-body">
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="w-12 rounded-full">
                <img src="https://i.pravatar.cc/300" alt="User" />
              </div>
            </div>
            <input
              type="text"
              placeholder="What's on your mind?"
              className="input input-bordered flex-1 bg-base-200"
            />
          </div>
          <div className="divider my-2"></div>
          <div className="flex justify-around">
            <button onClick={handleCreatePost} className="btn btn-ghost gap-2">
              <span>📷</span> Photo/Video
            </button>
            <button className="btn btn-ghost gap-2">
              <span>😊</span> Feeling/Activity
            </button>
          </div>
        </div>
      </div>

      {/* Posts */}
      {posts.map((post) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="card bg-base-100 shadow-xl mb-6 hover:shadow-2xl transition-shadow"
        >
          <div className="card-body">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="w-12 rounded-full">
                    <img src="https://i.pravatar.cc/300" alt="User" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold">{post.name}</h3>
                  <p className="text-sm opacity-70">{post.time} · 🌐</p>
                </div>
              </div>
              <button className="btn btn-ghost btn-sm btn-circle">⋯</button>
            </div>

            <p className="mt-4 text-lg">{post.text}</p>

            {post.image && (
              <figure className="mt-4">
                <img
                  src={post.image}
                  alt="Post"
                  className="w-full rounded-xl object-cover max-h-[500px]"
                />
              </figure>
            )}

            <div className="flex justify-between mt-4 pt-4 border-t">
              <button className="btn btn-ghost flex-1 gap-2 hover:bg-red-50 hover:text-red-600">
                ❤️ Like
              </button>
              <button className="btn btn-ghost flex-1 gap-2">
                💬 Comment
              </button>
              <button className="btn btn-ghost flex-1 gap-2">
                🔄 Share
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Feed;