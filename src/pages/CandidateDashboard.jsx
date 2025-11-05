import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Briefcase,
  FileText,
  MessageCircle,
  User,
  Bookmark,
  Settings,
  BarChart3,
  Calendar,
  MapPin,
  Clock,
  CheckCircle,
  XCircle,
  Clock4,
  Edit3,
  Download,
  Plus,
  Search,
  Filter,
  ArrowRight,
  Eye,
  Trash2,
  Mail,
  Phone,
  Building,
  DollarSign,
} from "lucide-react";

export default function CandidateDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [user, setUser] = useState(null);
  const [applications, setApplications] = useState([
    {
      id: 1,
      jobTitle: "Senior Frontend Developer",
      company: "TechCorp Solutions",
      location: "San Francisco, CA",
      salary: "$120,000 - $150,000",
      appliedDate: "2024-12-15",
      status: "interview",
      interviewDate: "2024-12-20",
      recruiter: "Sarah Chen",
      lastUpdate: "2 hours ago",
    },
    {
      id: 2,
      jobTitle: "Product Manager",
      company: "InnovateLabs",
      location: "Remote",
      salary: "$100,000 - $130,000",
      appliedDate: "2024-12-12",
      status: "applied",
      interviewDate: null,
      recruiter: "Mike Rodriguez",
      lastUpdate: "1 day ago",
    },
    {
      id: 3,
      jobTitle: "UX Designer",
      company: "DesignStudio Inc",
      location: "New York, NY",
      salary: "$90,000 - $110,000",
      appliedDate: "2024-12-10",
      status: "rejected",
      interviewDate: null,
      recruiter: "Emily Watson",
      lastUpdate: "3 days ago",
    },
    {
      id: 4,
      jobTitle: "Full Stack Developer",
      company: "StartupXYZ",
      location: "Austin, TX",
      salary: "$95,000 - $120,000",
      appliedDate: "2024-12-08",
      status: "offer",
      interviewDate: "2024-12-18",
      recruiter: "James Thompson",
      lastUpdate: "5 hours ago",
    },
  ]);

  const [savedJobs, setSavedJobs] = useState([
    {
      id: 1,
      jobTitle: "Backend Engineer",
      company: "CloudTech Ltd",
      location: "Remote",
      salary: "$110,000 - $140,000",
      postedDate: "2024-12-14",
      matchScore: 95,
    },
    {
      id: 2,
      jobTitle: "DevOps Specialist",
      company: "DataSystems Inc",
      location: "Chicago, IL",
      salary: "$105,000 - $135,000",
      postedDate: "2024-12-13",
      matchScore: 87,
    },
  ]);

  const [messages, setMessages] = useState([
    {
      id: 1,
      recruiter: "Sarah Chen",
      company: "TechCorp Solutions",
      subject: "Interview Invitation - Senior Frontend Role",
      preview:
        "Thank you for your application. We'd like to schedule an interview...",
      timestamp: "2 hours ago",
      unread: true,
    },
    {
      id: 2,
      recruiter: "Mike Rodriguez",
      company: "InnovateLabs",
      subject: "Application Received",
      preview: "We've received your application and will review it shortly...",
      timestamp: "1 day ago",
      unread: false,
    },
  ]);

  const stats = {
    totalApplications: 24,
    interviews: 8,
    offers: 2,
    profileViews: 47,
    responseRate: "75%",
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    console.log(savedUser);
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  console.log(user);

  const upcomingInterviews = applications.filter(
    (app) => app.status === "interview" && app.interviewDate
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      {/* <header className="border-b border-gray-200 bg-white/70 backdrop-blur-md sticky top-0 z-40">
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
                className="flex items-center gap-2 px-6 py-3 border border-gray-800 text-gray-800 font-light tracking-wide hover:bg-gray-800 hover:text-white transition-all duration-500"
              >
                <Plus className="w-4 h-4" />
                <span>Apply to Jobs</span>
              </motion.button>
            </div>
          </div>
        </div>
      </header> */}

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
                    {user?.name || "loading..."}
                  </h3>
                  <p className="text-gray-600 font-light tracking-wide text-sm">
                    {user?.domain || "loading..."}
                  </p>
                  <p className="text-gray-500 font-light tracking-wide text-xs mt-1">
                    {user?.email || "loading..."}
                  </p>
                </div>
                <div className="w-16 h-px bg-gray-300 mx-auto"></div>
              </div>

              <nav className="space-y-2">
                {[
                  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
                  {
                    id: "applications",
                    label: "Applications",
                    icon: Briefcase,
                  },
                  { id: "resume", label: "Resume Builder", icon: FileText },
                  { id: "saved", label: "Saved Jobs", icon: Bookmark },
                  { id: "messages", label: "Messages", icon: MessageCircle },
                  { id: "profile", label: "Profile Builder", icon: User },
                  { id: "settings", label: "Settings", icon: Settings },
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
                  applications={applications}
                  upcomingInterviews={upcomingInterviews}
                  messages={messages}
                />
              )}

              {activeTab === "applications" && (
                <ApplicationsTab
                  applications={applications}
                  onUpdateApplication={(id, updates) => {
                    setApplications((prev) =>
                      prev.map((app) =>
                        app.id === id ? { ...app, ...updates } : app
                      )
                    );
                  }}
                />
              )}

              {activeTab === "saved" && (
                <SavedJobsTab
                  savedJobs={savedJobs}
                  onRemoveSavedJob={(id) => {
                    setSavedJobs((prev) => prev.filter((job) => job.id !== id));
                  }}
                />
              )}

              {activeTab === "messages" && (
                <MessagesTab
                  messages={messages}
                  onMarkAsRead={(id) => {
                    setMessages((prev) =>
                      prev.map((msg) =>
                        msg.id === id ? { ...msg, unread: false } : msg
                      )
                    );
                  }}
                />
              )}

              {activeTab === "profile" && <ProfileBuilderTab user={user} />}

              {activeTab === "resume" && <ResumeBuilderTab user={user} />}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

// Dashboard Tab Component
function DashboardTab({ stats, applications, upcomingInterviews, messages }) {
  const statusCounts = {
    applied: applications.filter((app) => app.status === "applied").length,
    interview: applications.filter((app) => app.status === "interview").length,
    offer: applications.filter((app) => app.status === "offer").length,
    rejected: applications.filter((app) => app.status === "rejected").length,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        {[
          {
            label: "Total Applications",
            value: stats.totalApplications,
            icon: Briefcase,
          },
          { label: "Interviews", value: stats.interviews, icon: Calendar },
          { label: "Offers", value: stats.offers, icon: CheckCircle },
          { label: "Profile Views", value: stats.profileViews, icon: Eye },
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Application Status */}
        <div className="bg-white border border-gray-200 p-6">
          <h3 className="text-lg font-light text-gray-800 tracking-wide mb-4">
            Application Status
          </h3>
          <div className="space-y-4">
            {[
              {
                status: "applied",
                label: "Applied",
                color: "bg-blue-100 border-blue-200 text-blue-800",
                count: statusCounts.applied,
              },
              {
                status: "interview",
                label: "Interview",
                color: "bg-amber-100 border-amber-200 text-amber-800",
                count: statusCounts.interview,
              },
              {
                status: "offer",
                label: "Offer",
                color: "bg-green-100 border-green-200 text-green-800",
                count: statusCounts.offer,
              },
              {
                status: "rejected",
                label: "Rejected",
                color: "bg-red-100 border-red-200 text-red-800",
                count: statusCounts.rejected,
              },
            ].map((status, index) => (
              <motion.div
                key={status.status}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 border border-gray-100 hover:border-gray-200 transition-colors duration-300"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      status.color.split(" ")[0]
                    }`}
                  ></div>
                  <span className="text-gray-800 font-light tracking-wide">
                    {status.label}
                  </span>
                </div>
                <span className="text-gray-600 font-light tracking-wide">
                  {status.count}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Upcoming Interviews */}
        <div className="bg-white border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-light text-gray-800 tracking-wide">
              Upcoming Interviews
            </h3>
            <span className="text-gray-600 font-light tracking-wide text-sm">
              {upcomingInterviews.length} scheduled
            </span>
          </div>
          <div className="space-y-4">
            {upcomingInterviews.map((interview, index) => (
              <motion.div
                key={interview.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 border border-gray-100 hover:border-gray-200 transition-colors duration-300"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-gray-800 font-light tracking-wide">
                    {interview.jobTitle}
                  </h4>
                  <span className="text-amber-600 font-light tracking-wide text-sm">
                    {new Date(interview.interviewDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Building className="w-3 h-3" />
                    {interview.company}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    10:00 AM
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Applications */}
      <div className="bg-white border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-light text-gray-800 tracking-wide">
            Recent Applications
          </h3>
          <button className="text-gray-600 hover:text-gray-800 font-light tracking-wide text-sm transition-colors duration-300">
            View All
          </button>
        </div>
        <div className="space-y-4">
          {applications.slice(0, 3).map((application, index) => (
            <motion.div
              key={application.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 border border-gray-100 hover:border-gray-200 transition-colors duration-300"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="text-gray-800 font-light tracking-wide">
                    {application.jobTitle}
                  </h4>
                  <StatusBadge status={application.status} />
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Building className="w-3 h-3" />
                    {application.company}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {application.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Applied{" "}
                    {new Date(application.appliedDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-gray-600 font-light tracking-wide text-sm">
                  {application.lastUpdate}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Applications Tab Component
function ApplicationsTab({ applications, onUpdateApplication }) {
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusIcon = (status) => {
    switch (status) {
      case "applied":
        return Clock4;
      case "interview":
        return Calendar;
      case "offer":
        return CheckCircle;
      case "rejected":
        return XCircle;
      default:
        return Briefcase;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h2 className="text-2xl font-light text-gray-800 tracking-wide mb-2">
          Job Applications
        </h2>
        <p className="text-gray-600 font-light tracking-wide">
          Track and manage your job applications
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search applications..."
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
          <option value="applied">Applied</option>
          <option value="interview">Interview</option>
          <option value="offer">Offer</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Applications List */}
      <div className="space-y-4">
        {filteredApplications.map((application, index) => {
          const StatusIcon = getStatusIcon(application.status);
          return (
            <motion.div
              key={application.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border border-gray-200 p-6 hover:border-gray-800 transition-all duration-500"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-light text-gray-800 tracking-wide">
                      {application.jobTitle}
                    </h3>
                    <StatusBadge status={application.status} />
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                    <span className="flex items-center gap-1">
                      <Building className="w-4 h-4" />
                      {application.company}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {application.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      {application.salary}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Applied{" "}
                      {new Date(application.appliedDate).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      Recruiter: {application.recruiter}
                    </span>
                    {application.interviewDate && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Interview:{" "}
                        {new Date(
                          application.interviewDate
                        ).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 lg:flex-col">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 border border-gray-300 text-gray-600 hover:border-gray-800 hover:text-gray-800 transition-all duration-500"
                  >
                    <Eye className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 border border-gray-300 text-gray-600 hover:border-gray-800 hover:text-gray-800 transition-all duration-500"
                  >
                    <Mail className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

// Saved Jobs Tab Component
function SavedJobsTab({ savedJobs, onRemoveSavedJob }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h2 className="text-2xl font-light text-gray-800 tracking-wide mb-2">
          Saved Jobs
        </h2>
        <p className="text-gray-600 font-light tracking-wide">
          Your bookmarked job opportunities
        </p>
      </div>

      {/* Saved Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {savedJobs.map((job, index) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white border border-gray-200 p-6 hover:border-gray-800 transition-all duration-500"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-light text-gray-800 tracking-wide mb-2">
                  {job.jobTitle}
                </h3>
                <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
                  <span className="flex items-center gap-1">
                    <Building className="w-4 h-4" />
                    {job.company}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {job.location}
                  </span>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onRemoveSavedJob(job.id)}
                className="p-2 border border-gray-300 text-gray-600 hover:border-red-600 hover:text-red-600 transition-all duration-500"
              >
                <Trash2 className="w-4 h-4" />
              </motion.button>
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <DollarSign className="w-4 h-4" />
                  <span>{job.salary}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>
                    Posted {new Date(job.postedDate).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <div className="text-green-600 font-light tracking-wide text-sm mb-2">
                  {job.matchScore}% Match
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-4 py-2 border border-gray-800 text-gray-800 font-light tracking-wide text-sm hover:bg-gray-800 hover:text-white transition-all duration-500"
                >
                  Apply Now
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// Messages Tab Component
function MessagesTab({ messages, onMarkAsRead }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h2 className="text-2xl font-light text-gray-800 tracking-wide mb-2">
          Messages
        </h2>
        <p className="text-gray-600 font-light tracking-wide">
          Communicate with recruiters and employers
        </p>
      </div>

      {/* Messages List */}
      <div className="bg-white border border-gray-200">
        {messages.map((message, index) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-6 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-300 ${
              message.unread ? "bg-blue-50" : ""
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 border border-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-gray-600" />
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <h3 className="text-gray-800 font-light tracking-wide">
                      {message.recruiter}
                    </h3>
                    <span className="text-gray-600 font-light tracking-wide text-sm">
                      {message.company}
                    </span>
                    {message.unread && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-light tracking-wide border border-blue-200">
                        New
                      </span>
                    )}
                  </div>
                  <span className="text-gray-500 font-light tracking-wide text-sm">
                    {message.timestamp}
                  </span>
                </div>

                <h4 className="text-gray-800 font-light tracking-wide mb-1">
                  {message.subject}
                </h4>

                <p className="text-gray-600 font-light tracking-wide text-sm mb-3">
                  {message.preview}
                </p>

                <div className="flex items-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 py-2 border border-gray-800 text-gray-800 font-light tracking-wide text-sm hover:bg-gray-800 hover:text-white transition-all duration-500"
                  >
                    Reply
                  </motion.button>
                  {message.unread && (
                    <button
                      onClick={() => onMarkAsRead(message.id)}
                      className="text-gray-500 hover:text-gray-700 font-light tracking-wide text-sm transition-colors duration-300"
                    >
                      Mark as read
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// Profile Builder Tab Component
function ProfileBuilderTab({ user }) {
  // const [profile, setProfile] = useState({
  //   fullName: user.name,
  //   title: user.domain,
  //   email: "john.doe@email.com",
  //   phone: "+1 (555) 123-4567",
  //   location: "San Francisco, CA",
  //   bio: "Experienced frontend developer with 5+ years in React and modern JavaScript frameworks. Passionate about creating responsive and accessible web applications.",
  //   skills: ["React", "TypeScript", "JavaScript", "HTML/CSS", "Node.js"],
  //   experience: [
  //     {
  //       id: 1,
  //       company: "TechCorp Solutions",
  //       position: "Senior Frontend Developer",
  //       period: "2020 - Present",
  //       description: "Lead frontend development for multiple client projects",
  //     },
  //   ],
  //   education: [
  //     {
  //       id: 1,
  //       institution: "University of California",
  //       degree: "Bachelor of Science in Computer Science",
  //       period: "2016 - 2020",
  //     },
  //   ],
  // });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-light text-gray-800 tracking-wide mb-2">
            Profile Builder
          </h2>
          <p className="text-gray-600 font-light tracking-wide">
            Build and optimize your professional profile
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 px-6 py-3 border border-gray-800 text-gray-800 font-light tracking-wide hover:bg-gray-800 hover:text-white transition-all duration-500"
        >
          <Edit3 className="w-4 h-4" />
          <span>Edit Profile</span>
        </motion.button>
      </div>

      {/* Profile Preview */}
      <div className="bg-white border border-gray-200 p-8">
        <div className="flex items-start gap-6 mb-8">
          <div className="w-24 h-24 border border-gray-300 rounded-full flex items-center justify-center">
            <User className="w-8 h-8 text-gray-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-light text-gray-800 tracking-wide mb-2">
              {user.name}
            </h3>
            <p className="text-xl text-gray-600 font-light tracking-wide mb-4">
              {user.domain}
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <Mail className="w-4 h-4" />
                {user.email}
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-4 h-4" />
                {user.contact}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {user?.location}
              </span>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="mb-8">
          <h4 className="text-lg font-light text-gray-800 tracking-wide mb-3">
            About
          </h4>
          <p className="text-gray-600 font-light tracking-wide leading-relaxed">
            {user.bio}
          </p>
        </div>

        {/* Skills */}
        <div className="mb-8">
          <h4 className="text-lg font-light text-gray-800 tracking-wide mb-3">
            Skills
          </h4>
          <div className="flex flex-wrap gap-2">
            {user.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 border border-gray-300 text-gray-700 font-light tracking-wide text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div className="mb-8">
          <h4 className="text-lg font-light text-gray-800 tracking-wide mb-3">
            Experience
          </h4>
          <div className="space-y-4">
            {user.experience.map((exp) => (
              <div key={exp.id} className="border-l-2 border-gray-300 pl-4">
                <h5 className="text-gray-800 font-light tracking-wide">
                  {exp.position}
                </h5>
                <p className="text-gray-600 font-light tracking-wide text-sm">
                  {exp.company}
                </p>
                <p className="text-gray-500 font-light tracking-wide text-sm">
                  {exp.period}
                </p>
                <p className="text-gray-600 font-light tracking-wide text-sm mt-1">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div>
          <h4 className="text-lg font-light text-gray-800 tracking-wide mb-3">
            Education
          </h4>
          <div className="space-y-4">
            {user.education.map((edu) => (
              <div key={edu.id} className="border-l-2 border-gray-300 pl-4">
                <h5 className="text-gray-800 font-light tracking-wide">
                  {edu.degree}
                </h5>
                <p className="text-gray-600 font-light tracking-wide text-sm">
                  {edu.institution}
                </p>
                <p className="text-gray-500 font-light tracking-wide text-sm">
                  {edu.period}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Resume Builder Tab Component
function ResumeBuilderTab({ user }) {
  const [resumeTemplates] = useState([
    { id: 1, name: "Modern Professional", category: "Professional" },
    { id: 2, name: "Creative Designer", category: "Creative" },
    { id: 3, name: "Minimalist", category: "Clean" },
    { id: 4, name: "Executive", category: "Corporate" },
  ]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-light text-gray-800 tracking-wide mb-2">
            Resume Builder
          </h2>
          <p className="text-gray-600 font-light tracking-wide">
            Create and download professional resumes
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-2 px-6 py-3 border border-gray-800 text-gray-800 font-light tracking-wide hover:bg-gray-800 hover:text-white transition-all duration-500"
        >
          <Download className="w-4 h-4" />
          <span>Download PDF</span>
        </motion.button>
      </div>

      {/* Resume Templates */}
      <div>
        <h3 className="text-lg font-light text-gray-800 tracking-wide mb-4">
          Choose a Template
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resumeTemplates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border border-gray-200 p-6 hover:border-gray-800 transition-all duration-500 cursor-pointer group"
            >
              <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 mb-4 flex items-center justify-center group-hover:from-gray-200 group-hover:to-gray-300 transition-all duration-500">
                <FileText className="w-12 h-12 text-gray-400" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-gray-800 font-light tracking-wide mb-1">
                    {template.name}
                  </h4>
                  <p className="text-gray-600 font-light tracking-wide text-sm">
                    {template.category}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 border border-gray-800 text-gray-800 font-light tracking-wide text-sm hover:bg-gray-800 hover:text-white transition-all duration-500"
                >
                  Use Template
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Resume Preview */}
      <div className="bg-white border border-gray-200 p-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-light text-gray-800 tracking-wide mb-2">
            {user?.name}
          </h3>
          <p className="text-gray-600 font-light tracking-wide">
            {user?.domain}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-6">
            <div>
              <h4 className="text-lg font-light text-gray-800 tracking-wide mb-3 border-b border-gray-200 pb-2">
                Professional Summary
              </h4>
              <p className="text-gray-600 font-light tracking-wide leading-relaxed">
                {user?.bio}
              </p>
            </div>

            <div>
              <h4 className="text-lg font-light text-gray-800 tracking-wide mb-3 border-b border-gray-200 pb-2">
                Experience
              </h4>
              {user?.experience.map((exp) => (
                <div className="space-y-4 mt-4">
                  <div>
                    <h5 className="text-gray-800 font-light tracking-wide">
                      {exp?.position}
                    </h5>
                    <p className="text-gray-600 font-light tracking-wide text-sm">
                      {exp?.company}
                    </p>
                    <p className="text-gray-600 font-light tracking-wide text-sm mt-1">
                      {exp?.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <h4 className="text-lg font-light tracking-[0.08em] text-gray-800 mb-4 border-b border-gray-300 pb-2">
                Projects
              </h4>

              <div className="space-y-5">
                {user?.projects?.map((project, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl group bg-white/50 backdrop-blur-sm"
                  >
                    {/* Project Title & Link */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                      <h5 className="text-base font-light text-gray-900 tracking-wide group-hover:text-gray-700 transition-colors">
                        {project?.name}
                      </h5>

                      {project?.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-gray-500 hover:text-gray-700 hover:underline transition-all mt-1 sm:mt-0"
                        >
                          Link
                        </a>
                      )}
                    </div>

                    {/* Company (optional) */}
                    {project?.company && (
                      <p className="text-sm text-gray-600 mt-1 font-light tracking-wide">
                        {project.company}
                      </p>
                    )}

                    {/* Description */}
                    <p className="text-sm text-gray-700 mt-1 leading-relaxed font-light tracking-wide">
                      {project?.description}
                    </p>

                    {/* Tech Stack */}
                    {project?.techStack && (
                      <div className="flex flex-wrap gap-2 mt-1">
                        {project?.techStack?.map((tech, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 border border-gray-300 text-gray-800 font-light tracking-wide text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-light text-gray-800 tracking-wide mb-3 border-b border-gray-200 pb-2">
                Contact
              </h4>
              <div className="space-y-2 text-sm text-gray-600">
                <p>{user?.email}</p>
                <p>{user?.contact}</p>
                <p>San Francisco, CA</p>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-light text-gray-800 tracking-wide mb-3 border-b border-gray-200 pb-2">
                Skills
              </h4>
              <div className="space-y-2">
                {user.skills.map((skill) => (
                  <div
                    key={skill}
                    className="text-gray-600 font-light tracking-wide text-sm"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Status Badge Component
function StatusBadge({ status }) {
  const statusConfig = {
    applied: {
      label: "Applied",
      color: "bg-blue-100 text-blue-800 border-blue-200",
    },
    interview: {
      label: "Interview",
      color: "bg-amber-100 text-amber-800 border-amber-200",
    },
    offer: {
      label: "Offer",
      color: "bg-green-100 text-green-800 border-green-200",
    },
    rejected: {
      label: "Rejected",
      color: "bg-red-100 text-red-800 border-red-200",
    },
  };

  const config = statusConfig[status] || statusConfig.applied;

  return (
    <span
      className={`px-2 py-1 text-xs font-light tracking-wide border ${config.color}`}
    >
      {config.label}
    </span>
  );
}
