import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  MapPin,
  Calendar,
  Building,
  Filter,
  ArrowRight,
  ChevronDown,
  Star,
  Clock,
  Users,
  Briefcase,
  X,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { getAllPostsThunk } from "../redux/postSlice";

export default function InterviewsPage() {
  const [selectedFilters, setSelectedFilters] = useState({
    location: "",
    date: "",
    company: "",
    experienceRequired: "",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [interviews, setInterviews] = useState([]);

  // const interviews = [
  //   {
  //     id: 1,
  //     company: "TechCorp Solutions",
  //     jobTitle: "Frontend Developer",
  //     location: "San Francisco, CA",
  //     date: "2024-01-15",
  //     time: "10:00 AM - 12:00 PM",
  //     experienceRequired: "2-4 years", // experience
  //     salary: "$90,000 - $120,000",
  //     description: "Looking for skilled frontend developers with React experienceRequired.",
  //     featured: true,
  //     openVacancies: 24 //applicants
  //   },
  //   {
  //     id: 2,
  //     company: "DataSystems Inc",
  //     jobTitle: "Data Analyst",
  //     location: "New York, NY",
  //     date: "2024-01-16",
  //     time: "2:00 PM - 4:00 PM",
  //     experienceRequired: "1-3 years",
  //     salary: "$75,000 - $95,000",
  //     description: "Join our data team to work on exciting analytics projects.",
  //     featured: false,
  //     openVacancies: 18
  //   },
  //   {
  //     id: 3,
  //     company: "CloudTech Ltd",
  //     jobTitle: "DevOps Engineer",
  //     location: "Austin, TX",
  //     date: "2024-01-17",
  //     time: "9:00 AM - 11:00 AM",
  //     experienceRequired: "3-5 years",
  //     salary: "$110,000 - $140,000",
  //     description: "DevOps engineer with AWS and Kubernetes experienceRequired.",
  //     featured: true,
  //     openVacancies: 12
  //   },
  //   {
  //     id: 4,
  //     company: "FinServe Partners",
  //     jobTitle: "Backend Developer",
  //     location: "Chicago, IL",
  //     date: "2024-01-18",
  //     time: "1:00 PM - 3:00 PM",
  //     experienceRequired: "2-4 years",
  //     salary: "$85,000 - $115,000",
  //     description: "Node.js and Python backend development role.",
  //     featured: false,
  //     openVacancies: 21
  //   }
  // ];

  const locations = [
    "San Francisco, CA",
    "New York, NY",
    "Austin, TX",
    "Chicago, IL",
    "Remote",
  ];
  const companies = [
    "TechCorp Solutions",
    "DataSystems Inc",
    "CloudTech Ltd",
    "FinServe Partners",
  ];
  const experienceLevels = [
    "0-1 years",
    "1-3 years",
    "2-4 years",
    "3-5 years",
    "5+ years",
  ];
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit = 4;

  const loadPosts = async (pageNum = 1) => {
    try {
      const result = await dispatch(getAllPostsThunk({ page: pageNum, limit }));
      const { data, pagination } = result.payload;

      if (pageNum === 1) setInterviews(data);
      else setInterviews((prev) => [...prev, ...data]);

      setHasMore(pagination?.hasMore ?? false);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    loadPosts(1);
  }, [dispatch]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    loadPosts(nextPage);
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

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const clearFilters = () => {
    setSelectedFilters({
      location: "",
      date: "",
      company: "",
      experienceRequired: "",
    });
  };

  const activeFiltersCount =
    Object.values(selectedFilters).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <section className="border-b border-gray-200 bg-white/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <motion.div
            className="text-center space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="w-16 h-px bg-gray-300 mx-auto"></div>
              <h1 className="text-4xl font-light text-gray-800 tracking-tight">
                Browse Opportunities
              </h1>
              <p className="text-gray-600 font-light tracking-wide text-lg max-w-2xl mx-auto">
                Discover walk-in interviews from leading companies
              </p>
              <div className="w-16 h-px bg-gray-300 mx-auto"></div>
            </motion.div>

            {/* Search Bar */}
            <motion.div variants={itemVariants} className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search positions, companies, or keywords..."
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 text-gray-800 font-light tracking-wide focus:border-gray-500 focus:outline-none transition-colors duration-500"
                />
              </div>
            </motion.div>

            {/* Filter Toggle */}
            <motion.div variants={itemVariants} className="flex justify-center">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 font-light tracking-wide hover:border-gray-500 transition-all duration-500 group"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
                {activeFiltersCount > 0 && (
                  <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded-full">
                    {activeFiltersCount}
                  </span>
                )}
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-300 ${
                    showFilters ? "rotate-180" : ""
                  }`}
                />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <AnimatePresence>
        {showFilters && (
          <motion.section
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-b border-gray-200 bg-white/50 backdrop-blur-sm overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-6 py-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Location Filter */}
                <div className="space-y-2">
                  <label className="text-xs font-light text-gray-600 tracking-wide uppercase">
                    Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <select
                      value={selectedFilters.location}
                      onChange={(e) =>
                        handleFilterChange("location", e.target.value)
                      }
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 text-gray-800 font-light tracking-wide focus:border-gray-500 focus:outline-none appearance-none bg-white transition-colors duration-500"
                    >
                      <option value="">All Locations</option>
                      {locations.map((location) => (
                        <option key={location} value={location}>
                          {location}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Date Filter */}
                <div className="space-y-2">
                  <label className="text-xs font-light text-gray-600 tracking-wide uppercase">
                    Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="date"
                      value={selectedFilters.date}
                      onChange={(e) =>
                        handleFilterChange("date", e.target.value)
                      }
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 text-gray-800 font-light tracking-wide focus:border-gray-500 focus:outline-none transition-colors duration-500"
                    />
                  </div>
                </div>

                {/* Company Filter */}
                <div className="space-y-2">
                  <label className="text-xs font-light text-gray-600 tracking-wide uppercase">
                    Company
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <select
                      value={selectedFilters.company}
                      onChange={(e) =>
                        handleFilterChange("company", e.target.value)
                      }
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 text-gray-800 font-light tracking-wide focus:border-gray-500 focus:outline-none appearance-none bg-white transition-colors duration-500"
                    >
                      <option value="">All Companies</option>
                      {companies.map((company) => (
                        <option key={company} value={company}>
                          {company}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Experience Filter */}
                <div className="space-y-2">
                  <label className="text-xs font-light text-gray-600 tracking-wide uppercase">
                    Experience
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <select
                      value={selectedFilters.experienceRequired}
                      onChange={(e) =>
                        handleFilterChange("experienceRequired", e.target.value)
                      }
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 text-gray-800 font-light tracking-wide focus:border-gray-500 focus:outline-none appearance-none bg-white transition-colors duration-500"
                    >
                      <option value="">All Levels</option>
                      {experienceLevels.map((level) => (
                        <option key={level} value={level}>
                          {level}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Clear Filters */}
              {activeFiltersCount > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-center mt-6"
                >
                  <button
                    onClick={clearFilters}
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 font-light tracking-wide transition-colors duration-500 group"
                  >
                    <X className="w-4 h-4" />
                    <span>Clear all filters</span>
                  </button>
                </motion.div>
              )}
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Interviews Grid */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {interviews?.map((interview) => (
            <motion.div
              key={interview._id}
              variants={itemVariants}
              className="bg-white border border-gray-200 p-8 group hover:border-gray-300 transition-all duration-500"
              whileHover={{ y: -2 }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 border border-gray-300 flex items-center justify-center group-hover:border-gray-400 transition-colors duration-500">
                    <Building className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-light text-gray-800 tracking-wide mb-1">
                      {interview?.jobTitle}
                    </h3>
                    <p className="text-gray-600 font-light tracking-wide">
                      {interview?.company}
                    </p>
                  </div>
                </div>
                {interview?.featured && (
                  <div className="flex items-center gap-1 text-amber-600">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-xs font-light tracking-wide">
                      Featured
                    </span>
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span className="font-light">{interview?.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span className="font-light">{interview?.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span className="font-light">{interview?.time}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    <span className="font-light">
                      {interview?.experienceRequired}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span className="font-light">
                      {interview?.openVacancies} vacancies
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-600 font-light leading-relaxed mb-6 tracking-wide">
                {interview?.description}
              </p>

              {/* Salary and CTA */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                <div>
                  <p className="text-gray-800 font-light tracking-wide">
                    {interview?.salary}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-6 py-3 border border-gray-800 text-gray-800 font-light tracking-wide text-sm hover:bg-gray-800 hover:text-white transition-all duration-500 group"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Load More */}
        {hasMore && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <button
              onClick={handleLoadMore}
              className="inline-flex items-center gap-2 px-8 py-3 border border-gray-300 text-gray-700 font-light tracking-wide hover:border-gray-500 transition-all duration-500 group"
            >
              <span>Load More Opportunities</span>
              <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" />
            </button>
          </motion.div>
        )}
      </section>

      {/* Fixed Corner Elements */}
      <div className="fixed top-12 left-12 w-px h-24 bg-gradient-to-b from-gray-300 to-transparent"></div>
      <div className="fixed top-12 right-12 w-px h-24 bg-gradient-to-b from-gray-300 to-transparent"></div>
    </div>
  );
}
