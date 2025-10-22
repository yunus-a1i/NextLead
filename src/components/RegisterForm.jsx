import { useState } from "react";
import { createUser } from "../redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Lock, Phone, ArrowRight } from "lucide-react";
import { createHr } from "../redux/hrSlice";

export default function RegisterForm() {
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    contact: "",
  });
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (role === "candidate") {
        await dispatch(createUser(form)).unwrap();
      } else {
        await dispatch(createHr(form)).unwrap();
      }
      alert("Registration successful");
      navigate(`/login?role=${role}`);
    } catch (err) {
      alert(err.message || "Registration failed");
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
              Create Account
            </h1>
            <p className="text-gray-500 text-sm font-light tracking-wide">
              Join our exclusive career platform
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
            {/* Name Field */}
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-xs font-light text-gray-600 tracking-wide uppercase"
              >
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 text-gray-800 font-light tracking-wide focus:border-gray-500 focus:outline-none transition-colors duration-500"
                  required
                />
              </div>
            </div>

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
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
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
                  name="password"
                  type="password"
                  placeholder="Create a password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 text-gray-800 font-light tracking-wide focus:border-gray-500 focus:outline-none transition-colors duration-500"
                  required
                />
              </div>
            </div>

            {/* Contact Field */}
            <div className="space-y-2">
              <label
                htmlFor="contact"
                className="text-xs font-light text-gray-600 tracking-wide uppercase"
              >
                Contact Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  id="contact"
                  name="contact"
                  placeholder="Enter your contact number"
                  value={form.contact}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 text-gray-800 font-light tracking-wide focus:border-gray-500 focus:outline-none transition-colors duration-500"
                />
              </div>
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-3 border border-red-200 bg-red-50/50">
                    <p className="text-red-700 text-sm font-light">{error}</p>
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
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </>
              )}
            </motion.button>
          </form>

          {/* Login Link */}
          <motion.div
            className="mt-8 text-center border-t border-gray-100 pt-6"
            variants={itemVariants}
          >
            <p className="text-gray-500 text-sm font-light tracking-wide">
              Already have an account?{" "}
              <a
                href={`/login?role=${role}`}
                className="text-gray-800 hover:text-gray-600 font-normal transition-colors duration-500 inline-flex items-center space-x-1 group"
              >
                <span>Sign In</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </p>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.div className="text-center mt-8" variants={itemVariants}>
          <p className="text-gray-400 text-xs font-light tracking-wide">
            By registering, you agree to our Terms and Privacy Policy
          </p>
        </motion.div>
      </div>
    </div>
  );
}
