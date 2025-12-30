import React from "react";
import { motion } from "framer-motion";

const menuItems = [
  { icon: "🏠", label: "Home", active: true },
  { icon: "👥", label: "Friends" },
  { icon: "🔔", label: "Notifications" },
  { icon: "💬", label: "Messages" },
  { icon: "⭐", label: "Saved" },
  { icon: "⚙️", label: "Settings" },
];

const Sidebar = ({ darkMode, setDarkMode }) => {
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

        {/* Menu Items */}
        <div className="flex-1">
          {menuItems.map((item, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={item.active ? "bg-primary/20 rounded-lg" : ""}
            >
              <a className="flex items-center gap-4 text-lg py-3">
                <span className="text-2xl">{item.icon}</span>
                {item.label}
              </a>
            </motion.li>
          ))}
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