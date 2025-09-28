// components/Navbar.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  return (
    <nav className="bg-white shadow-md px-4 sm:px-6 py-3 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600 flex items-center">
          <span className="bg-blue-600 text-white rounded-lg px-2 py-1 mr-2">
            N
          </span>
          NextLead
        </h1>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-8 text-gray-700 font-medium">
          <li className="hover:text-blue-600 transition-colors cursor-pointer">
            Home
          </li>
          {user?.role === "recruiter" && <li>Post Interview</li>}
          {!user ? (
            <Link
              className="hover:text-blue-600 transition-colors cursor-pointer"
              to={"/login"}
            >
              Login
            </Link>
          ) : (
            <button
              className="hover:text-blue-600 transition-colors cursor-pointer"
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                setUser(null);
                navigate("/login"); // redirect
              }}
            >
              Logout
            </button>
          )}
          <Link
            className="bg-blue-100 text-blue-600 px-4 py-1 rounded-full cursor-pointer hover:bg-blue-200 transition-colors"
            to={"/register"}
          >
            Sign Up
          </Link>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-500 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 py-2 shadow-lg">
          <ul className="space-y-3 pb-3">
            <li className="pt-2 border-t border-gray-100">Home</li>
            <li>Post Interview</li>
            <Link to={"/login"}>Login</Link>
            <Link
              className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full inline-block"
              to={"/register"}
            >
              Sign Up
            </Link>
          </ul>
        </div>
      )}
    </nav>
  );
}
