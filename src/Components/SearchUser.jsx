import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const SearchUser = () => {
  const [users, setUsers] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredUsers, setFilterUser] = useState([])

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/users`, { withCredentials: true })
      .then((res) => {
        setUsers(res.data || []);
      })
      .catch((error) => {
        console.error("Error fetching users:", error.message);
        setUsers([]);
      });
  }, []);

  //const users = ['anuj', 'avijit', 'karima']
  // console.log(users);


  function startFilter(val) {
    // if value is a empty return function 
    if (!val.trim()) {
      setFilterUser([]);
      return;
    }
    const filteredUser = users.filter((user) =>
      user.name.toLowerCase().includes(val.toLowerCase()));
    setFilterUser(filteredUser)
  }
  return (
    <div className="relative w-7/12">
      {/* Input Box */}
      <input
        type="text"
        placeholder="Search users..."
        onKeyUp={(e) => startFilter(e.target.value)}
        onFocus={() => setShowDropdown(true)}
        onBlur={() => setTimeout(() => setShowDropdown(false), 200)} // dropdown hide delay
        className="input input-bordered w-full"
      />

      {/* Dropdown */}
      {
        showDropdown && (
          <div className="absolute mt-1 w-full bg-base-100 shadow-lg rounded-lg z-10">
            {filteredUsers.length > 0 ? (
              filteredUsers?.map((user) => (
                <div
                  key={user.uid}
                  className="p-2 hover:bg-base-200 cursor-pointer"
                >

                  <Link className="flex gap-2 items-center " to={`/otherprofile/${user?.uid}`}>
                    <img
                      className="lg:w-15 lg:h-15 w-10 h-10  rounded-full object-cover"
                      src={user?.photoURL}
                      alt="profile photo"
                    />
                    <div>
                      <p>{user.name}</p>
                      <p className="lg:text-sm md:text-sm text-[12px] text-gray-500 truncate dark:text-gray-400 mt-1">
                        From {user?.address}
                      </p>

                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <div className="p-2 text-gray-500">No users found</div>
            )}
          </div>
        )
      }
    </div >
  );
};

export default SearchUser;