import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Building,
  MapPin,
  DollarSign,
  Clock,
  Calendar,
  Users,
  Briefcase,
  Bookmark,
  Share2,
  Eye,
  CheckCircle,
  Star,
  User,
  Mail,
  Phone,
  ExternalLink,
  ChevronRight,
  Heart,
  Flag,
  AlertCircle,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPostsFullThunk } from "../redux/postSlice";
import {
  addBookmark,
  removeBookmark,
  optimisticAdd,
  optimisticRemove,
  selectBookmarks,
  selectBookmarkLoading,
} from "../redux/bookmarkSlice";

export default function JobDetailPage() {
  const { id } = useParams();
  const [isSaved, setIsSaved] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);

  const dispatch = useDispatch();

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await dispatch(getAllPostsFullThunk());
      setJobs(result.payload?.data || []);
    };
    fetchData();
  }, [dispatch]);

  const job = jobs.find((j) => j._id === id);

  // Prevent crash before job loads
  const similarJobs = job
    ? jobs.filter(
        (j) =>
          j._id !== id &&
          j.title
            .replace(/\s+/g, "")
            .toLowerCase()
            .includes(job.title.replace(/\s+/g, "").toLowerCase())
      )
    : [];

  const bookmarks = useSelector(selectBookmarks) || [];
  const loading = useSelector(selectBookmarkLoading);

  // find stored bookmark for this post
  const bookmarkDoc = useMemo(() => {
    if (!bookmarks.length) return null;

    return (
      bookmarks.find(
        (b) =>
          b.interveiwPostId === id || // API typo
          b.interviewPostId === id // fallback correct spelling
      ) || null
    );
  }, [bookmarks, id]);

  // Sync local isSaved with redux store
  useEffect(() => {
    setIsSaved(Boolean(bookmarkDoc));
  }, [bookmarkDoc]);

  /* -----------------------------------
      Save / Unsave (with fixes)
----------------------------------- */

  const handleToggleSave = async () => {
    if (isSaved) {
      /* --------------------
          REMOVE
    -------------------- */

      // SAFE PAYLOAD: never send temp IDs to backend
      const payload =
        bookmarkDoc && bookmarkDoc._id && !bookmarkDoc._id.startsWith("temp-")
          ? { docId: bookmarkDoc._id }
          : { postId: id };

      // optimistic remove
      dispatch(optimisticRemove({ postId: id }));
      setIsSaved(false);

      try {
        await dispatch(removeBookmark(payload)).unwrap();
      } catch (err) {
        console.error("Failed to remove", err);
        // rollback
        setIsSaved(true);
      }
    } else {
      /* --------------------
          ADD
    -------------------- */

      const placeholder = {
        _id: `temp-${Date.now()}`,
        interveiwPostId: id,
      };

      // optimistic add
      dispatch(optimisticAdd(placeholder));
      setIsSaved(true);

      try {
        const result = await dispatch(addBookmark(id)).unwrap();
        const created = result?.data || result;
        // slice dedupe handles the mismatch automatically
      } catch (err) {
        console.error("Failed to add bookmark", err);
        dispatch(optimisticRemove({ postId: id })); // rollback
        setIsSaved(false);
      }
    }
  };

  /* -----------------------------------
            SHARE
----------------------------------- */

  const handleShare = async () => {
    const shareData = {
      title: "Check out this post",
      text: "Thought you might like this post.",
      url: `${window.location.origin}/posts/${id}`,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error("Share cancelled", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareData.url);
        console.log("Link copied to clipboard");
      } catch (err) {
        console.error("Failed to copy", err);
      }
    }
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
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white/70 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              to="/interviews"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 font-light tracking-wide transition-colors duration-500 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
              <span>Back to Opportunities</span>
            </Link>

            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleToggleSave}
                disabled={loading}
                aria-pressed={isSaved}
                className={`p-2 border rounded ${
                  isSaved
                    ? "border-gray-800 bg-gray-800 text-white"
                    : "border-gray-300 text-gray-600 hover:border-gray-800"
                } transition-all duration-300`}
              >
                <Bookmark className="w-4 h-4" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleShare}
                className="p-2 border border-gray-300 text-gray-600 hover:border-gray-800 transition-all duration-300 rounded"
                aria-label="Share"
              >
                <Share2 className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Job Details */}
          <div className="lg:col-span-2">
            <motion.div
              className="space-y-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Job Header */}
              <motion.div
                variants={itemVariants}
                className="bg-white border border-gray-200 p-8"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-start gap-6">
                    <div className="w-20 h-20 border border-gray-300 flex items-center justify-center">
                      <Building className="w-8 h-8 text-gray-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-3xl font-light text-gray-800 tracking-wide">
                          {job?.title}
                        </h1>
                        {job?.isFeatured && (
                          <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs font-light tracking-wide border border-amber-200">
                            Featured
                          </span>
                        )}
                        {job?.isUrgent && (
                          <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-light tracking-wide border border-red-200">
                            Urgent
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-4 text-lg text-gray-600 mb-4">
                        <span className="flex items-center gap-2">
                          <Building className="w-4 h-4" />
                          {job?.company}
                        </span>
                        <span className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {job?.location}
                          {job?.isRemote && (
                            <span className="text-green-600 text-sm">
                              • Remote
                            </span>
                          )}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          {job?.salary}
                        </span>
                        <span className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          {job?.type}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {job?.experience}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Posted {new Date(job?.createdAt).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {job?.vacancies} Vaccancies
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {job?.views} views
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Match Score */}
                  {/* <div className="text-right">
                    <div className="flex items-center gap-2 text-green-600 mb-1">
                      <CheckCircle className="w-4 h-4" />
                      <span className="font-light tracking-wide">
                        {job?.matchScore}% Match
                      </span>
                    </div>
                    <div className="text-gray-500 font-light tracking-wide text-sm">
                      Great fit for your profile
                    </div>
                  </div> */}
                </div>

                {/* Quick Actions */}
                <div className="flex gap-4 pt-6 border-t border-gray-100">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowApplicationModal(true)}
                    disabled={isApplied}
                    className={`flex-1 px-6 py-3 border font-light tracking-wide transition-all duration-500 flex items-center justify-center gap-2 ${
                      isApplied
                        ? "border-green-600 bg-green-600 text-white"
                        : "border-gray-800 text-gray-800 hover:bg-gray-800 hover:text-white"
                    }`}
                  >
                    {isApplied ? (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        <span>Application Submitted</span>
                      </>
                    ) : (
                      <>
                        <Briefcase className="w-4 h-4" />
                        <span>Apply Now</span>
                      </>
                    )}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 border border-gray-300 text-gray-600 font-light tracking-wide hover:border-gray-800 hover:text-gray-800 transition-all duration-500"
                  >
                    Save for Later
                  </motion.button>
                </div>
              </motion.div>

              {/* Job Description */}
              <motion.section
                variants={itemVariants}
                className="bg-white border border-gray-200 p-8"
              >
                <h2 className="text-2xl font-light text-gray-800 tracking-wide mb-6">
                  Job Description
                </h2>
                <p className="text-gray-600 font-light tracking-wide leading-relaxed mb-8">
                  {job?.description}
                </p>

                <div className="space-y-8">
                  {/* Responsibilities */}
                  {/* <div>
                    <h3 className="text-xl font-light text-gray-800 tracking-wide mb-4">
                      Key Responsibilities
                    </h3>
                    <ul className="space-y-3">
                      {job?.responsibilities.map((responsibility, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-3 text-gray-600 font-light tracking-wide"
                        >
                          <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                          <span>{responsibility}</span>
                        </li>
                      ))}
                    </ul>
                  </div> */}

                  {/* Requirements */}
                  {/* <div>
                    <h3 className="text-xl font-light text-gray-800 tracking-wide mb-4">
                      Requirements
                    </h3>
                    <ul className="space-y-3">
                      {job?.requirements.map((requirement, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-3 text-gray-600 font-light tracking-wide"
                        >
                          <Star className="w-4 h-4 text-amber-600 mt-1 flex-shrink-0" />
                          <span>{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </div> */}

                  {/* Nice to Have */}
                  {/* {job?.niceToHave.length > 0 && (
                    <div>
                      <h3 className="text-xl font-light text-gray-800 tracking-wide mb-4">
                        Nice to Have
                      </h3>
                      <ul className="space-y-3">
                        {job?.niceToHave.map((item, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-3 text-gray-600 font-light tracking-wide"
                          >
                            <Heart className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )} */}

                  {/* Benefits */}
                  {/* <div>
                    <h3 className="text-xl font-light text-gray-800 tracking-wide mb-4">
                      Benefits & Perks
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {job?.benefits.map((benefit, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 text-gray-600 font-light tracking-wide"
                        >
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div> */}
                </div>
              </motion.section>

              {/* Interview Process */}
              {/* <motion.section
                variants={itemVariants}
                className="bg-white border border-gray-200 p-8"
              >
                <h2 className="text-2xl font-light text-gray-800 tracking-wide mb-6">
                  Interview Process
                </h2>
                <div className="space-y-4">
                  {job?.interviewProcess.map((step, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-8 h-8 border border-gray-300 flex items-center justify-center flex-shrink-0">
                        <span className="text-gray-600 font-light text-sm">
                          {index + 1}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-800 font-light tracking-wide">
                          {step}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section> */}

              {/* Company Information */}
              {/* <motion.section
                variants={itemVariants}
                className="bg-white border border-gray-200 p-8"
              >
                <h2 className="text-2xl font-light text-gray-800 tracking-wide mb-6">
                  About {job?.companyInfo.name}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <p className="text-gray-600 font-light tracking-wide leading-relaxed mb-6">
                      {job?.companyInfo.description}
                    </p>

                    <div className="space-y-3">
                      <div className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="text-gray-600 font-light tracking-wide">
                          Company Size
                        </span>
                        <span className="text-gray-800 font-light tracking-wide">
                          {job?.companyInfo.size}
                        </span>
                      </div>
                      <div className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="text-gray-600 font-light tracking-wide">
                          Industry
                        </span>
                        <span className="text-gray-800 font-light tracking-wide">
                          {job?.companyInfo.industry}
                        </span>
                      </div>
                      <div className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="text-gray-600 font-light tracking-wide">
                          Founded
                        </span>
                        <span className="text-gray-800 font-light tracking-wide">
                          {job?.companyInfo.founded}
                        </span>
                      </div>
                      <div className="flex justify-between border-b border-gray-100 pb-2">
                        <span className="text-gray-600 font-light tracking-wide">
                          Culture
                        </span>
                        <span className="text-gray-800 font-light tracking-wide">
                          {job?.companyInfo.culture}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-4 border border-gray-200">
                      <h4 className="text-lg font-light text-gray-800 tracking-wide mb-3">
                        Company Location
                      </h4>
                      <p className="text-gray-600 font-light tracking-wide">
                        {job?.companyInfo.location}
                      </p>
                    </div>

                    <motion.a
                      href={job?.companyInfo.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex items-center justify-between p-4 border border-gray-200 hover:border-gray-800 transition-all duration-500 group"
                    >
                      <div>
                        <h4 className="text-lg font-light text-gray-800 tracking-wide mb-1">
                          Visit Website
                        </h4>
                        <p className="text-gray-600 font-light tracking-wide text-sm">
                          {job?.companyInfo.website}
                        </p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-gray-800 transition-colors duration-300" />
                    </motion.a>
                  </div>
                </div>
              </motion.section> */}
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Application Deadline */}
            <motion.div
              variants={itemVariants}
              className="bg-white border border-gray-200 p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <Calendar className="w-5 h-5 text-gray-600" />
                <h3 className="text-lg font-light text-gray-800 tracking-wide">
                  Application Deadline
                </h3>
              </div>
              <p className="text-gray-600 font-light tracking-wide mb-2">
                {new Date(job?.hiringDriveStart).toLocaleDateString()}-
                {new Date(job?.hiringDriveEnd).toLocaleDateString()}
              </p>
              <p className="text-gray-500 font-light tracking-wide text-sm">
                Apply before the deadline to be considered
              </p>
            </motion.div>

            {/* Recruiter Contact */}
            {/* <motion.div
              variants={itemVariants}
              className="bg-white border border-gray-200 p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <User className="w-5 h-5 text-gray-600" />
                <h3 className="text-lg font-light text-gray-800 tracking-wide">
                  Recruiter Contact
                </h3>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-gray-800 font-light tracking-wide mb-1">
                    {job?.recruiter.name}
                  </h4>
                  <p className="text-gray-600 font-light tracking-wide text-sm">
                    {job?.recruiter.title}
                  </p>
                  <p className="text-gray-500 font-light tracking-wide text-sm mt-2">
                    {job?.recruiter.bio}
                  </p>
                </div>

                <div className="space-y-2">
                  <motion.a
                    href={`mailto:${job?.recruiter.email}`}
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-800 font-light tracking-wide text-sm transition-colors duration-300"
                  >
                    <Mail className="w-4 h-4" />
                    <span>{job?.recruiter.email}</span>
                  </motion.a>

                  <motion.a
                    href={`tel:${job?.recruiter.phone}`}
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-800 font-light tracking-wide text-sm transition-colors duration-300"
                  >
                    <Phone className="w-4 h-4" />
                    <span>{job?.recruiter.phone}</span>
                  </motion.a>
                </div>
              </div>
            </motion.div> */}

            {/* Similar Jobs */}
            <motion.div
              variants={itemVariants}
              className="bg-white border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-light text-gray-800 tracking-wide">
                  Similar Jobs
                </h3>
                <Link
                  to="/interviews"
                  className="text-gray-500 hover:text-gray-700 font-light tracking-wide text-sm transition-colors duration-300"
                >
                  View All
                </Link>
              </div>

              <div className="space-y-4">
                {similarJobs.map((similarJob, index) => (
                  <motion.div
                    key={similarJob.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="p-4 border border-gray-100 hover:border-gray-800 transition-all duration-500 group cursor-pointer"
                  >
                    <Link to={`/jobs/${similarJob.id}`} className="block">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-gray-800 font-light tracking-wide group-hover:text-gray-600 transition-colors duration-300">
                          {similarJob?.title}
                        </h4>
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors duration-300" />
                      </div>

                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Building className="w-3 h-3" />
                          <span>{similarJob?.company}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3 h-3" />
                          <span>{similarJob?.location}</span>
                          {similarJob?.isRemote && (
                            <span className="text-green-600 text-xs">
                              Remote
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-3 h-3" />
                          <span>{similarJob?.salary}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-3">
                        <span className="text-green-600 font-light tracking-wide text-sm">
                          {similarJob?.matchScore}% Match
                        </span>
                        <span className="text-gray-500 font-light tracking-wide text-xs">
                          {similarJob?.type}
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Report Issue */}
            <motion.div
              variants={itemVariants}
              className="bg-white border border-gray-200 p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-5 h-5 text-gray-600" />
                <h3 className="text-lg font-light text-gray-800 tracking-wide">
                  See an Issue?
                </h3>
              </div>
              <p className="text-gray-600 font-light tracking-wide text-sm mb-4">
                Help us maintain quality by reporting any problems with this
                job? posting.
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-600 font-light tracking-wide hover:border-gray-800 hover:text-gray-800 transition-all duration-500"
              >
                <Flag className="w-4 h-4" />
                <span>Report Job</span>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Application Modal */}
      <AnimatePresence>
        {showApplicationModal && (
          <ApplicationModal
            job={job}
            onClose={() => setShowApplicationModal(false)}
            onApply={handleApply}
          />
        )}
      </AnimatePresence>

      {/* Fixed Corner Elements */}
      <div className="fixed top-12 left-12 w-px h-24 bg-gradient-to-b from-gray-300 to-transparent"></div>
      <div className="fixed top-12 right-12 w-px h-24 bg-gradient-to-b from-gray-300 to-transparent"></div>
    </div>
  );
}

// Application Modal Component
function ApplicationModal({ job, onClose, onApply }) {
  const [formData, setFormData] = useState({
    coverLetter: "",
    availability: "",
    salaryExpectation: "",
    noticePeriod: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onApply();
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
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-light text-gray-800 tracking-wide">
              Apply for {job?.title}
            </h2>
            <button
              onClick={onClose}
              className="p-2 border border-gray-300 text-gray-600 hover:border-gray-800 hover:text-gray-800 transition-all duration-500"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          </div>
          <p className="text-gray-600 font-light tracking-wide mt-2">
            at {job?.company}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <h3 className="text-lg font-light text-gray-800 tracking-wide mb-4">
              Application Details
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-light text-gray-600 tracking-wide uppercase mb-2 block">
                  Cover Letter
                </label>
                <textarea
                  value={formData.coverLetter}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      coverLetter: e.target.value,
                    }))
                  }
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 text-gray-800 font-light tracking-wide focus:border-gray-500 focus:outline-none transition-colors duration-500 resize-none"
                  placeholder="Why are you interested in this position?"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-light text-gray-600 tracking-wide uppercase mb-2 block">
                    Availability
                  </label>
                  <select
                    value={formData.availability}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        availability: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 border border-gray-300 text-gray-800 font-light tracking-wide focus:border-gray-500 focus:outline-none transition-colors duration-500"
                  >
                    <option value="">Select availability</option>
                    <option value="immediate">Immediate</option>
                    <option value="2weeks">2 weeks</option>
                    <option value="1month">1 month</option>
                    <option value="2months">2 months</option>
                    <option value="3months">3 months+</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-light text-gray-600 tracking-wide uppercase mb-2 block">
                    Notice Period
                  </label>
                  <input
                    type="text"
                    value={formData.noticePeriod}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        noticePeriod: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-3 border border-gray-300 text-gray-800 font-light tracking-wide focus:border-gray-500 focus:outline-none transition-colors duration-500"
                    placeholder="e.g., 2 weeks"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-light text-gray-600 tracking-wide uppercase mb-2 block">
                  Salary Expectation
                </label>
                <input
                  type="text"
                  value={formData.salaryExpectation}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      salaryExpectation: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-3 border border-gray-300 text-gray-800 font-light tracking-wide focus:border-gray-500 focus:outline-none transition-colors duration-500"
                  placeholder="e.g., $130,000"
                />
              </div>
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
              <span>Submit Application</span>
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
