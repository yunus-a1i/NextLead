// pages/Home.jsx
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import SearchBar from "../components/SearchBar";
import InterviewCard from "../components/InterviewCard";

export default function Home() {
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    // Simulate API call with delay
    setTimeout(() => {
      setInterviews([
        {
          id: 1,
          title: "Frontend Developer",
          company: "Tech Innovations Inc.",
          location: "San Francisco, CA",
          description:
            "Looking for React developers with 3+ years of experience. Immediate hiring process with competitive salary.",
          date: "Today, 10:00 AM",
          salary: "$80K - $110K",
        },
        // ... more interview objects
      ]);
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <HeroSection />
      <SearchBar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 ">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Post a New Interview
        </h2>
        {/* <PostInterviewForm onPosted={loadInterviews} /> */}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
          Available Interviews
          <span className="text-gray-500 text-lg font-normal ml-2">
            ({interviews.length} results)
          </span>
        </h2>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-5 shadow-sm animate-pulse"
              >
                <div className="h-5 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>
                <div className="space-y-3">
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                </div>
                <div className="flex justify-between mt-6">
                  <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {interviews.map((intv) => (
              <InterviewCard key={intv.id} interview={intv} />
            ))}
          </div>
        )}
      </div>

      {!isLoading && interviews.length === 0 && (
        <div className="max-w-3xl mx-auto text-center py-16">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold text-gray-700 mb-2">
            No interviews found
          </h3>
          <p className="text-gray-600">
            Try adjusting your search filters to find more opportunities
          </p>
        </div>
      )}
    </div>
  );
}
