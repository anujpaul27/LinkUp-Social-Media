import React from "react";

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-lg sticky top-0 z-30 w-full flex justify-around">
      {/* Logo Section */}
      <div className="flex-1 gap-4">
        <label htmlFor="my-drawer-2" className="btn btn-ghost lg:hidden">
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
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </label>
        <div className="text-2xl font-bold text-primary flex gap-3 items-center">
          <img className="w-10" src="/LinkUpLogo.png" alt="" />
          <p>LinkUp</p>
        </div>
      </div>

      {/* what your mind section */}
      <div className="form-control flex-2 gap-2">
        <input
          type="text"
          placeholder="Search Your Friend. . ."
          className="input input-bordered w-50"
        />
      </div>

      {/* Right side of the top navbar */}
      <div className="flex-3 gap-3">
        <button className="btn btn-ghost btn-circle">
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
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
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
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button>
        <button className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img src="https://i.pravatar.cc/300" alt="User" />
          </div>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
