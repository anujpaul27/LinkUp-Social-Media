import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/ContextProvider";
import axios from "axios";
import { Link } from "react-router";
import Posts from "./Posts";

const Feed = () => {
  const { DBUser } = useContext(UserContext);
  const [allPosts, setAllPosts] = useState([]);

  // Get all post
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/post`)
      .then((res) => setAllPosts(res.data))
      .catch((error) => console.log("Error from get posts.", error.message));
  }, []);



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
            <Link className="w-full" to={'/CreatePost'}>
              <input
                type="text"
                placeholder="What's on your mind?"
                className="input input-bordered w-full bg-base-200"
              />
            </Link>
          </div>
          <div className="divider my-2"></div>
          <div className="flex justify-around">
            <Link to={"/CreatePost"}>
              <button className="btn btn-ghost gap-2">
                <span>📷</span> Photo
              </button>
            </Link>
            <Link to={'/CreatePost'}>
              <button className="btn btn-ghost gap-2">
                <span>😊</span> Feeling/Activity
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Posts */}
      {allPosts.map((posts) => <Posts post={posts}></Posts>)}
    </div>
  );
};

export default Feed;
