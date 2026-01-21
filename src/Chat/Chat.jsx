import React, { useState, useEffect, useRef } from "react";
import { UseChat } from "./UseChat";

const Chat = ({ currentUser, otherUser }) => {
  const { messages, sendMessage, loading } = UseChat(
    currentUser?.uid,
    otherUser?.uid,
  );
  const [newMsg, setNewMsg] = useState("");
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom when new message arrives
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (newMsg.trim() === "") return;

    sendMessage(newMsg.trim());
    setNewMsg("");
  };

  // Enter key to send (Shift + Enter for new line allowed)
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend(e);
    }
  };

  return (
    <div className="flex flex-col h-full bg-base-100">
      {/* Chat Header */}
      <div className="px-5 py-4 border-b border-base-300 bg-base-200 flex items-center gap-4">
        <div className="avatar">
          <div className="w-10 rounded-full">
            <img
              src={
                otherUser?.photoURL ||
                `https://i.pravatar.cc/150?u=${otherUser?.uid}`
              }
              alt="Other user"
            />
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-lg">{otherUser?.name || "User"}</h3>
          <p className="text-xs text-base-content/60">
            {otherUser?.status || "Active now"}
          </p>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-base-200">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-base-content/50">
            <svg
              className="w-16 h-16 mb-4 opacity-40"
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
            <p className="text-lg">No messages yet. Say hello!</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`chat ${msg.senderId === currentUser?.uid ? "chat-end" : "chat-start"}`}
            >
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    src={
                      msg.senderId === currentUser?.uid
                        ? currentUser?.photoURL ||
                          `https://i.pravatar.cc/150?u=${currentUser?.uid}`
                        : otherUser?.photoURL ||
                          `https://i.pravatar.cc/150?u=${otherUser?.uid}`
                    }
                    alt="Avatar"
                  />
                </div>
              </div>
              <div
                className={`chat-bubble ${
                  msg.senderId === currentUser?.uid ? "chat-bubble-primary" : ""
                }`}
              >
                {msg.text}
              </div>
              <div className="chat-footer opacity-50 text-xs">
                {msg.createdAt instanceof Date
                  ? msg.createdAt.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "Sending..."}
              </div>
            </div>
          ))
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <form
        onSubmit={handleSend}
        className="p-4 border-t border-base-300 bg-base-100 flex items-center gap-3"
      >
        <input
          type="text"
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="input input-bordered flex-1 bg-base-200 focus:outline-none focus:ring-2 focus:ring-primary"
          disabled={loading}
        />
        <button
          type="submit"
          className="btn btn-primary btn-circle"
          disabled={loading || !newMsg.trim()}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default Chat;
