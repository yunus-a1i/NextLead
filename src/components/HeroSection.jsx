// components/HeroSection.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function HeroSection() {

  return (
    <section className="relative bg-gradient-to-r from-blue-500 to-indigo-600 py-20 md:py-28 text-center overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-white"></div>
        <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-white"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
          Find <span className="text-blue-200">Walk-In Interviews</span> Near You
        </h2>
        <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto mb-8">
          Discover, filter, and apply for walk-in opportunities in seconds with our powerful platform.
        </p>
        <Link className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-lg transform hover:-translate-y-1 transition-transform duration-300 hover:shadow-xl">
          Get Started
        </Link>
      </div>
    </section>
  );
}