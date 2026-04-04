import { delay, motion } from "framer-motion";
import Swal from "sweetalert2";
import { useContext } from "react";
import { UserContext } from "../Context/ContextProvider";
import axios from "axios";
import { useNavigate } from "react-router";
export default function EditProfile() {
  const { DBUser } = useContext(UserContext);
  const navigation = useNavigate();

  function handleEditProfile(e) {
    e.preventDefault();
    const form = e.target;
    const valueForm = new FormData(form);
    const Obj = Object.fromEntries(valueForm.entries());
    const updatedUser = {};
    if (DBUser.name !== Obj.name) updatedUser.name = Obj.name;
    if (DBUser.email !== Obj.email) updatedUser.email = Obj.email;
    if (DBUser?.address !== Obj.address) updatedUser.address = Obj.address;
    if (DBUser?.phone_number !== Obj.phone_number)
      updatedUser.phone_number = Obj.phone_number;
    if (DBUser?.bio !== Obj.bio) updatedUser.bio = Obj.bio;
    if (DBUser?.DateOfBirth !== Obj.DateOfBirth)
      updatedUser.DateOfBirth = Obj.DateOfBirth;
    if (DBUser?.workAt !== Obj.workAt) updatedUser.workAt = Obj.workAt;

    axios
      .patch(`${import.meta.env.VITE_API_URL}/users/${DBUser?.uid}`, updatedUser)
      .then((res) => {
        Swal.fire({
          title: "Profile Update Successful.",
          icon: "success",
        });
        navigation("/profile");
      })
      .catch((error) => {
        console.log(error.message);
      });
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="w-10/12 mx-auto"
    >
      <h1 className="text-2xl bg-gray-800 py-2 px-2 text-center rounded-full my-10">
        Edit Your Profile Info
      </h1>
      <form onSubmit={handleEditProfile} action="" className="">
        {/* Name */}
        <div className="relative mb-6">
          <label className="flex  items-center mb-2 text-gray-600 text-sm font-medium">
            Name{" "}
            <svg
              width={7}
              height={7}
              className="ml-1"
              viewBox="0 0 7 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z"
                fill="#EF4444"
              />
            </svg>
          </label>
          <div className="relative  text-gray-500 focus-within:text-gray-400 mb-6">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ">
              <svg
                className="stroke-current ml-1"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 21V20.1429C20 19.0805 20 18.5493 19.8997 18.1099C19.5578 16.6119 18.3881 15.4422 16.8901 15.1003C16.4507 15 15.9195 15 14.8571 15H10C8.13623 15 7.20435 15 6.46927 15.3045C5.48915 15.7105 4.71046 16.4892 4.30448 17.4693C4 18.2044 4 19.1362 4 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                  stroke=""
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <input
              type="text"
              name="name"
              id="default-search"
              className="block w-full h-11 pr-5 pl-12 py-2.5 text-base font-normal shadow-xs text-gray-400 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
              defaultValue={DBUser?.name}
            />
          </div>
        </div>

        {/* Date Of Birth */}
        <div className="relative mb-6">
          <label className="flex  items-center mb-2 text-gray-600 text-sm font-medium">
            Date Of Birth
            <svg
              width={7}
              height={7}
              className="ml-1"
              viewBox="0 0 7 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z"
                fill="#EF4444"
              />
            </svg>
          </label>
          <div className="relative  text-gray-500 focus-within:text-gray-400 mb-6">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ">
              <svg
                className="stroke-current ml-1"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20 21V20.1429C20 19.0805 20 18.5493 19.8997 18.1099C19.5578 16.6119 18.3881 15.4422 16.8901 15.1003C16.4507 15 15.9195 15 14.8571 15H10C8.13623 15 7.20435 15 6.46927 15.3045C5.48915 15.7105 4.71046 16.4892 4.30448 17.4693C4 18.2044 4 19.1362 4 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
                  stroke=""
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <input
              type="date"
              name="DateOfBirth"
              id="default-search"
              className="block w-full h-11 pr-5 pl-12 py-2.5 text-base font-normal shadow-xs text-gray-400 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
              defaultValue={DBUser?.DateOfBirth && DBUser?.DateOfBirth}
            />
          </div>
        </div>

        {/* Email */}
        <div className="relative mb-6">
          <label className="flex  items-center mb-2 text-gray-600 text-sm font-medium">
            Email{" "}
            <svg
              width={7}
              height={7}
              className="ml-1"
              viewBox="0 0 7 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z"
                fill="#EF4444"
              />
            </svg>
          </label>
          <div className="relative  text-gray-500 focus-within:text-gray-400 mb-6">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ">
              <svg
                className="stroke-current ml-1"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.54887 6.73325L7.76737 9.36216C9.82591 10.645 10.8552 11.2864 11.9999 11.2863C13.1446 11.2861 14.1737 10.6443 16.2318 9.36081L20.4611 6.72333M11 20H13C16.7712 20 18.6569 20 19.8284 18.8284C21 17.6569 21 15.7712 21 12C21 8.22876 21 6.34315 19.8284 5.17157C18.6569 4 16.7712 4 13 4H11C7.22876 4 5.34315 4 4.17157 5.17157C3 6.34315 3 8.22876 3 12C3 15.7712 3 17.6569 4.17157 18.8284C5.34315 20 7.22876 20 11 20Z"
                  stroke=""
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <input
              type="text"
              name="email"
              id="default-search"
              className="block w-full h-11 pr-5 pl-12 py-2.5 text-base font-normal shadow-xs text-gray-400 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
              defaultValue={DBUser?.email}
            />
          </div>
        </div>

        {/* Address */}
        <div className="relative mb-6">
          <label className="flex  items-center mb-2 text-gray-600 text-sm font-medium">
            Address{" "}
            <svg
              width={7}
              height={7}
              className="ml-1"
              viewBox="0 0 7 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z"
                fill="#EF4444"
              />
            </svg>
          </label>
          <div className="relative  text-gray-500 focus-within:text-gray-400 mb-6">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  strokeLinecap="round"
                  stroke-linejoin="round"
                  d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
                <path
                  strokeLinecap="round"
                  stroke-linejoin="round"
                  d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                />
              </svg>
            </div>
            <input
              type="text"
              name="address"
              id="default-search"
              className="block w-full h-11 pr-5 pl-12 py-2.5 text-base font-normal shadow-xs text-gray-400 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
              defaultValue={DBUser?.address && DBUser?.address}
              placeholder="ex. Dhaka, Bangladesh"
            />
          </div>
        </div>
        <div className="relative mb-6">
          <label className="flex  items-center mb-2 text-gray-600 text-sm font-medium">
            Phone Number{" "}
            <svg
              width={7}
              height={7}
              className="ml-1"
              viewBox="0 0 7 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z"
                fill="#EF4444"
              />
            </svg>
          </label>
          <div className="relative  text-gray-500 focus-within:text-gray-400 mb-6">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ">
              <svg
                className="stroke-current ml-1"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.02623 10.2611L12.7387 17.9736C14.4091 19.6439 17.1173 19.6439 18.7877 17.9736C19.4559 17.3054 19.4559 16.2221 18.7877 15.554L16.6454 13.4116C16.1582 12.9244 15.3683 12.9244 14.8811 13.4116C14.3939 13.8988 13.604 13.8988 13.1168 13.4116L9.23534 9.53015C8.74814 9.04295 8.74814 8.25305 9.23534 7.76585C9.72253 7.27865 9.72253 6.48875 9.23534 6.00155L7.44584 4.21205C6.77768 3.5439 5.69439 3.5439 5.02623 4.21205C3.35584 5.88244 3.35584 8.59067 5.02623 10.2611Z"
                  stroke=""
                  strokeWidth="1.6"
                />
              </svg>
            </div>
            <input
              type="text"
              name="phone_number"
              id="default-search"
              className="block w-full h-11 pr-5 pl-12 py-2.5 text-base font-normal shadow-xs text-gray-400 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
              defaultValue={DBUser?.phone_number && DBUser?.phone_number}
              placeholder="ex. 016........"
            />
          </div>
        </div>
        {/* Work at */}
        <div className="relative mb-2">
          <label className="flex  items-center mb-2 text-gray-600 text-sm font-medium">
            Work At{" "}
            <svg
              width={7}
              height={7}
              className="ml-1"
              viewBox="0 0 7 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z"
                fill="#EF4444"
              />
            </svg>
          </label>
          <div className="relative  text-gray-500 focus-within:text-gray-400 mb-6">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ">
              <svg
                className="stroke-current ml-1"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17 10H8M17 10V10C17.93 10 18.395 10 18.7765 10.1022C19.8117 10.3796 20.6204 11.1883 20.8978 12.2235C21 12.605 21 13.07 21 14C21 14.6667 21 15.3333 21 16C21 18.8284 21 20.2426 20.1213 21.1213C19.2426 22 17.8284 22 15 22C13.3333 22 11.6667 22 10 22C7.17157 22 5.75736 22 4.87868 21.1213C4 20.2426 4 18.8284 4 16C4 15.3333 4 14.6667 4 14C4 13.07 4 12.605 4.10222 12.2235C4.37962 11.1883 5.18827 10.3796 6.22354 10.1022C6.60504 10 7.07003 10 8 10V10M17 10V6.5C17 4.01472 14.9853 2 12.5 2C10.0147 2 8 4.01472 8 6.5V10M15 15.5C15 16.8807 13.8807 18 12.5 18C11.1193 18 10 16.8807 10 15.5C10 14.1193 11.1193 13 12.5 13C13.8807 13 15 14.1193 15 15.5Z"
                  stroke=""
                  strokeWidth="1.5"
                />
              </svg>
            </div>
            <input
              type="text"
              name="workAt"
              id="default-search"
              className="block w-full h-11 pr-5 pl-12 py-2.5 text-base font-normal shadow-xs text-gray-400 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
              defaultValue={DBUser?.workAt && DBUser?.workAt}
              placeholder="Work At "
            />
          </div>
        </div>

        {/* Bio */}
        <div className="relative mb-2">
          <label className="flex  items-center mb-2 text-gray-600 text-sm font-medium">
            Bio{" "}
            <svg
              width={7}
              height={7}
              className="ml-1"
              viewBox="0 0 7 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.11222 6.04545L3.20668 3.94744L1.43679 5.08594L0.894886 4.14134L2.77415 3.18182L0.894886 2.2223L1.43679 1.2777L3.20668 2.41619L3.11222 0.318182H4.19105L4.09659 2.41619L5.86648 1.2777L6.40838 2.2223L4.52912 3.18182L6.40838 4.14134L5.86648 5.08594L4.09659 3.94744L4.19105 6.04545H3.11222Z"
                fill="#EF4444"
              />
            </svg>
          </label>
          <div className="relative  text-gray-500 focus-within:text-gray-400 mb-6">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ">
              <svg
                className="stroke-current ml-1"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17 10H8M17 10V10C17.93 10 18.395 10 18.7765 10.1022C19.8117 10.3796 20.6204 11.1883 20.8978 12.2235C21 12.605 21 13.07 21 14C21 14.6667 21 15.3333 21 16C21 18.8284 21 20.2426 20.1213 21.1213C19.2426 22 17.8284 22 15 22C13.3333 22 11.6667 22 10 22C7.17157 22 5.75736 22 4.87868 21.1213C4 20.2426 4 18.8284 4 16C4 15.3333 4 14.6667 4 14C4 13.07 4 12.605 4.10222 12.2235C4.37962 11.1883 5.18827 10.3796 6.22354 10.1022C6.60504 10 7.07003 10 8 10V10M17 10V6.5C17 4.01472 14.9853 2 12.5 2C10.0147 2 8 4.01472 8 6.5V10M15 15.5C15 16.8807 13.8807 18 12.5 18C11.1193 18 10 16.8807 10 15.5C10 14.1193 11.1193 13 12.5 13C13.8807 13 15 14.1193 15 15.5Z"
                  stroke=""
                  strokeWidth="1.5"
                />
              </svg>
            </div>
            <input
              type="text"
              name="bio"
              id="default-search"
              className="block w-full h-11 pr-5 pl-12 py-2.5 text-base font-normal shadow-xs text-gray-400 bg-transparent border border-gray-300 rounded-full placeholder-gray-400 focus:outline-none"
              defaultValue={DBUser?.bio && DBUser?.bio}
              placeholder="Enter Bio"
            />
          </div>
        </div>

        <div className="flex items-center justify-center">
          <button className="w-52 h-12 shadow-sm rounded-full bg-indigo-600 hover:bg-indigo-800 transition-all duration-700 text-white text-base font-semibold leading-7">
            Submit
          </button>
        </div>
      </form>
    </motion.div>
  );
}
