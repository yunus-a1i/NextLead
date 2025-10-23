import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Calendar,
  Edit3,
  Save,
  X,
  Upload,
  Award,
  Settings,
  FileText,
  Eye,
  EyeOff,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { fetchUser } from "../redux/userSlice";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadUser = async () => {
      const savedUser = JSON.parse(localStorage.getItem("user"));
      if (!savedUser?._id) return;

      try {
        const user = await dispatch(fetchUser(savedUser._id)).unwrap();
        console.log("Fetched user:", user.data);
        setUser(user.data)
        // setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    loadUser();
  }, [dispatch]);

  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  const handleSave = () => {
    // Save profile logic here
    setUser(formData);
    setIsEditing(false);
    // In real app, would make API call to update user profile
  };

  const handleCancel = () => {
    setFormData(user);
    setIsEditing(false);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
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

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-px bg-gray-300 mx-auto mb-4"></div>
          <p className="text-gray-600 font-light tracking-wide">
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <motion.div
          className="space-y-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center space-y-6">
            <div className="w-16 h-px bg-gray-300 mx-auto"></div>
            <h1 className="text-4xl font-light text-gray-800 tracking-tight">
              Profile
            </h1>
            <p className="text-gray-600 font-light tracking-wide text-lg">
              Manage your {user.role} profile and preferences
            </p>
            <div className="w-16 h-px bg-gray-300 mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <div className="bg-white border border-gray-200 p-6 space-y-6">
                {/* Profile Summary */}
                <div className="text-center space-y-4">
                  <div className="w-24 h-24 border border-gray-300 mx-auto flex items-center justify-center">
                    <User className="w-12 h-12 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-light text-gray-800 tracking-wide mb-1">
                      {user.name}
                    </h3>
                    <p className="text-gray-600 font-light tracking-wide text-sm capitalize">
                      {user.role}
                    </p>
                  </div>
                </div>

                {/* Navigation */}
                <nav className="space-y-2">
                  {[
                    { id: "profile", label: "Profile", icon: User },
                    { id: "experience", label: "Experience", icon: Briefcase },
                    {
                      id: "education",
                      label: "Education",
                      icon: GraduationCap,
                    },
                    { id: "settings", label: "Settings", icon: Settings },
                    ...(user.role === "recruiter"
                      ? [
                          {
                            id: "posted",
                            label: "Posted Interviews",
                            icon: FileText,
                          },
                        ]
                      : []),
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-3 text-left font-light tracking-wide transition-all duration-300 ${
                        activeTab === item.id
                          ? "bg-gray-800 text-white"
                          : "text-gray-600 hover:text-gray-800 hover:bg-gray-50"
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      <span className="text-sm">{item.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </motion.div>

            {/* Main Content */}
            <motion.div variants={itemVariants} className="lg:col-span-3">
              <div className="bg-white border border-gray-200 p-8">
                {/* Header Actions */}
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl font-light text-gray-800 tracking-wide capitalize">
                    {activeTab}
                  </h2>
                  {activeTab === "profile" && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() =>
                        isEditing ? handleSave() : setIsEditing(true)
                      }
                      className="inline-flex items-center gap-2 px-4 py-2 border border-gray-800 text-gray-800 font-light tracking-wide text-sm hover:bg-gray-800 hover:text-white transition-all duration-500"
                    >
                      {isEditing ? (
                        <>
                          <Save className="w-4 h-4" />
                          <span>Save Changes</span>
                        </>
                      ) : (
                        <>
                          <Edit3 className="w-4 h-4" />
                          <span>Edit Profile</span>
                        </>
                      )}
                    </motion.button>
                  )}
                </div>

                <AnimatePresence mode="wait">
                  {/* Profile Tab */}
                  {activeTab === "profile" && (
                    <motion.div
                      key="profile"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-8"
                    >
                      {/* Basic Information */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-light text-gray-600 tracking-wide uppercase">
                            Full Name
                          </label>
                          {isEditing ? (
                            <input
                              type="text"
                              value={formData.name || ""}
                              onChange={(e) =>
                                handleChange("name", e.target.value)
                              }
                              className="w-full px-4 py-3 border border-gray-300 text-gray-800 font-light tracking-wide focus:border-gray-500 focus:outline-none transition-colors duration-500"
                            />
                          ) : (
                            <p className="px-4 py-3 text-gray-800 font-light tracking-wide border border-transparent">
                              {user.name}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-light text-gray-600 tracking-wide uppercase">
                            Email
                          </label>
                          {isEditing ? (
                            <input
                              type="email"
                              value={formData.email || ""}
                              onChange={(e) =>
                                handleChange("email", e.target.value)
                              }
                              className="w-full px-4 py-3 border border-gray-300 text-gray-800 font-light tracking-wide focus:border-gray-500 focus:outline-none transition-colors duration-500"
                            />
                          ) : (
                            <p className="px-4 py-3 text-gray-800 font-light tracking-wide border border-transparent">
                              {user.email}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-light text-gray-600 tracking-wide uppercase">
                            Phone
                          </label>
                          {isEditing ? (
                            <input
                              type="tel"
                              value={formData.contact || ""}
                              onChange={(e) =>
                                handleChange("contact", e.target.value)
                              }
                              className="w-full px-4 py-3 border border-gray-300 text-gray-800 font-light tracking-wide focus:border-gray-500 focus:outline-none transition-colors duration-500"
                            />
                          ) : (
                            <p className="px-4 py-3 text-gray-800 font-light tracking-wide border border-transparent">
                              {user.contact}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-light text-gray-600 tracking-wide uppercase">
                            Location
                          </label>
                          {isEditing ? (
                            <input
                              type="text"
                              value={formData.location || ""}
                              onChange={(e) =>
                                handleChange("location", e.target.value)
                              }
                              className="w-full px-4 py-3 border border-gray-300 text-gray-800 font-light tracking-wide focus:border-gray-500 focus:outline-none transition-colors duration-500"
                            />
                          ) : (
                            <p className="px-4 py-3 text-gray-800 font-light tracking-wide border border-transparent">
                              {user.location}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Bio */}
                      <div className="space-y-2">
                        <label className="text-xs font-light text-gray-600 tracking-wide uppercase">
                          Bio
                        </label>
                        {isEditing ? (
                          <textarea
                            value={formData.bio || ""}
                            onChange={(e) =>
                              handleChange("bio", e.target.value)
                            }
                            rows="4"
                            className="w-full px-4 py-3 border border-gray-300 text-gray-800 font-light tracking-wide focus:border-gray-500 focus:outline-none transition-colors duration-500 resize-none"
                          />
                        ) : (
                          <p className="px-4 py-3 text-gray-800 font-light tracking-wide leading-relaxed border border-transparent">
                            {user.bio}
                          </p>
                        )}
                      </div>

                      {/* Skills */}
                      <div className="space-y-4">
                        <label className="text-xs font-light text-gray-600 tracking-wide uppercase">
                          Skills & Expertise
                        </label>
                        {isEditing ? (
                          <input
                            type="text"
                            placeholder="Add skills separated by commas"
                            value={formData.skills?.join(", ") || ""}
                            onChange={(e) =>
                              handleChange(
                                "skills",
                                e.target.value.split(",").map((s) => s.trim())
                              )
                            }
                            className="w-full px-4 py-3 border border-gray-300 text-gray-800 font-light tracking-wide focus:border-gray-500 focus:outline-none transition-colors duration-500"
                          />
                        ) : (
                          <div className="flex flex-wrap gap-2">
                            {user.skills?.map((skill, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 border border-gray-300 text-gray-800 font-light tracking-wide text-sm"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Cancel/Save Buttons for Editing */}
                      {isEditing && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex gap-4 pt-6 border-t border-gray-100"
                        >
                          <button
                            onClick={handleCancel}
                            className="inline-flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-600 font-light tracking-wide hover:border-gray-400 transition-all duration-500"
                          >
                            <X className="w-4 h-4" />
                            <span>Cancel</span>
                          </button>
                        </motion.div>
                      )}
                    </motion.div>
                  )}

                  {/* Experience Tab */}
                  {activeTab === "experience" && (
                    <motion.div
                      key="experience"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-6"
                    >
                      {user.experience?.map((exp, index) => (
                        <div
                          key={index}
                          className="border-b border-gray-100 pb-6 last:border-b-0 last:pb-0"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-light text-gray-800 tracking-wide">
                              {exp.position}
                            </h3>
                            <span className="text-gray-600 font-light tracking-wide text-sm">
                              {exp.period}
                            </span>
                          </div>
                          <p className="text-gray-600 font-light tracking-wide mb-2">
                            {exp.company}
                          </p>
                          <p className="text-gray-600 font-light tracking-wide leading-relaxed">
                            {exp.description}
                          </p>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {/* Education Tab */}
                  {activeTab === "education" && (
                    <motion.div
                      key="education"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-6"
                    >
                      {user.education?.map((edu, index) => (
                        <div
                          key={index}
                          className="border-b border-gray-100 pb-6 last:border-b-0 last:pb-0"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-light text-gray-800 tracking-wide">
                              {edu.degree}
                            </h3>
                            <span className="text-gray-600 font-light tracking-wide text-sm">
                              {edu.period}
                            </span>
                          </div>
                          <p className="text-gray-600 font-light tracking-wide">
                            {edu.institution}
                          </p>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {/* Posted Interviews (Recruiter Only) */}
                  {activeTab === "posted" && user.role === "recruiter" && (
                    <motion.div
                      key="posted"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-6"
                    >
                      <p className="text-gray-600 font-light tracking-wide text-center py-8">
                        Manage your posted interviews and view applicant
                        statistics
                      </p>
                      {/* Would include recruiter-specific content here */}
                    </motion.div>
                  )}

                  {/* Settings Tab */}
                  {activeTab === "settings" && (
                    <motion.div
                      key="settings"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-6"
                    >
                      <div className="space-y-4">
                        <h3 className="text-lg font-light text-gray-800 tracking-wide">
                          Account Settings
                        </h3>

                        <div className="space-y-2">
                          <label className="text-xs font-light text-gray-600 tracking-wide uppercase">
                            Current Password
                          </label>
                          <div className="relative">
                            <input
                              type={showPassword ? "text" : "password"}
                              className="w-full px-4 py-3 border border-gray-300 text-gray-800 font-light tracking-wide focus:border-gray-500 focus:outline-none transition-colors duration-500"
                              placeholder="Enter current password"
                            />
                            <button
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            >
                              {showPassword ? (
                                <EyeOff className="w-4 h-4" />
                              ) : (
                                <Eye className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-light text-gray-600 tracking-wide uppercase">
                            New Password
                          </label>
                          <input
                            type="password"
                            className="w-full px-4 py-3 border border-gray-300 text-gray-800 font-light tracking-wide focus:border-gray-500 focus:outline-none transition-colors duration-500"
                            placeholder="Enter new password"
                          />
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="inline-flex items-center gap-2 px-6 py-3 border border-gray-800 text-gray-800 font-light tracking-wide text-sm hover:bg-gray-800 hover:text-white transition-all duration-500"
                        >
                          <Save className="w-4 h-4" />
                          <span>Update Password</span>
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Fixed Corner Elements */}
      <div className="fixed top-12 left-12 w-px h-24 bg-gradient-to-b from-gray-300 to-transparent"></div>
      <div className="fixed top-12 right-12 w-px h-24 bg-gradient-to-b from-gray-300 to-transparent"></div>
    </div>
  );
}
