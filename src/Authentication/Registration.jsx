import { useContext, useState } from "react";
import { UserContext } from "../Context/ContextProvider";
import { useNavigate } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";

function Registration() {
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { SignUp, loading: contextLoading } = useContext(UserContext);
  const navigate = useNavigate();

  // Password validation
  const validatePassword = (password) => {
    if (password.length < 8) return "Password must be at least 8 characters long.";
    if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter.";
    if (!/[a-z]/.test(password)) return "Password must contain at least one lowercase letter.";
    if (!/[0-9]/.test(password)) return "Password must contain at least one number.";
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) 
      return "Password must contain at least one special character.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Validation
    const passError = validatePassword(data.password);
    if (passError) {
      setError(passError);
      setIsSubmitting(false);
      return;
    }

    try {
      // 1. Upload Image First
      const imageFormData = new FormData();
      imageFormData.append("image", data.photoURL);

      const imgRes = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/registration/image-upload`,
        imageFormData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const photoURL = imgRes.data.url;

      // 2. Firebase Signup
      const userCredential = await SignUp(data.email, data.password);
      const uid = userCredential.user.uid;

      // 3. Save user data to backend
      const userData = {
        uid,
        name: data.name,
        email: data.email,
        DateOfBirth: data.DateOfBirth,
        photoURL,
      };

      await axios.post(`${import.meta.env.VITE_API_URL}/api/user/create-user`, userData);

      // 4. Create social/following document
      const friendObj = { uid, following: [], followers: [] };
      await axios.post(`${import.meta.env.VITE_API_URL}/following`, friendObj);

      Swal.fire({
        icon: "success",
        title: "Registration Successful!",
        text: "Please login to continue",
        timer: 2000,
        showConfirmButton: false,
      });

      form.reset();
      navigate("/login");

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.message || "Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleComingSoon = () => {
    Swal.fire("This feature is coming soon!", "", "info");
  };

  return (
    <section className="min-h-screen py-12 bg-base-200 flex items-center">
      <div className="max-w-lg mx-auto w-full px-4">
        <div className="bg-gray-800 p-8 lg:px-12 py-10 rounded-3xl shadow-2xl">
          {/* Header */}
          <div className="flex justify-center items-center gap-3 mb-8">
            <img className="w-12" src="/LinkUpLogo.png" alt="LinkUp Logo" />
            <h1 className="text-4xl font-bold text-pink-400">LinkUp</h1>
          </div>

          <h2 className="text-3xl font-semibold text-center text-white mb-10">
            Create Your Account
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div className="form-control">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="input input-bordered w-full rounded-full focus:input-primary"
                required
              />
            </div>

            {/* Email */}
            <div className="form-control">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="input input-bordered w-full rounded-full focus:input-primary"
                required
              />
            </div>

            {/* Password */}
            <div className="form-control">
              <input
                type="password"
                name="password"
                placeholder="Create Password"
                className="input input-bordered w-full rounded-full focus:input-primary"
                required
              />
            </div>

            {/* Date of Birth */}
            <div className="form-control">
              <input
                type="date"
                name="DateOfBirth"
                className="input input-bordered w-full rounded-full focus:input-primary"
                required
              />
            </div>

            {/* Profile Picture */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-300">Profile Picture</span>
              </label>
              <input
                type="file"
                name="photoURL"
                accept="image/*"
                className="file-input file-input-bordered w-full rounded-full"
                required
              />
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-red-500 text-sm font-medium text-center bg-red-950/50 py-2 px-4 rounded-2xl">
                {error}
              </p>
            )}

            {/* Submit Button - Dynamic */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary w-full rounded-full text-lg font-semibold h-12 shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="loading loading-spinner loading-md"></span>
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>

            {/* Reset Button */}
            <button
              type="reset"
              className="btn btn-outline btn-secondary w-full rounded-full"
            >
              Clear Form
            </button>
          </form>

          {/* Social Login */}
          <div className="divider my-8 text-gray-400">OR</div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={handleComingSoon}
              className="btn bg-white text-black hover:bg-gray-100 border border-gray-300 rounded-full flex items-center gap-2"
            >
              <img src="https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png" 
                   alt="Google" className="w-5 h-5" />
              Google
            </button>

            <button
              onClick={handleComingSoon}
              className="btn bg-white text-black hover:bg-gray-100 border border-gray-300 rounded-full flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 22c-5.523 0-10-4.477-10-10s4.477-10 10-10 10 4.477 10 10-4.477 10-10 10zm-2-15.5l7 7-7 7v-14z" />
              </svg>
              GitHub
            </button>
          </div>

          <p className="text-center text-gray-400 mt-6 text-sm">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-pink-400 hover:underline cursor-pointer font-medium"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Registration;