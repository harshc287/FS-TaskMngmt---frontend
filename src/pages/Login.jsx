import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/UserApi";
import { Mail, Lock } from "lucide-react";
import PageWrapper from "../components/pageWrapper";

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
      toast.success("Welcome back");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <PageWrapper>
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl p-8 shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
      >
        <h2 className="text-3xl font-semibold text-center text-white tracking-wide">
          Welcome Back
        </h2>
        <p className="text-center text-sm text-zinc-400 mt-1 mb-8">
          Sign in to continue
        </p>

        {/* Email */}
        <div className="relative mb-6">
          <Mail className="absolute left-3 top-3.5 text-zinc-500 w-5 h-5" />
          <input
            {...register("email", { required: "Email is required" })}
            placeholder=" "
            className="peer w-full bg-transparent border border-white/10 rounded-lg px-10 py-3 text-white placeholder-transparent focus:outline-none focus:border-amber-400 transition"
          />
<label
  className="
    absolute left-10 top-3 text-zinc-500 text-sm
    transition-all
    peer-placeholder-shown:top-3
    peer-placeholder-shown:text-sm
    peer-focus:-top-2
    peer-focus:text-xs
    peer-not-placeholder-shown:-top-2
    peer-not-placeholder-shown:text-xs
    peer-focus:text-amber-400
    bg-zinc-950 px-1
  "
>
  Email
</label>

          {errors.email && (
            <p className="text-xs text-red-400 mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="relative mb-6">
          <Lock className="absolute left-3 top-3.5 text-zinc-500 w-5 h-5" />
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            placeholder=" "
            className="peer w-full bg-transparent border border-white/10 rounded-lg px-10 py-3 text-white placeholder-transparent focus:outline-none focus:border-amber-400 transition"
          />
<label
  className="
    absolute left-10 top-3 text-zinc-500 text-sm
    transition-all
    peer-placeholder-shown:top-3
    peer-placeholder-shown:text-sm
    peer-focus:-top-2
    peer-focus:text-xs
    peer-not-placeholder-shown:-top-2
    peer-not-placeholder-shown:text-xs
    peer-focus:text-amber-400
    bg-zinc-950 px-1
  "
>
  Password
</label>

          {errors.password && (
            <p className="text-xs text-red-400 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          disabled={isSubmitting}
          className="w-full py-3 rounded-lg bg-amber-400 text-black font-medium tracking-wide hover:bg-amber-300 transition disabled:opacity-50"
        >
          {isSubmitting ? "Signing in..." : "Sign In"}
        </button>

        <p className="text-center text-sm text-zinc-400 mt-6">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-amber-400 hover:text-amber-300 transition"
          >
            Create one
          </Link>
        </p>
      </form>
    </div>
    </PageWrapper>
  );
};

export default Login;
