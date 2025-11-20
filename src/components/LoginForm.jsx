import { useState } from "react";
import { loginUser } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, ArrowRight, UserPlus } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { loginHr } from "../redux/hrSlice";
import { useToasts } from "./Toast";

export default function LoginForm() {
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role"); // "candidate"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, hr } = useSelector((state) => state);
  const loading = role === "candidate" ? user.loading : hr.loading;
  const isError = role === "candidate" ? user.error : hr.error;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { success, error } = useToasts();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { email, password };

    try {
      if (role === "candidate") {
        await dispatch(loginUser(data)).unwrap();
      } else {
        await dispatch(loginHr(data)).unwrap();
      }
      success("Login Successfully!");
      navigate(
        role === "candidate" ? "/candidate/dashboard" : "/recruiter/dashboard"
      );
    } catch (err) {
      error(err?.message || err);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.8,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <motion.div
          className="text-center mb-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Logo */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center mb-8"
          >
            <div className="w-12 h-12 border border-gray-300 flex items-center justify-center mr-3">
              <span className="text-gray-800 font-light text-xl tracking-tight">
                N
              </span>
            </div>
            <span className="text-2xl font-light text-gray-800 tracking-wide">
              NextLead
            </span>
          </motion.div>

          {/* Header */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="w-16 h-px bg-gray-300 mx-auto"></div>
            <h1 className="text-2xl font-light text-gray-800 tracking-wide">
              Welcome Back
            </h1>
            <p className="text-gray-500 text-sm font-light tracking-wide">
              Sign in to your account
            </p>
            <div className="w-16 h-px bg-gray-300 mx-auto"></div>
          </motion.div>
        </motion.div>

        {/* Form Card */}
        <motion.div
          variants={itemVariants}
          className="bg-white border border-gray-200 p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-xs font-light text-gray-600 tracking-wide uppercase"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 text-gray-800 font-light tracking-wide focus:border-gray-500 focus:outline-none transition-colors duration-500"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-xs font-light text-gray-600 tracking-wide uppercase"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 text-gray-800 font-light tracking-wide focus:border-gray-500 focus:outline-none transition-colors duration-500"
                  required
                />
              </div>
            </div>

            {/* Forgot Password Link */}
            <motion.div
              className="text-right"
              whileHover={{ x: 2 }}
              transition={{ duration: 0.3 }}
            >
              <a
                href="/forgot-password"
                className="text-xs text-gray-600 hover:text-gray-800 font-light tracking-wide transition-colors duration-500"
              >
                Forgot your password?
              </a>
            </motion.div>

            {/* Error Message */}
            <AnimatePresence>
              {isError && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-3 border border-red-200 bg-red-50/50">
                    <p className="text-red-700 text-sm font-light">{isError}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              className="w-full border border-gray-800 text-gray-800 py-3 font-light tracking-wide text-sm hover:bg-gray-800 hover:text-white disabled:bg-gray-300 disabled:border-gray-300 disabled:text-gray-500 transition-all duration-500 flex items-center justify-center space-x-2 group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border border-current border-t-transparent rounded-full animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </>
              )}
            </motion.button>
          </form>

          {/* Divider */}
          <motion.div
            className="mt-8 pt-6 border-t border-gray-100"
            variants={itemVariants}
          >
            <p className="text-center text-gray-500 text-xs font-light tracking-wide mb-4">
              Or continue with
            </p>

            {/* Social Login Options */}
            <div className="grid grid-cols-1 gap-3">
              <motion.button
                type="button"
                className="flex items-center justify-center space-x-2 py-2.5 border border-gray-300 text-gray-600 font-light tracking-wide text-sm hover:border-gray-400 transition-all duration-500"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                <span className="text-xs">Google</span>
              </motion.button>

              {/* <motion.button
                type="button"
                className="flex items-center justify-center space-x-2 py-2.5 border border-gray-300 text-gray-600 font-light tracking-wide text-sm hover:border-gray-400 transition-all duration-500"
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
                <span className="text-xs">Twitter</span>
              </motion.button> */}
            </div>
          </motion.div>

          {/* Register Link */}
          <motion.div
            className="mt-8 text-center border-t border-gray-100 pt-6"
            variants={itemVariants}
          >
            <p className="text-gray-500 text-sm font-light tracking-wide">
              Don't have an account?{" "}
              <a
                href={`/register?role=${role}`}
                className="text-gray-800 hover:text-gray-600 font-normal transition-colors duration-500 inline-flex items-center space-x-1 group"
              >
                <span>Create Account</span>
                <UserPlus className="w-3 h-3 group-hover:scale-110 transition-transform duration-300" />
              </a>
            </p>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.div className="text-center mt-8" variants={itemVariants}>
          <p className="text-gray-400 text-xs font-light tracking-wide">
            Secure login with encrypted credentials
          </p>
        </motion.div>
      </div>
    </div>
  );
}
