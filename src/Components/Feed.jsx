import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { UserContext } from "../Context/ContextProvider";
import Swal from "sweetalert2";
import axios from "axios";
import { Link } from "react-router";

const Feed = () => {
  const { DBUser } = useContext(UserContext);
  const [allPosts, setAllPosts] = useState([]);

  // Get all post
  useEffect(() => {
    axios
      .get(`http://localhost:4000/post`)
      .then((res) => setAllPosts(res.data))
      .catch((error) => console.log("Error from get posts.", error.message));
  }, []);

  // Create and post
  function handleCreatePost() {
    Swal.fire({
      title: "Create a Post",
      html: `
    <textarea id="postText" class="swal2-textarea" placeholder="Enter post description"></textarea>
    <input id="imageLink" class="swal2-input" placeholder="Enter image link">
  `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Done",
      preConfirm: () => {
        const postText = document.getElementById("postText").value;
        const imageLink = document.getElementById("imageLink").value;

        if (!postText || !imageLink) {
          Swal.showValidationMessage("Both fields are required!");
          return null;
        }

        const createPost = {
          uid: DBUser?.uid,
          userName: DBUser.name,
          userPhoto: DBUser.photoURL,
          postText,
          imageLink,
          like: [],
          createAt: new Date().toDateString(),
        };

        axios
          .post(`http://localhost:4000/post`, createPost)
          .then((res) => console.log(res.data))
          .catch((error) => console.log(error));
      },
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("Create a post Success:", result.value);
      }
    });
  }

  return (
    <div className="flex-1 max-w-2xl mx-auto py-8 lg:px-4 md:px-4">
      {/* Create Post Box */}
      <div className="card bg-base-100 shadow-xl mb-6">
        <div className="card-body">
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="w-12 rounded-full">
                <img src={DBUser?.photoURL} alt="User" />
              </div>
            </div>
            <input
              onClick={handleCreatePost}
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
            <button onClick={handleCreatePost} className="btn btn-ghost gap-2">
              <span>😊</span> Feeling/Activity
            </button>
          </div>
        </div>
      </div>

      {/* Posts */}
      {allPosts.map((post) => (
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
            <p className="mt-4 lg:text-lg md:text-md text-sm ">
              {post?.postText}
            </p>

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
      ))}
    </div>
  );
};

export default Feed;
