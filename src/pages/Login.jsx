import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, getLoggedUser } from "../api/UserApi";
import { Mail, Lock } from "lucide-react";
import PageWrapper from "../components/PageWrapper";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await loginUser(data);
      localStorage.setItem("token", res.data.token);
      
      // Fetch user info after successful login
      try {
        const userRes = await getLoggedUser();
        localStorage.setItem("user", JSON.stringify(userRes.data));
      } catch (userError) {
        console.warn("Could not fetch user details:", userError);
        // Create a minimal user object from login data
        const tempUser = {
          name: data.email.split('@')[0],
          email: data.email,
          role: 'user'
        };
        localStorage.setItem("user", JSON.stringify(tempUser));
      }
      
      toast.success("Welcome back!");
      navigate("/dashboard");
    } catch (error) {
      // Your backend returns {msg: "error message"} not {message: "error message"}
      toast.error(error.response?.data?.msg || "Login failed");
    }
  };

  return (
    <PageWrapper>
      <div className="min-h-screen flex items-center justify-center bg-black px-4">
        <div className="w-full max-w-md">
          {/* Logo/Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Task Management</h1>
            <p className="text-zinc-400">Sign in to your account</p>
          </div>

          {/* Login Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 shadow-2xl"
          >
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Welcome Back
            </h2>

            {/* Email Field */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-zinc-500" />
                </div>
                <input
                  type="email"
                  {...register("email", { 
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                  className="block w-full pl-10 pr-3 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-zinc-500" />
                </div>
                <input
                  type="password"
                  {...register("password", { 
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters"
                    }
                  })}
                  className="block w-full pl-10 pr-3 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 bg-amber-500 text-black font-semibold rounded-lg hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-zinc-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : "Sign In"}
            </button>

            {/* Register Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-zinc-400">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="font-medium text-amber-500 hover:text-amber-400 transition-colors"
                >
                  Sign up
                </Link>
              </p>
            </div>

            {/* Demo credentials hint */}
            <div className="mt-8 p-4 bg-zinc-800/50 rounded-lg border border-zinc-700">
              <p className="text-xs text-zinc-400 mb-1">Demo credentials:</p>
              <p className="text-xs text-zinc-500">Email: admin@example.com</p>
              <p className="text-xs text-zinc-500">Password: password123</p>
            </div>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm text-zinc-500">
              © {new Date().getFullYear()} Task Management System. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Login;