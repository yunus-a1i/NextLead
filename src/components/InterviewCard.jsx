// components/InterviewCard.jsx
import React from "react";
import { FiMapPin, FiClock, FiDollarSign, FiCheckCircle, FiChevronRight } from "react-icons/fi";

export default function InterviewCard({ interview }) {
  return (
    <div className="border border-gray-200 p-6 rounded-2xl shadow-xs bg-white transition-all duration-300 hover:shadow-lg hover:border-blue-200 hover:-translate-y-1.5">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-gray-900 truncate">
            {interview.title}
          </h3>
          <p className="text-gray-700 font-medium mt-1 truncate">
            {interview.qualifications}
          </p>
        </div>
        <span className="bg-green-50 text-green-700 text-xs px-3 py-1.5 rounded-full font-medium inline-flex items-center shrink-0">
          <FiCheckCircle className="mr-1.5" size={14} />
          Verified
        </span>
      </div>

      <div className="mt-5 flex flex-col sm:flex-row sm:flex-wrap gap-3">
        <div className="flex items-center text-gray-600 bg-gray-50 py-1.5 px-3 rounded-lg">
          <FiMapPin className="mr-2 text-gray-500" size={16} />
          <span className="text-sm">{interview.location}</span>
        </div>
        <div className="flex items-center text-gray-600 bg-gray-50 py-1.5 px-3 rounded-lg">
          <FiClock className="mr-2 text-gray-500" size={16} />
          <span className="text-sm">
            {new Date(interview.interviewDate).toLocaleDateString()}{" "}
            {interview.startTime && `at ${interview.startTime}`}
          </span>
        </div>
        {interview.salaryRange && (
          <div className="flex items-center text-gray-600 bg-gray-50 py-1.5 px-3 rounded-lg">
            <FiDollarSign className="mr-2 text-gray-500" size={16} />
            <span className="text-sm">{interview.salaryRange}</span>
          </div>
        )}
      </div>

      <p className="mt-5 text-gray-700 line-clamp-2 text-sm leading-relaxed">
        {interview.description}
      </p>

      <div className="mt-6 pt-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
        <span className="text-sm text-gray-500">
          Posted {new Date(interview.createdAt).toLocaleDateString()}
        </span>
        <button className="px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium flex items-center group">
          View Details
          <FiChevronRight className="ml-1.5 group-hover:translate-x-0.5 transition-transform" size={18} />
        </button>
      </div>
    </div>
  );
}
