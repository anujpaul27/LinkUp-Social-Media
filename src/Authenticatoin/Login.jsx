import { useContext, useState } from "react";
import { UserContext } from "../Context/ContextProvider";
import { useNavigate } from "react-router";

function Login() {
  const [error,setError] = useState("")
  const {Login} = useContext(UserContext);
  const navigation = useNavigate()

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formValue = new FormData(form)
    const Obj = Object.fromEntries(formValue.entries())

    Login(Obj.email, Obj.password)
    .then(res=> {
      console.log(res);
      navigation('/')
    })
    .catch(error=> {
      setError(error.message);
    })

  }

  return (
    <section className="py-16 bg-base-200">
      <div className="max-w-md mx-auto bg-gray-800 p-8 rounded-xl shadow-2xl">
        <h2 className="flex justify-center items-center gap-3 text-3xl font-bold text-center mb-8 text-pink-400">
          <img className="w-10" src="/LinkUpLogo.png" alt="logo" />
          LinkUp
        </h2>
        <h2 className="text-3xl font-bold text-center mb-8 text-white bg-gray-700 rounded-full py-2">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
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

          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-sm font-semibold">{error}</p>
          )}

          {/* Forget password */}
          <button className="btn btn-link">Forget Password</button>

          {/* Buttons */}
          <div className="flex w-full gap-4 pt-4">
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
        </form>
      </div>
    </section>
  );
}

export default Login;
