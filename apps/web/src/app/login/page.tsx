import { User, Lock } from "lucide-react";

export default function Login() {
  return (
    <section className="h-screen relative flex flex-col justify-center items-center bg-black">
      {/* Background */}
      <img
        src="https://portal.svkm.ac.in/usermgmt/resources/images/login-bg.jpg"
        alt="background"
        className="absolute inset-0 z-0 w-screen h-screen object-cover "
      />

      {/* Card */}
      <div className="p-8 sm:p-10 bg-white z-10 flex flex-col justify-around items-center gap-6  w-[90%] h-[55vh] max-w-lg shadow-2xl">
        {/* Logo */}
        <img
          src="https://portal.svkm.ac.in/usermgmt/resources/images/logo.gif"
          alt="NMIMS Logo"
          className="w-40"
        />
        <div className="space-y-6">
          {/* Heading */}
          <h1 className="text-xl sm:text-2xl  font-semibold text-zinc-900 text-center mt-10">
            Welcome to Placement Management
          </h1>
          <div className="w-full space-y-6">
            {/* Username */}
            <div className="flex items-center w-full border rounded-full pgap-2">
              <User
                size={10}
                className=" h-full bg-gray-300 text-zinc-600 px-3 py-2 w-10 rounded-l-full "
              />
              <input
                type="text"
                placeholder="Username"
                className="flex-1 outline-none text-sm text-zinc-800 placeholder:text-zinc-400 px-3 py-2 "
              />
            </div>

            {/* Password */}
            <div className="flex items-center w-full border rounded-full pgap-2">
              <Lock
                size={10}
                className=" h-full bg-gray-300 text-zinc-600 px-3 py-2 w-10 rounded-l-full "
              />
              <input
                type="password"
                placeholder="Password"
                className="flex-1 outline-none text-sm text-zinc-800 placeholder:text-zinc-400 px-3 py-2 "
              />
            </div>
          </div>

          {/* Show password */}
          <div className="w-full flex items-center gap-2 text-sm">
            <input type="checkbox" id="showPassword" className="rounded" />
            <label htmlFor="showPassword" className="text-zinc-600">
              Show Password
            </label>
          </div>

          {/* Login button */}
          <button className="w-full bg-nmims hover:bg-nmims/70 text-white py-2 font-medium rounded">
            Login
          </button>

          {/* Forgot password */}
          <a href="#" className="text-sm text-zinc-600 hover:underline">
            Forgot Password?
          </a>
        </div>{" "}
      </div>
    </section>
  );
}
