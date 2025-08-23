// components/InterviewCard.jsx
import React from "react";
import { FiMapPin, FiClock, FiDollarSign } from "react-icons/fi";

export default function InterviewCard({ interview }) {
  return (
    <div className="border border-gray-100 p-5 rounded-xl shadow-sm bg-white transition-all duration-300 hover:shadow-lg hover:border-blue-100 hover:-translate-y-1">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{interview.title}</h3>
          <p className="text-gray-600 font-medium">{interview.company}</p>
        </div>
        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
          Verified
        </span>
      </div>
      
      <div className="mt-4 flex flex-wrap gap-3">
        <div className="flex items-center text-gray-600">
          <FiMapPin className="mr-1" />
          <span>{interview.location}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <FiClock className="mr-1" />
          <span>{interview.date}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <FiDollarSign className="mr-1" />
          <span>{interview.salary}</span>
        </div>
      </div>
      
      <p className="mt-3 text-gray-700 line-clamp-2">{interview.description}</p>
      
      <div className="mt-5 flex justify-between items-center">
        <span className="text-sm text-gray-500">Posted 2 hours ago</span>
        <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium">
          View Details
        </button>
      </div>
    </div>
  );
}