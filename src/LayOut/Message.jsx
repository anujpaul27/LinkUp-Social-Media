import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { UserContext } from "../Context/ContextProvider";
import { Link } from "react-router-dom";
import Chat from "../Chat/Chat";

const Message = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFriendUid, setSelectedFriendUid] = useState(null);

  const { DBUser } = useContext(UserContext);

  // Fetch all users/friends
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/user`, {
          withCredentials: true,
        });
        setFriends(res.data);
      } catch (err) {
        console.error("Error fetching friends:", err);
        setError("Failed to load friends. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, []);

  // Handle click on user → open chat
  const handleSelectFriend = (uid) => {
    setSelectedFriendUid(uid);
  };

  return (
    <div

      className="min-h-screen bg-base-900 text-base-content"
    >
      <div className="container mx-auto p-4 md:p-6">
        {/* Main Content */}
        <div className="flex flex-col lg:flex-row bg-base-100 rounded-b-2xl shadow-2xl overflow-hidden h-[calc(100vh-120px)]">
          {/* Left side: Friend List */}
          <div className="w-full lg:w-1/3 lg:max-w-xs border-r border-base-300 overflow-y-auto bg-base-200">
            <div className="p-4 border-b border-base-300">
              <input
                type="text"
                placeholder="Search in chats..."
                className="input input-bordered w-full bg-base-100"
              />
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <span className="loading loading-spinner loading-lg text-primary"></span>
              </div>
            ) : error ? (
              <div className="p-6 text-center text-error">{error}</div>
            ) : friends.length === 0 ? (
              <div className="p-6 text-center text-base-content/60">
                No friends found
              </div>
            ) : (
              <div className="p-4 space-y-4">
                {friends.map((user) => (
                  <motion.div
                    key={user.uid}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className={`flex items-center space-x-4 p-3 rounded-xl cursor-pointer transition-all  ${selectedFriendUid === user.uid ? "bg-primary/20" : ""
                      }`}
                    onClick={() => handleSelectFriend(user.uid)}
                  >
                    <div className="avatar">
                      <div className="w-16 rounded-full ring-2 ring-primary/30">
                        <img
                          src={
                            user?.photoURL ||
                            `https://i.pravatar.cc/300?u=${user.uid}`
                          }
                          alt={user.name}
                          className="object-cover"
                        />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-semibold truncate text-base-content">
                        <p
                          onClick={() => handleSelectFriend(user.uid)}
                          className="hover:text-primary transition-colors"
                        >
                          {user.name}
                        </p>
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* Right side: Chat Area */}
          <div className="flex-1 bg-base-100 relative">
            {selectedFriendUid ? (
              // Find selectedFriend form friends array 
              (() => {
                const selectedFriend = friends.find(
                  (friend) => friend.uid === selectedFriendUid,
                );

                if (!selectedFriend) {
                  return (
                    <div className="flex items-center justify-center h-full text-error">
                      Friend not found
                    </div>
                  );
                }

                return (
                  <Chat
                    currentUser={DBUser}
                    otherUser={selectedFriend} // Now sent all object 
                  />
                );
              })()
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-base-content/50">
                <svg
                  className="w-24 h-24 mb-6 opacity-40"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <p className="text-xl font-medium">
                  Select a friend to start chatting
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
