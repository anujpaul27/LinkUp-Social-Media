import React, { useEffect, useState } from "react";
import axios from "axios";

const Friends = () => {
  const [allFriend, setFriend] = useState([]);
  useEffect(() => {
      axios.get(`http://localhost:5000/users`).then((res) => setFriend(res.data));
    }, []);
    


  return (
    <>
      <p> {allFriend.length} </p>
      {allFriend.map((user, index) => {
        return (
          <div className="w-3/4 mx-auto bg-gray-800 py-2 px-2 rounded-lg mt-4">
            {/* User */}
            <div class="flex items-center space-x-4  ">
              <div class="flex-shrink-0">
                <img
                  className="w-20 rounded-full"
                  src={user?.photoURL}
                  alt=""
                />
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-xl font-medium light:text-gray-900 truncate dark:text-white">
                  {user?.name}
                </p>
                <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                  From:
                </p>
                <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                  Work at:
                </p>
              </div>
              <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                <button>
                    
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Friends;
