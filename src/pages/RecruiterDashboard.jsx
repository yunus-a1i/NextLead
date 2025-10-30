import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  Plus,
  Users,
  Calendar,
  Eye,
  Edit3,
  Trash2,
  BarChart3,
  MessageCircle,
  Filter,
  Search,
  ArrowRight,
  CheckCircle,
  X,
  Clock,
  MapPin,
  DollarSign,
  Building,
  FileText,
  User,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { createPostThunk } from "../redux/postSlice"; // adjust path

export default function RecruiterDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showPostJobModal, setShowPostJobModal] = useState(false);
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp Solutions",
      type: "Full-time",
      location: "San Francisco, CA",
      salary: "$120,000 - $150,000",
      experience: "5+ years",
      applications: 24,
      interviews: 8,
      hired: 2,
      status: "active",
      postedDate: "2024-12-15",
      description:
        "We are looking for an experienced Frontend Developer with React expertise to join our growing team.",
      requirements: [
        "5+ years React experience",
        "TypeScript proficiency",
        "Team leadership experience",
      ],
    },
    {
      id: 2,
      title: "Product Manager",
      company: "InnovateLabs",
      type: "Full-time",
      location: "Remote",
      salary: "$100,000 - $130,000",
      experience: "3+ years",
      applications: 18,
      interviews: 6,
      hired: 1,
      status: "active",
      postedDate: "2024-12-10",
      description:
        "Join our product team to drive innovation and deliver exceptional user experiences.",
      requirements: [
        "Product management experience",
        "Agile methodology",
        "User research skills",
      ],
    },
  ]);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token"); // if you're storing token in auth slice
  const hr = JSON.parse(localStorage.getItem("user")); // if you're storing token in auth slice
  console.log(hr);

  const stats = {
    totalJobs: 12,
    activeJobs: 8,
    totalApplications: 156,
    interviewsScheduled: 42,
    hiredCandidates: 15,
    responseRate: "85%",
  };

  const recentActivity = [
    {
      id: 1,
      candidate: "Sarah Johnson",
      job: "Senior Frontend Developer",
      action: "applied",
      time: "2 hours ago",
    },
    {
      id: 2,
      candidate: "Mike Chen",
      job: "Product Manager",
      action: "scheduled interview",
      time: "5 hours ago",
    },
    {
      id: 3,
      candidate: "Emily Davis",
      job: "Senior Frontend Developer",
      action: "hired",
      time: "1 day ago",
    },
  ];

  const handleSaveJob = async (formData) => {
    try {
      await dispatch(createPostThunk({ postData: formData, token })).unwrap();
      alert("Job posted successfully!");
      setShowPostJobModal(false);
    } catch (error) {
      alert(error || "Failed to post job");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/70 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 border border-gray-300 flex items-center justify-center">
                <span className="text-gray-800 font-light text-lg tracking-tight">
                  N
                </span>
              </div>
              <span className="text-2xl font-light text-gray-800 tracking-wide">
                NextLead
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowPostJobModal(true)}
                className="flex items-center gap-2 px-6 py-3 border border-gray-800 text-gray-800 font-light tracking-wide hover:bg-gray-800 hover:text-white transition-all duration-500"
              >
                <Plus className="w-4 h-4" />
                <span>Post Job</span>
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 p-6 space-y-6 sticky top-24">
              {/* Profile Summary */}
              <div className="text-center space-y-4">
                <div className="w-20 h-20 border border-gray-300 rounded-full mx-auto flex items-center justify-center">
                  <User className="w-8 h-8 text-gray-600" />
                </div>
                <div>
                  <h3 className="text-lg font-light text-gray-800 tracking-wide mb-1">
                    John Doe
                  </h3>
                  <p className="text-gray-600 font-light tracking-wide text-sm">
                    Technical Recruiter
                  </p>
                  <p className="text-gray-500 font-light tracking-wide text-xs mt-1">
                    San Francisco, CA
                  </p>
                </div>
                <div className="w-16 h-px bg-gray-300 mx-auto"></div>
              </div>
              <nav className="space-y-2">
                {[
                  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
                  { id: "jobs", label: "Job Posts", icon: Briefcase },
                  { id: "candidates", label: "Candidates", icon: Users },
                  { id: "interviews", label: "Interviews", icon: Calendar },
                  { id: "messages", label: "Messages", icon: MessageCircle },
                  { id: "analytics", label: "Analytics", icon: FileText },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-3 text-left font-light tracking-wide transition-all duration-300 ${
                        activeTab === item.id
                          ? "bg-gray-800 text-white"
                          : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-sm">{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {activeTab === "dashboard" && (
                <DashboardTab
                  stats={stats}
                  recentActivity={recentActivity}
                  jobs={jobs}
                  onPostJob={() => setShowPostJobModal(true)}
                />
              )}

              {activeTab === "jobs" && (
                <JobsTab
                  jobs={jobs}
                  onEditJob={(job) => {
                    /* Edit logic */
                  }}
                  onDeleteJob={(id) => {
                    /* Delete logic */
                  }}
                  onPostJob={() => setShowPostJobModal(true)}
                />
              )}

              {activeTab === "candidates" && <CandidatesTab />}

              {activeTab === "interviews" && <InterviewsTab />}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Post Job Modal */}
      <AnimatePresence>
        {showPostJobModal && (
          // <PostJobModal
          //   onClose={() => setShowPostJobModal(false)}
          //   onSave={(jobData) => {
          //     const newJob = {
          //       id: jobs.length + 1,
          //       ...jobData,
          //       applications: 0,
          //       interviews: 0,
          //       hired: 0,
          //       status: "active",
          //       postedDate: new Date().toISOString().split("T")[0],
          //     };
          //     setJobs([...jobs, newJob]);
          //     setShowPostJobModal(false);
          //   }}
          // />
          <PostJobModal
            onClose={() => setShowPostJobModal(false)}
            onSave={(formData) => handleSaveJob(formData)}
            hrId={hr?._id}
            domainId={"777"}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Dashboard Tab Component
function DashboardTab({ stats, recentActivity, jobs, onPostJob }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { label: "Total Jobs", value: stats.totalJobs, icon: Briefcase },
          { label: "Active Jobs", value: stats.activeJobs, icon: Eye },
          {
            label: "Total Applications",
            value: stats.totalApplications,
            icon: Users,
          },
          {
            label: "Interviews",
            value: stats.interviewsScheduled,
            icon: Calendar,
          },
          {
            label: "Hired Candidates",
            value: stats.hiredCandidates,
            icon: CheckCircle,
          },
          {
            label: "Response Rate",
            value: stats.responseRate,
            icon: BarChart3,
          },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border border-gray-200 p-6 text-center group hover:border-gray-800 transition-all duration-500"
            >
              <div className="w-12 h-12 border border-gray-300 mx-auto mb-4 flex items-center justify-center group-hover:border-gray-800 transition-colors duration-500">
                <Icon className="w-5 h-5 text-gray-600 group-hover:text-gray-800 transition-colors duration-500" />
              </div>
              <div className="text-2xl font-light text-gray-800 mb-1">
                {stat.value}
              </div>
              <div className="text-gray-600 font-light tracking-wide text-sm">
                {stat.label}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-white border border-gray-200 p-6">
          <h3 className="text-lg font-light text-gray-800 tracking-wide mb-4">
            Recent Activity
          </h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 p-3 border border-gray-100 hover:border-gray-200 transition-colors duration-300"
              >
                <div className="w-10 h-10 border border-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="w-4 h-4 text-gray-600" />
                </div>
                <div className="flex-1">
                  <div className="text-gray-800 font-light tracking-wide">
                    {activity.candidate}
                  </div>
                  <div className="text-gray-600 font-light tracking-wide text-sm">
                    {activity.action} for {activity.job}
                  </div>
                  <div className="text-gray-500 font-light tracking-wide text-xs">
                    {activity.time}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white border border-gray-200 p-6">
          <h3 className="text-lg font-light text-gray-800 tracking-wide mb-4">
            Quick Actions
          </h3>
          <div className="space-y-3">
            {[
              { label: "Post New Job", icon: Plus, action: onPostJob },
              { label: "Review Applications", icon: Users, action: () => {} },
              { label: "Schedule Interview", icon: Calendar, action: () => {} },
              { label: "View Analytics", icon: BarChart3, action: () => {} },
            ].map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.button
                  key={action.label}
                  onClick={action.action}
                  whileHover={{ x: 4 }}
                  className="w-full flex items-center gap-3 p-3 text-left text-gray-600 hover:text-gray-800 font-light tracking-wide hover:bg-gray-50 transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                  <span>{action.label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Job Posts */}
      <div className="bg-white border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-light text-gray-800 tracking-wide">
            Recent Job Posts
          </h3>
          <button className="text-gray-600 hover:text-gray-800 font-light tracking-wide text-sm transition-colors duration-300">
            View All
          </button>
        </div>
        <div className="space-y-4">
          {jobs.slice(0, 3).map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 border border-gray-100 hover:border-gray-200 transition-colors duration-300"
            >
              <div>
                <h4 className="text-gray-800 font-light tracking-wide">
                  {job.title}
                </h4>
                <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                  <span className="flex items-center gap-1">
                    <Building className="w-3 h-3" />
                    {job.company}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {job.applications} applications
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-1 text-xs font-light tracking-wide ${
                    job.status === "active"
                      ? "bg-green-100 text-green-800 border border-green-200"
                      : "bg-gray-100 text-gray-800 border border-gray-200"
                  }`}
                >
                  {job.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Jobs Tab Component
function JobsTab({ jobs, onEditJob, onDeleteJob, onPostJob }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-light text-gray-800 tracking-wide mb-2">
            Job Posts
          </h2>
          <p className="text-gray-600 font-light tracking-wide">
            Manage your job listings and track applications
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onPostJob}
          className="flex items-center gap-2 px-6 py-3 border border-gray-800 text-gray-800 font-light tracking-wide hover:bg-gray-800 hover:text-white transition-all duration-500"
        >
          <Plus className="w-4 h-4" />
          <span>Post New Job</span>
        </motion.button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 text-gray-800 font-light tracking-wide focus:border-gray-500 focus:outline-none transition-colors duration-500"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-3 border border-gray-300 text-gray-800 font-light tracking-wide focus:border-gray-500 focus:outline-none transition-colors duration-500"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="paused">Paused</option>
          <option value="closed">Closed</option>
        </select>
      </div>

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 gap-6">
        {filteredJobs.map((job, index) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white border border-gray-200 p-6 hover:border-gray-800 transition-all duration-500"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-light text-gray-800 tracking-wide">
                    {job.title}
                  </h3>
                  <span
                    className={`px-2 py-1 text-xs font-light tracking-wide ${
                      job.status === "active"
                        ? "bg-green-100 text-green-800 border border-green-200"
                        : "bg-gray-100 text-gray-800 border border-gray-200"
                    }`}
                  >
                    {job.status}
                  </span>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                  <span className="flex items-center gap-1">
                    <Building className="w-4 h-4" />
                    {job.company}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4" />
                    {job.salary}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {job.experience}
                  </span>
                </div>

                <p className="text-gray-600 font-light tracking-wide leading-relaxed mb-4">
                  {job.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {job.requirements.slice(0, 3).map((req, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-light tracking-wide border border-gray-200"
                    >
                      {req}
                    </span>
                  ))}
                  {job.requirements.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-light tracking-wide border border-gray-200">
                      +{job.requirements.length - 3} more
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-6 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {job.applications} applications
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {job.interviews} interviews
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    {job.hired} hired
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 lg:flex-col">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onEditJob(job)}
                  className="p-2 border border-gray-300 text-gray-600 hover:border-gray-800 hover:text-gray-800 transition-all duration-500"
                >
                  <Edit3 className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onDeleteJob(job.id)}
                  className="p-2 border border-gray-300 text-gray-600 hover:border-red-600 hover:text-red-600 transition-all duration-500"
                >
                  <Trash2 className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// Post Job Modal Component
function PostJobModal({ onClose, onSave, hrId, domainId }) {
  const [formData, setFormData] = useState({
    hrId: hrId || "", // ObjectId of HR
    // domainId: domainId || "", // ObjectId of domain
    jobTitle: "",
    company: "",
    description: "",
    qualification: "",
    experienceRequired: "",
    hiringDriveStart: "",
    hiringDriveEnd: "",
    location: "",
    address: "",
    email: "",
    phone: "",
    salary: "",
    openVacancies: 1,
    driveStatus: true,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: -20 }}
        className="bg-white border border-gray-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-2xl font-light text-gray-800 tracking-wide">
            Post New Job
          </h2>
          <button
            onClick={onClose}
            className="p-2 border border-gray-300 text-gray-600 hover:border-gray-800 hover:text-gray-800 transition-all duration-500"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-light text-gray-600 tracking-wide uppercase">
                Job Title *
              </label>
              <input
                type="text"
                required
                value={formData.jobTitle}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, jobTitle: e.target.value }))
                }
                className="w-full px-4 py-3 border border-gray-300 text-gray-800 font-light tracking-wide focus:border-gray-500 focus:outline-none transition-colors duration-500"
                placeholder="e.g. Senior Frontend Developer"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-light text-gray-600 tracking-wide uppercase">
                Qualification *
              </label>
              <input
                type="text"
                required
                value={formData.qualification}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    qualification: e.target.value,
                  }))
                }
                className="w-full px-4 py-3 border border-gray-300 text-gray-800 font-light tracking-wide focus:border-gray-500 focus:outline-none transition-colors duration-500"
                placeholder="e.g. B.Tech, MCA"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-light text-gray-600 tracking-wide uppercase">
                Experience Required *
              </label>
              <input
                type="text"
                required
                value={formData.experienceRequired}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    experienceRequired: e.target.value,
                  }))
                }
                className="w-full px-4 py-3 border border-gray-300 text-gray-800 font-light tracking-wide focus:border-gray-500 focus:outline-none transition-colors duration-500"
                placeholder="e.g. 2-4 years"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-light text-gray-600 tracking-wide uppercase">
                Hiring Drive Start *
              </label>
              <input
                type="date"
                required
                value={formData.hiringDriveStart}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    hiringDriveStart: e.target.value,
                  }))
                }
                className="w-full px-4 py-3 border border-gray-300 text-gray-800 font-light tracking-wide focus:border-gray-500 focus:outline-none transition-colors duration-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-light text-gray-600 tracking-wide uppercase">
                Hiring Drive End *
              </label>
              <input
                type="date"
                required
                value={formData.hiringDriveEnd}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    hiringDriveEnd: e.target.value,
                  }))
                }
                className="w-full px-4 py-3 border border-gray-300 text-gray-800 font-light tracking-wide focus:border-gray-500 focus:outline-none transition-colors duration-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-light text-gray-600 tracking-wide uppercase">
                Company Name *
              </label>
              <input
                type="text"
                required
                value={formData.company}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, company: e.target.value }))
                }
                className="w-full px-4 py-3 border border-gray-300 text-gray-800 font-light tracking-wide focus:border-gray-500 focus:outline-none transition-colors duration-500"
                placeholder="Google, Facebook"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-light text-gray-600 tracking-wide uppercase">
                Location *
              </label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, location: e.target.value }))
                }
                className="w-full px-4 py-3 border border-gray-300 text-gray-800 font-light tracking-wide focus:border-gray-500 focus:outline-none transition-colors duration-500"
                placeholder="City, State"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-light text-gray-600 tracking-wide uppercase">
                Address
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, address: e.target.value }))
                }
                className="w-full px-4 py-3 border border-gray-300 text-gray-800 font-light tracking-wide focus:border-gray-500 focus:outline-none transition-colors duration-500"
                placeholder="Company address"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-light text-gray-600 tracking-wide uppercase">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                className="w-full px-4 py-3 border border-gray-300 text-gray-800 font-light tracking-wide focus:border-gray-500 focus:outline-none transition-colors duration-500"
                placeholder="hr@company.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-light text-gray-600 tracking-wide uppercase">
                Phone
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, phone: e.target.value }))
                }
                className="w-full px-4 py-3 border border-gray-300 text-gray-800 font-light tracking-wide focus:border-gray-500 focus:outline-none transition-colors duration-500"
                placeholder="e.g. +1 123-456-7890"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-light text-gray-600 tracking-wide uppercase">
                Salary
              </label>
              <input
                type="text"
                value={formData.salary}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, salary: e.target.value }))
                }
                className="w-full px-4 py-3 border border-gray-300 text-gray-800 font-light tracking-wide focus:border-gray-500 focus:outline-none transition-colors duration-500"
                placeholder="e.g. $90,000 - $120,000"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-light text-gray-600 tracking-wide uppercase">
                Open Vacancies *
              </label>
              <input
                type="number"
                min={1}
                required
                value={formData.openVacancies}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    openVacancies: +e.target.value,
                  }))
                }
                className="w-full px-4 py-3 border border-gray-300 text-gray-800 font-light tracking-wide focus:border-gray-500 focus:outline-none transition-colors duration-500"
              />
            </div>

            <div className="space-y-2 col-span-2">
              <label className="text-xs font-light text-gray-600 tracking-wide uppercase">
                Job Description *
              </label>
              <textarea
                required
                rows="4"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className="w-full px-4 py-3 border border-gray-300 text-gray-800 font-light tracking-wide focus:border-gray-500 focus:outline-none transition-colors duration-500 resize-none"
                placeholder="Describe the role, responsibilities, and what makes your company great..."
              />
            </div>
          </div>

          <div className="flex gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-light tracking-wide hover:border-gray-400 transition-all duration-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 border border-gray-800 text-gray-800 font-light tracking-wide hover:bg-gray-800 hover:text-white transition-all duration-500 flex items-center justify-center gap-2"
            >
              <Briefcase className="w-4 h-4" />
              <span>Post Job</span>
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

// Placeholder Components for other tabs
function CandidatesTab() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="text-center py-16"
    >
      <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 className="text-xl font-light text-gray-800 tracking-wide mb-2">
        Candidates Management
      </h3>
      <p className="text-gray-600 font-light tracking-wide">
        View and manage candidate applications
      </p>
    </motion.div>
  );
}

function InterviewsTab() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="text-center py-16"
    >
      <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <h3 className="text-xl font-light text-gray-800 tracking-wide mb-2">
        Interview Scheduling
      </h3>
      <p className="text-gray-600 font-light tracking-wide">
        Schedule and manage candidate interviews
      </p>
    </motion.div>
  );
}
