import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { delay, motion } from "framer-motion";
import { UserContext } from "../Context/ContextProvider";

const Friends = () => {
  const [allFriend, setFriend] = useState([]);
  const [active, setActive] = useState([]);
  const {DBUser} = useContext(UserContext)

  useEffect(() => {
    axios.get(`http://localhost:5000/users`).then((res) => setFriend(res.data));
  }, []);

  useEffect(() => {
    setActive(Array(allFriend.length).fill(false));
  }, [allFriend]);

  function handleFollowBtn(i) {
    const copy = [...active];
    copy[i] = !copy[i];
    setActive(copy);
  }

  return (
    <>
      {allFriend.map((user, index) => {
        return (
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            key={index}
            className="w-3/4 mx-auto bg-gray-800 py-2 px-2 rounded-lg mt-4"
          >
            {/* User */}
            <div className="flex items-center space-x-4  ">
              <div className="flex-shrink-0">
                <img
                  className="w-20 rounded-full"
                  src={user?.photoURL}
                  alt=""
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className=" text-xl font-medium light:text-gray-900 truncate dark:text-white">
                  {user?.name}
                </p>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400 mt-1">
                  From {DBUser?.address}
                </p>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400 mt-1">
                  Work at {DBUser?.workAt}
                </p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                <button
                  onClick={() => handleFollowBtn(index)}
                  className={`btn ${
                    !active[index] ? "btn-secondary" : "btn-outline"
                  }`}
                >
                  {!active[index] ? "follow" : "unfollow"}
                </button>
              </div>
            </div>
          </motion.div>
        );
      })}
    </>
  );
};

export default Friends;
