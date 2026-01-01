import { useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/ContextProvider";
import axios from "axios";

export default function Profile() {
  const [darkMode, setDarkMode] = useState(true);
  const {DBUser} = useContext(UserContext)
  return (
    <div
      data-theme={darkMode ? "dark" : "light"}
      className="bg-[#9de2ff] dark:bg-gray-900 min-h-screen flex items-center justify-center"
    >
      <div className="card shadow-xl bg-white dark:bg-gray-800 text-black dark:text-white">
        <div className="bg-gray-800 min-h-screen flex items-center justify-center">
          <div className="w-full max-w-3xl">
            <div className="card shadow-xl">
              {/* Top Section */}
              <div className="rounded-t-lg text-white flex flex-row bg-black h-[200px]">
                <div className="ml-4 mt-5 flex flex-col w-[150px]">
                  <img
                    src={DBUser?.photoURL}
                    alt="Profile"
                    className="mt-4 mb-2 w-[150px] rounded-full border-2 border-white z-10"
                  />
                  <button className="btn btn-outline btn-dark h-9 mt-2">
                    Edit profile
                  </button>
                </div>
                <div className="ml-3 mt-[130px]">
                  <h5 className="text-lg font-semibold">{DBUser?.name}</h5>
                  <p className="text-sm">New York</p>
                </div>
              </div>

              {/* Stats Section */}
              <div className="p-4 text-black bg-gray-100">
                <div className="flex justify-end text-center py-1">
                  <div>
                    <p className="mb-1 text-xl font-bold">253</p>
                    <p className="text-xs text-gray-500">Photos</p>
                  </div>
                  <div className="px-3">
                    <p className="mb-1 text-xl font-bold">1026</p>
                    <p className="text-xs text-gray-500">Followers</p>
                  </div>
                  <div>
                    <p className="mb-1 text-xl font-bold">478</p>
                    <p className="text-xs text-gray-500">Following</p>
                  </div>
                </div>
              </div>

              {/* Body Section */}
              <div className="p-4 text-black">
                {/* About */}
                <div className="mb-5">
                  <p className="text-lg font-semibold mb-1">About</p>
                  <div className="p-4 bg-gray-100 rounded-lg">
                    <p className="italic mb-1">Web Developer</p>
                    <p className="italic mb-1">Lives in New York</p>
                    <p className="italic mb-0">Photographer</p>
                  </div>
                </div>

                {/* Recent Photos */}
                <div className="flex justify-between items-center mb-4">
                  <p className="text-lg font-semibold">Recent photos</p>
                  <a href="#!" className="text-gray-500 text-sm">
                    Show all
                  </a>
                </div>

                {/* Photos Grid */}
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(112).webp"
                    alt="image 1"
                    className="w-full rounded-lg"
                  />
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(107).webp"
                    alt="image 2"
                    className="w-full rounded-lg"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(108).webp"
                    alt="image 3"
                    className="w-full rounded-lg"
                  />
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/Lightbox/Original/img%20(114).webp"
                    alt="image 4"
                    className="w-full rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
