import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/ContextProvider";
import { motion } from "framer-motion";
import { Link, useLoaderData } from "react-router";
import axios from "axios";
import useAxios from "../Context/useAxios";

const OtherProfile = () => {
  const uid = useLoaderData();
  const [user, setUser] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [following, setFollowing] = useState([]);
  const axiosSecure = useAxios();

  // Get Specific User
  useEffect(() => {
    axiosSecure.get(`/users/${uid}`).then((res) => setUser(res.data));
  }, []);

  // Get User Post
  useEffect(() => {
    axios
      .get(`http://localhost:4000/post/${user?.uid}`)
      .then((res) => setUserPosts(res.data));
  }, [user?.uid]);

  // Get Following
  useEffect(() => {
    axios
      .get(`http://localhost:4000/following/${user?.uid}`)
      .then((res) => setFollowing(res.data));
  }, [user?.uid]);

  return (
    <div className="min-h-screen bg-base-200">
      {/* Cover Photo */}
      <div className="relative h-64 md:h-40 lg:h-60">
        <img
          src={"https://picsum.photos/2000/500?random=1"}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        {/* Profile Picture - overlapping cover */}
        <div className="absolute -bottom-16 left-6 md:left-12 lg:left-20">
          <div className="avatar">
            <div className="w-32 md:w-40 rounded-full ring-8 ring-base-100 shadow-2xl">
              <img
                src={user?.photoURL}
                alt="Profile"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className=" max-w-5xl mx-auto px-6 md:px-12 pt-20 pb-12">
        {/* User Info */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold">{user?.name}</h1>

          <p className="mt-4 text-lg leading-relaxed max-w-2xl">{user?.bio}</p>

          <div className="mt-4 flex flex-wrap gap-6 text-base-content/70">
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>

              {user?.address}
            </div>
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
                />
              </svg>
              Work at {user?.workAt}
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-6 text-base-content/70">
            <div className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75-1.5.75a3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0L3 16.5m15-3.379a48.474 48.474 0 0 0-6-.371c-2.032 0-4.034.126-6 .371m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.169c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 0 1 3 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 0 1 6 13.12M12.265 3.11a.375.375 0 1 1-.53 0L12 2.845l.265.265Zm-3 0a.375.375 0 1 1-.53 0L9 2.845l.265.265Zm6 0a.375.375 0 1 1-.53 0L15 2.845l.265.265Z"
                />
              </svg>
              {user?.DateOfBirth}
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a6 6 0 00-6 6v1H3a1 1 0 00-.994 1.249l.5 4A1 1 0 003.5 15h13a1 1 0 00.994-1.751l-.5-4A1 1 0 0017 9h-1V8a6 6 0 00-6-6z" />
              </svg>
              {user?.joined}
            </div>
          </div>

          {/* Follow Stats */}
          <div className="mt-6 flex gap-8">
            <div>
              <span className="font-bold text-xl">
                {following?.following?.length}
              </span>
              <span className="text-base-content/60 ml-2">Following</span>
            </div>
            <div>
              <span className="font-bold text-xl">
                {following?.followers?.length}
              </span>
              <span className="text-base-content/60 ml-2">Followers</span>
            </div>
            <div>
              <span className="font-bold text-xl">{userPosts?.length}</span>
              <span className="text-base-content/60 ml-2">Posts</span>
            </div>
          </div>

          {/* Action Buttons */}
          {/* <div className="mt-8 flex flex-wrap gap-4">
            <Link to={"/editprofile"}>
              <button className="btn btn-primary btn-sm rounded-full px-10">
                Edit Profile
              </button>
            </Link>
          </div> */}
        </div>

        {/* Tabs for Posts / About / Media */}
        <div className="tabs tabs-bordered w-full mt-12">
          <button className="tab tab-bordered tab-active text-lg">Posts</button>
          <button className="tab tab-bordered text-lg">About</button>
          <button className="tab tab-bordered text-lg">Photos</button>
          <button className="tab tab-bordered text-lg">Videos</button>
        </div>

        {/* Posts */}
        {userPosts?.map((post) => (
          <motion.div
            key={post?._id}
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
                      <img src={post?.userPhoto} alt="User" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold">{post?.userName}</h3>
                    <p className="text-sm opacity-70">{post?.createAt} · 🌐</p>
                  </div>
                </div>
                <button className="btn btn-ghost btn-sm btn-circle">⋯</button>
              </div>

              <p className="mt-4 text-lg">{post?.postText}</p>

              {post?.imageLink && (
                <figure className="mt-4">
                  <img
                    src={post?.imageLink}
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
                <button className="btn btn-ghost flex-1 gap-2">🔄 Share</button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default OtherProfile;
