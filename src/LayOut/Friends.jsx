import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { delay, motion } from "framer-motion";
import { UserContext } from "../Context/ContextProvider";
import { Link } from "react-router";
import useAxios from "../Context/useAxios";

const Friends = () => {
  const [allFriend, setFriend] = useState([]);
  const [active, setActive] = useState([]);
  const [loading, setLoading] = useState(false)
  const { DBUser } = useContext(UserContext);
  const axiosSecure = useAxios();

  useEffect(() => {
    // axios.get(`${import.meta.env.VITE_API_URL}/users`,{withCredentials:true}).then((res) => setFriend(res.data));
    const ManageFollowing = async () => {
      // get all user
      setLoading(true)
      const response = await axiosSecure.get("/api/user");
      const users = (response.data)
      console.log("all user", users)
      setLoading(false)

      // get following user 
      const response1 = await axios.get(`${import.meta.env.VITE_API_URL}/following/${DBUser?.uid}`);
      const UserTotalFollowing = response1.data.following;
      console.log(UserTotalFollowing)

      // show unfollow user with a condition
      const newAllFriend = users.filter(obj => !UserTotalFollowing.includes(obj.uid))
      setFriend(newAllFriend)
    }
    ManageFollowing()
  }, []);

  useEffect(() => {
    setActive(Array(allFriend.length).fill(false));
  }, [allFriend]);

  function handleFollowBtn(i, FollowingUserUid) {
    const copy = [...active];
    copy[i] = !copy[i];
    setActive(copy);

    // Update Following count each user
    if (copy[i]) {
      axios
        .patch(`${import.meta.env.VITE_API_URL}/following/${DBUser?.uid}`, {
          FollowingUserUid,
        })
        .then((res) => console.log(res.data));
    }
  }

  return (
    <>
      {loading ?
        <div class="flex min-h-screen w-full items-center justify-center">
          <span class="loading loading-spinner text-primary loading-lg"></span>
        </div>
        :
        allFriend.map((user, index) => {
          return (
            <motion.div
              key={index}
              className="lg:w-3/4 md:w-3/4  w-11/12  mx-auto  py-2 px-2 rounded-lg "
            >
              {/* User */}
              <div className="flex items-center space-x-4 shadow-sm p-3    ">
                <div>
                  <Link to={`/otherprofile/${user?.uid}`}>
                    <img
                      className="lg:w-20 lg:h-20 md:w-20 md:h-20 w-15 h-15  rounded-full object-cover"
                      src={user?.photoURL}
                      alt="profile photo"
                    />
                  </Link>
                </div>
                <div className="flex-1 min-w-0 ">
                  <p className=" text-md lg:text-xl md:text-xl font-medium ">
                    <Link to={`/otherprofile/${user?.uid}`}> {user?.name} </Link>
                  </p>
                  <p className="lg:text-sm md:text-sm text-[12px] text-gray-500 truncate dark:text-gray-400 mt-1">
                    From {user?.address}
                  </p>
                  <p className="lg:text-sm md:text-sm text-[12px] text-gray-500 truncate dark:text-gray-400 ">
                    Work at {user?.workAt}
                  </p>
                </div>
                <div className="inline-flex items-center text-base font-semibold light:text-gray-900 dark:text-white">
                  <button
                    onClick={() => handleFollowBtn(index, user?.uid)}
                    className={`btn btn-sm lg:btn md:btn ${!active[index] ? "btn-secondary " : "btn-outline"
                      }`}
                  >
                    {!active[index] ? "follow" : "unfollow"}
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })

      }
    </>
  );
};

export default Friends;
