import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  User,
  LogOut,
  Home,
  Briefcase,
  ChevronDown,
  ChevronRight
} from "lucide-react";
import LogoutModal from "./LogoutModal";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsOpen(false);
    navigate("/login");
  };

  const navItems = [
    { name: "Home", path: "/", icon: Home },
    ...(user?.role === "recruiter"
      ? [{ name: "Post Interview", path: "/post-interview", icon: Briefcase }]
      : [{ name: "View Jobs", path: "/interviews", icon: ChevronRight }]),
  ];

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, y: -10 },
    open: { opacity: 1, y: 0 },
  };

  return (
    <>
      <motion.nav
        className={`sticky top-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-lg shadow-sm border-b border-gray-100/50"
            : "bg-white/70 backdrop-blur-md"
        }`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <motion.div
              className="flex items-center cursor-pointer group"
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/")}
            >
              <div className="w-9 h-9 border border-gray-300 flex items-center justify-center mr-3 group-hover:border-gray-400 transition-colors duration-500">
                <span className="text-gray-800 font-light text-lg tracking-tight">
                  N
                </span>
              </div>
              <span className="text-2xl font-light text-gray-800 tracking-wide">
                NextLead
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <motion.div
                    key={item.name}
                    whileHover={{ y: -1 }}
                    whileTap={{ y: 0 }}
                  >
                    <Link
                      to={item.path}
                      className={`flex items-center space-x-2 px-1 py-2 font-light tracking-wide transition-all duration-500 ${
                        isActive
                          ? "text-gray-900 border-b border-gray-900"
                          : "text-gray-600 hover:text-gray-900"
                      }`}
                    >
                      <Icon
                        size={16}
                        className={isActive ? "text-gray-900" : "text-gray-500"}
                      />
                      <span className="text-sm">{item.name}</span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-6">
              {!user ? (
                <>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      to="/login"
                      className="text-gray-700 font-light tracking-wide text-sm hover:text-gray-900 transition-colors duration-500"
                    >
                      Sign In
                    </Link>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      to="/register"
                      className="border border-gray-800 text-gray-800 px-6 py-2.5 font-light tracking-wide text-sm hover:bg-gray-800 hover:text-white transition-all duration-500"
                    >
                      Get Started
                    </Link>
                  </motion.div>
                </>
              ) : (
                <motion.div className="flex items-center space-x-4" layout>
                  <motion.div
                    className="flex items-center space-x-3 cursor-pointer"
                    whileHover={{ x: 2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate("/candidate/profile")}
                  >
                    <div className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center">
                      <User size={14} className="text-gray-600" />
                    </div>
                    <div className="flex flex-col text-right">
                      <span className="text-sm font-normal text-gray-900 leading-none">
                        {user.name}
                      </span>
                      <span className="text-xs text-gray-500 capitalize font-light mt-1">
                        {user.role}
                      </span>
                    </div>
                  </motion.div>
                  <motion.button
                    onClick={() => setShowLogoutModal(true)}
                    className="flex items-center space-x-2 text-gray-500 hover:text-gray-700 font-light text-sm transition-colors duration-500"
                    whileHover={{ x: 2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <LogOut size={16} />
                  </motion.button>
                </motion.div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2 border border-gray-300 hover:border-gray-400 transition-colors duration-500"
              onClick={() => setIsOpen(!isOpen)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.3 }}
                  >
                    <X size={20} className="text-gray-600" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Menu size={20} className="text-gray-600" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="md:hidden absolute left-0 px-4 bg-white w-full overflow-hidden border-t border-gray-100/50"
                variants={mobileMenuVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                <div className="py-6 space-y-4">
                  {navItems.map((item, index) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                      <motion.div
                        key={item.name}
                        variants={itemVariants}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          to={item.path}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center space-x-3 px-2 py-3 font-light tracking-wide transition-all duration-500 ${
                            isActive
                              ? "text-gray-900 border-l-2 border-gray-900 bg-gray-50/50"
                              : "text-gray-600 hover:text-gray-900 hover:bg-gray-50/30"
                          }`}
                        >
                          <Icon
                            size={18}
                            className={
                              isActive ? "text-gray-900" : "text-gray-500"
                            }
                          />
                          <span>{item.name}</span>
                        </Link>
                      </motion.div>
                    );
                  })}

                  {/* Mobile Auth Buttons */}
                  <motion.div
                    className="pt-6 border-t border-gray-100/50 space-y-4"
                    variants={itemVariants}
                    transition={{ delay: navItems.length * 0.1 }}
                  >
                    {!user ? (
                      <>
                        <Link
                          to="/login"
                          onClick={() => setIsOpen(false)}
                          className="flex items-center justify-center w-full px-4 py-3 text-gray-700 font-light tracking-wide border border-gray-300 hover:border-gray-400 transition-all duration-500"
                        >
                          Sign In
                        </Link>
                        <Link
                          to="/register"
                          onClick={() => setIsOpen(false)}
                          className="flex items-center justify-center w-full px-4 py-3 bg-gray-800 text-white font-light tracking-wide hover:bg-gray-900 transition-all duration-500"
                        >
                          Get Started
                        </Link>
                      </>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3 px-2 py-3">
                          <div className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center">
                            <User size={16} className="text-gray-600" />
                          </div>
                          <div className="flex-1">
                            <div className="font-normal text-gray-900">
                              {user.name}
                            </div>
                            <div className="text-sm text-gray-500 capitalize font-light mt-1">
                              {user.role}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={handleLogout}
                          className="flex items-center justify-center w-full space-x-2 px-4 py-3 text-gray-600 font-light tracking-wide border border-gray-300 hover:border-gray-400 transition-all duration-500"
                        >
                          <LogOut size={16} />
                          <span>Logout</span>
                        </button>
                      </div>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
        user={user}
      />
    </>
  );
}
