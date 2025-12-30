import { useContext, useState } from "react";
import { UserContext } from "../Context/ContextProvider";
import { useNavigate } from "react-router";

function Registration() {
  const [error, setError] = useState("");
  const { SignUp } = useContext(UserContext);
  const navigation = useNavigate()

  // Password validation function
  function validatePassword(password) {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      return "Password must be at least 8 characters long.";
    }
    if (!hasUpperCase) {
      return "Password must contain at least one uppercase letter.";
    }
    if (!hasLowerCase) {
      return "Password must contain at least one lowercase letter.";
    }
    if (!hasNumber) {
      return "Password must contain at least one number.";
    }
    if (!hasSpecialChar) {
      return "Password must contain at least one special character.";
    }
    return "";
  }

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formValue = new FormData(form);
    const Obj = Object.fromEntries(formValue.entries());

    const Validation = validatePassword(Obj.password);
    {
      if (Validation) {
        setError(Validation);
        return;
      }
    }

    SignUp(Obj.email, Obj.password)
      .then((res) => {
        console.log(res);
        navigation('/login')
      })
      .catch((error) => {
        setError(error.message);
      });
  }

  return (
    <section className="py-10 bg-base-200">
      <div className="max-w-lg mx-auto bg-gray-800 p-8 lg:px-20 py-10 rounded-xl shadow-2xl">
        <h2 className="flex justify-center items-center gap-3 text-3xl font-bold text-center mb-8 text-primary">
          <img className="w-10" src="/LinkUpLogo.png" alt="logo" />
          <p className="text-pink-400">LinkUp</p>
        </h2>

        <h2 className="text-3xl font-bold text-center mb-8 text-white bg-gray-700 rounded-full py-2">
          Registration
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div className="form-control">
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              className="input input-bordered rounded-full w-full"
              required
            />
          </div>

          {/* Email Field */}
          <div className="form-control">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="input input-bordered rounded-full w-full"
              required
            />
          </div>

          {/* Password Field */}
          <div className="form-control">
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="input input-bordered rounded-full w-full"
              required
            />
          </div>
          {/* PhotoURL Field */}
          <div className="form-control">
            <input
              type="text"
              name="photoURL"
              placeholder="Enter your photoURL"
              className="input input-bordered rounded-full w-full"
              required
            />
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-sm font-semibold">{error}</p>
          )}

          {/* Buttons */}
          <div className="flex  gap-4 pt-4">
            <button
              type="submit"
              className="btn btn-primary flex-1 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all"
            >
              Submit
            </button>
            <button
              type="reset"
              className="btn btn-outline btn-secondary flex-1 rounded-full"
            >
              Reset
            </button>
          </div>

          {/* Social Login Buttons */}
          <div className="flex justify-around">
            {/* Google */}
            <button className="btn rounded-full bg-white text-black border-[#e5e5e5]">
              <svg
                aria-label="Email icon"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2"
                  fill="none"
                  stroke="black"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </g>
              </svg>
              Login with Google
            </button>

            {/* GitHub */}
            <button className="btn rounded-full bg-white text-black border-[#e5e5e5]">
              <svg
                aria-label="GitHub logo"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  fill="black"
                  d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"
                ></path>
              </svg>
              Login with GitHub
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Registration;
