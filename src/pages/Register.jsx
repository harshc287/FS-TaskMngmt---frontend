import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser } from "../api/UserApi";
import { Mail, Lock, User, Eye, EyeOff, Shield, MapPin } from "lucide-react";
import PageWrapper from "../components/PageWrapper";
import { useState } from "react";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const password = watch("password", "");

  const onSubmit = async (data) => {
    try {
      // Remove confirmPassword and terms from data before sending to backend
      const { confirmPassword, terms, ...userData } = data;
      
      // Set role if not provided (default is "user" from backend)
      if (!userData.role) {
        userData.role = "user";
      }
      
      await registerUser(userData);
      toast.success("Account created successfully! Please login.");
      navigate("/login");
    } catch (err) {
      // Your backend returns {msg: "error message"} not {message: "error message"}
      toast.error(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <PageWrapper>
      <div className="min-h-screen flex items-center justify-center bg-black px-4 py-8">
        <div className="w-full max-w-lg">
          {/* Logo/Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Task Management</h1>
            <p className="text-zinc-400">Create your account to get started</p>
          </div>

          {/* Registration Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 shadow-2xl"
          >
            <h2 className="text-2xl font-bold text-white mb-6 text-center">
              Create Account
            </h2>

            {/* Name Field - Required */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Full Name *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-zinc-500" />
                </div>
                <input
                  type="text"
                  {...register("name", { 
                    required: "Name is required",
                    minLength: {
                      value: 2,
                      message: "Name must be at least 2 characters"
                    }
                  })}
                  className="block w-full pl-10 pr-3 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="John Doe"
                  autoComplete="name"
                />
              </div>
              {errors.name && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email Field - Required */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Email Address *
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

            {/* Password Field - Required */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Password *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-zinc-500" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", { 
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters"
                    }
                  })}
                  className="block w-full pl-10 pr-10 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="••••••••"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-white"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.password.message}
                </p>
              )}
              <div className="mt-2">
                <p className="text-xs text-zinc-500">
                  Minimum 6 characters
                </p>
              </div>
            </div>

            {/* Confirm Password Field - Required (frontend only) */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Confirm Password *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-zinc-500" />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword", { 
                    required: "Please confirm your password",
                    validate: value => value === password || "Passwords do not match"
                  })}
                  className="block w-full pl-10 pr-10 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="••••••••"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-white"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Address Field - Optional */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Address (Optional)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-zinc-500" />
                </div>
                <input
                  type="text"
                  {...register("address")}
                  className="block w-full pl-10 pr-3 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="123 Main St, City, Country"
                  autoComplete="street-address"
                />
              </div>
              <p className="mt-2 text-xs text-zinc-500">
                Optional: Provide your address for delivery purposes
              </p>
            </div>

            {/* Role Field - Optional (if you want users to choose role during registration) */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-zinc-300 mb-2">
                Account Type (Optional)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Shield className="h-5 w-5 text-zinc-500" />
                </div>
                <select
                  {...register("role")}
                  className="block w-full pl-10 pr-3 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent appearance-none"
                  defaultValue="user"
                >
                  <option value="user">User (Default)</option>
                  <option value="admin">Administrator</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-zinc-500">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
              <p className="mt-2 text-xs text-zinc-500">
                Default is "User". Administrator accounts have full access to all features.
              </p>
            </div>

            {/* Terms and Conditions - Frontend only */}
            <div className="mb-6">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  {...register("terms", { 
                    required: "You must accept the terms and conditions"
                  })}
                  id="terms"
                  className="h-4 w-4 mt-1 text-amber-500 bg-zinc-800 border-zinc-700 rounded focus:ring-amber-500 focus:ring-2"
                />
                <label htmlFor="terms" className="ml-2 text-sm text-zinc-400">
                  I agree to the{" "}
                  <a href="#" className="text-amber-500 hover:text-amber-400">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-amber-500 hover:text-amber-400">
                    Privacy Policy
                  </a>
                </label>
              </div>
              {errors.terms && (
                <p className="mt-2 text-sm text-red-400">
                  {errors.terms.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 bg-amber-500 text-black font-semibold rounded-lg hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-zinc-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-6"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </span>
              ) : "Create Account"}
            </button>

            {/* Login Link */}
            <div className="text-center">
              <p className="text-sm text-zinc-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-amber-500 hover:text-amber-400 transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </form>

          {/* Security Info */}
          <div className="mt-8 p-4 bg-zinc-900 border border-zinc-800 rounded-lg">
            <h3 className="text-sm font-medium text-white mb-2 flex items-center gap-2">
              <Shield size={16} className="text-amber-500" />
              Security Information
            </h3>
            <ul className="text-xs text-zinc-500 space-y-1">
              <li>• Passwords are securely hashed and never stored in plain text</li>
              <li>• All data is encrypted in transit using HTTPS</li>
              <li>• Your information is protected by industry-standard security measures</li>
            </ul>
          </div>

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

export default Register;