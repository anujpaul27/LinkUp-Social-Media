import React, { useState } from "react";
import { delay, motion } from "framer-motion";
import Friend from "../LayOut/Friend";
import { Link } from "react-router";

const menuItems = [
  { icon: "🏠", label: "Home", active: true },
  { icon: "👥", label: "Friends" },
  { icon: "🔔", label: "Notifications" },
  { icon: "💬", label: "Messages" },
  { icon: "⭐", label: "Saved" },
  { icon: "⚙️", label: "Settings" },
];

const Sidebar = ({ darkMode, setDarkMode }) => {
  const [BtnName, setBtnName] = useState("Home");

  function handleRightSideButton(btnName) {
    console.log(BtnName);
    setBtnName(btnName);
    console.log(BtnName);
  }

  return (
    <div className="drawer-side z-40">
      <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
      <ul className="menu p-4 w-70 bg-base-100 text-base-content min-h-full flex flex-col justify-between">
        {/* Logo */}
        <div className="mb-8">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="avatar">
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src="https://i.pravatar.cc/300" alt="User" />
              </div>
            </div>
            <span className="font-bold text-xl">Anastasia</span>
          </div>
        </div>

        <div className="flex-1">
          {/* Home button */}
          <motion.li
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.0, duration: 0.1 }}
          >
            <Link to={"/"} className="flex items-center gap-4 text-lg py-3">
              <span className="text-2xl">🏠</span>
              Home
            </Link>
          </motion.li>

          {/* Friend Button */}
          <motion.li
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.1 }}
          >
            <Link
              to={"/friend"}
              className="flex items-center gap-4 text-lg py-3"
            >
              <span className="text-2xl">👥</span>
              Friend
            </Link>
          </motion.li>

          {/* Message Button */}
          <motion.li
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.1 }}
          >
            <Link
              to={"/message"}
              className="flex items-center gap-4 text-lg py-3"
            >
              <span className="text-2xl">💬</span>
              Message
            </Link>
          </motion.li>

          {/* Saved Button */}
          <motion.li
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.1 }}
          >
            <Link
              to={"/saved"}
              className="flex items-center gap-4 text-lg py-3"
            >
              <span className="text-2xl">⭐</span>
              Saved
            </Link>
          </motion.li>

          {/* Setting Button */}
          <motion.li
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.1 }}
          >
            <Link
              to={"/setting"}
              className="flex items-center gap-4 text-lg py-3"
            >
              <span className="text-2xl">⚙️</span>
              Setting
            </Link>
          </motion.li>

          {/* LogOut Button */}
          <motion.li
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.1 }}
          >
            <Link to={'/logout'} className="flex items-center gap-4 text-lg py-3">
              <span className="text-2xl">🔓</span>
              LogOut
            </Link>
          </motion.li>
        </div>

        {/* Dark Mode Toggle */}
        <div className="mt-8 px-4">
          <label className="label cursor-pointer justify-start gap-3">
            <span className="label-text text-lg">Dark Mode</span>
            <input
              type="checkbox"
              className="toggle toggle-primary"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
          </label>
        </div>
      </ul>
    </div>
  );
};

export default Sidebar;
