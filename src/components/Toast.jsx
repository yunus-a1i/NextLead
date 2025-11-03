import React, { createContext, useContext, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Info, 
  X,
  Bell,
  Download,
  Upload,
  Mail,
  User,
  Settings,
  Shield,
  Bookmark,
  Calendar,
  Briefcase,
  Clock
} from "lucide-react";

// Toast Context
const ToastContext = createContext();

// Toast Provider
export function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  const addToast = (toast) => {
    const id = Math.random().toString(36).substr(2, 9);
    const toastWithId = { ...toast, id };
    setToasts((prev) => [...prev, toastWithId]);
    
    // Auto remove after delay
    setTimeout(() => {
      removeToast(id);
    }, toast.duration || 5000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const clearAllToasts = () => {
    setToasts([]);
  };

  return (
    <ToastContext.Provider value={{ addToast, removeToast, clearAllToasts }}>
      {children}
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
}

// Hook to use toast
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

// Toast Container Component
function ToastContainer({ toasts, removeToast }) {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-3 max-w-sm w-full">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast, index) => (
          <Toast
            key={toast.id}
            toast={toast}
            index={index}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

// Individual Toast Component
function Toast({ toast, index, onClose }) {
  const {
    title,
    message,
    type = "info",
    action,
    position = "top-right",
    icon: CustomIcon,
    progress = true
  } = toast;

  const progressRef = useRef(null);

  const toastConfig = {
    success: {
      icon: CheckCircle,
      className: "bg-green-50 border-green-200 text-green-800",
      progressColor: "bg-green-500"
    },
    error: {
      icon: XCircle,
      className: "bg-red-50 border-red-200 text-red-800",
      progressColor: "bg-red-500"
    },
    warning: {
      icon: AlertCircle,
      className: "bg-amber-50 border-amber-200 text-amber-800",
      progressColor: "bg-amber-500"
    },
    info: {
      icon: Info,
      className: "bg-blue-50 border-blue-200 text-blue-800",
      progressColor: "bg-blue-500"
    },
    default: {
      icon: Bell,
      className: "bg-gray-50 border-gray-200 text-gray-800",
      progressColor: "bg-gray-500"
    }
  };

  const config = toastConfig[type] || toastConfig.default;
  const Icon = CustomIcon || config.icon;

  const toastVariants = {
    hidden: {
      opacity: 0,
      x: 300,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
        delay: index * 0.1
      }
    },
    exit: {
      opacity: 0,
      x: 300,
      scale: 0.8,
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <motion.div
      variants={toastVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`relative border rounded-lg p-4 shadow-lg ${config.className} backdrop-blur-sm bg-opacity-95`}
    >
      {/* Progress Bar */}
      {progress && (
        <motion.div
          ref={progressRef}
          className={`absolute top-0 left-0 h-1 ${config.progressColor} rounded-t-lg`}
          initial={{ width: "100%" }}
          animate={{ width: "0%" }}
          transition={{ duration: (toast.duration || 5000) / 1000, ease: "linear" }}
        />
      )}

      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className="flex-shrink-0 mt-0.5">
          <Icon className="w-5 h-5" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {title && (
            <h4 className="font-light tracking-wide text-sm mb-1">
              {title}
            </h4>
          )}
          {message && (
            <p className="text-sm font-light tracking-wide opacity-90 leading-relaxed">
              {message}
            </p>
          )}
          
          {/* Action Button */}
          {action && (
            <div className="mt-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={action.onClick}
                className="px-3 py-1 text-xs border border-current font-light tracking-wide rounded hover:bg-white hover:bg-opacity-20 transition-colors duration-300"
              >
                {action.label}
              </motion.button>
            </div>
          )}
        </div>

        {/* Close Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="flex-shrink-0 p-1 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors duration-300"
        >
          <X className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  );
}

// Specialized Toast Components
export function ToastTemplates() {
  const { addToast } = useToast();

  const templates = {
    // Success Toasts
    success: (title, message, options) => 
      addToast({ type: "success", title, message, ...options }),

    error: (title, message, options) => 
      addToast({ type: "error", title, message, ...options }),

    warning: (title, message, options) => 
      addToast({ type: "warning", title, message, ...options }),

    info: (title, message, options) => 
      addToast({ type: "info", title, message, ...options }),

    // Application Specific
    applicationSubmitted: (jobTitle) =>
      addToast({
        type: "success",
        title: "Application Submitted",
        message: `Your application for ${jobTitle} has been submitted successfully.`,
        icon: CheckCircle,
        duration: 6000
      }),

    jobSaved: (jobTitle) =>
      addToast({
        type: "success",
        title: "Job Saved",
        message: `${jobTitle} has been added to your saved jobs.`,
        icon: Bookmark,
        duration: 4000
      }),

    profileUpdated: () =>
      addToast({
        type: "success",
        title: "Profile Updated",
        message: "Your profile has been updated successfully.",
        icon: User,
        duration: 4000
      }),

    resumeUploaded: () =>
      addToast({
        type: "success",
        title: "Resume Uploaded",
        message: "Your resume has been uploaded successfully.",
        icon: Upload,
        duration: 4000
      }),

    messageSent: (recipient) =>
      addToast({
        type: "success",
        title: "Message Sent",
        message: `Your message to ${recipient} has been sent.`,
        icon: Mail,
        duration: 4000
      }),

    interviewScheduled: (date) =>
      addToast({
        type: "success",
        title: "Interview Scheduled",
        message: `Interview scheduled for ${new Date(date).toLocaleDateString()}.`,
        icon: Calendar,
        duration: 6000,
        action: {
          label: "View Details",
          onClick: () => console.log("Navigate to interview details")
        }
      }),

    // Error Toasts
    applicationError: () =>
      addToast({
        type: "error",
        title: "Application Failed",
        message: "There was an error submitting your application. Please try again.",
        icon: XCircle,
        duration: 6000
      }),

    networkError: () =>
      addToast({
        type: "error",
        title: "Network Error",
        message: "Please check your internet connection and try again.",
        icon: AlertCircle,
        duration: 5000
      }),

    authenticationError: () =>
      addToast({
        type: "error",
        title: "Authentication Required",
        message: "Please log in to continue.",
        icon: Shield,
        duration: 5000,
        action: {
          label: "Login",
          onClick: () => console.log("Navigate to login")
        }
      }),

    // Warning Toasts
    incompleteProfile: () =>
      addToast({
        type: "warning",
        title: "Complete Your Profile",
        message: "Your profile is only 60% complete. Complete it to increase your chances.",
        icon: User,
        duration: 8000,
        action: {
          label: "Complete Now",
          onClick: () => console.log("Navigate to profile")
        }
      }),

    deadlineApproaching: (jobTitle, deadline) =>
      addToast({
        type: "warning",
        title: "Application Deadline Approaching",
        message: `Apply for ${jobTitle} before ${new Date(deadline).toLocaleDateString()}.`,
        icon: Clock,
        duration: 8000,
        action: {
          label: "Apply Now",
          onClick: () => console.log("Navigate to job application")
        }
      }),

    // Info Toasts
    newMessage: (sender) =>
      addToast({
        type: "info",
        title: "New Message",
        message: `You have a new message from ${sender}.`,
        icon: Mail,
        duration: 6000,
        action: {
          label: "View",
          onClick: () => console.log("Navigate to messages")
        }
      }),

    jobMatch: (jobTitle, score) =>
      addToast({
        type: "info",
        title: "New Job Match",
        message: `${jobTitle} is a ${score}% match with your profile.`,
        icon: Briefcase,
        duration: 7000,
        action: {
          label: "View Job",
          onClick: () => console.log("Navigate to job")
        }
      }),

    systemUpdate: () =>
      addToast({
        type: "info",
        title: "System Update",
        message: "New features are available. Check out what's new!",
        icon: Settings,
        duration: 8000,
        action: {
          label: "Learn More",
          onClick: () => console.log("Navigate to updates")
        }
      })
  };

  return templates;
}

// Custom Toast Hook with Templates
export function useToasts() {
  const { addToast, removeToast, clearAllToasts } = useToast();
  const templates = ToastTemplates();

  return {
    addToast,
    removeToast,
    clearAllToasts,
    ...templates
  };
}

// Usage Examples Component (for demonstration)
export function ToastExamples() {
  const {
    success,
    error,
    warning,
    info,
    applicationSubmitted,
    jobSaved,
    profileUpdated,
    interviewScheduled,
    newMessage,
    jobMatch
  } = useToasts();

  return (
    <div className="p-6 space-y-4">
      <h3 className="text-lg font-light text-gray-800 tracking-wide mb-4">
        Toast Examples
      </h3>
      
      <div className="flex flex-wrap gap-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => success("Success", "Operation completed successfully!")}
          className="px-4 py-2 bg-green-600 text-white font-light tracking-wide rounded"
        >
          Success Toast
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => error("Error", "Something went wrong!")}
          className="px-4 py-2 bg-red-600 text-white font-light tracking-wide rounded"
        >
          Error Toast
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => warning("Warning", "Please check your input!")}
          className="px-4 py-2 bg-amber-600 text-white font-light tracking-wide rounded"
        >
          Warning Toast
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => info("Information", "Here's some important info!")}
          className="px-4 py-2 bg-blue-600 text-white font-light tracking-wide rounded"
        >
          Info Toast
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => applicationSubmitted("Senior Frontend Developer")}
          className="px-4 py-2 bg-gray-800 text-white font-light tracking-wide rounded"
        >
          Application Submitted
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => jobSaved("Product Manager at TechCorp")}
          className="px-4 py-2 bg-gray-800 text-white font-light tracking-wide rounded"
        >
          Job Saved
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => profileUpdated()}
          className="px-4 py-2 bg-gray-800 text-white font-light tracking-wide rounded"
        >
          Profile Updated
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => interviewScheduled("2024-12-20")}
          className="px-4 py-2 bg-gray-800 text-white font-light tracking-wide rounded"
        >
          Interview Scheduled
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => newMessage("Sarah Chen")}
          className="px-4 py-2 bg-gray-800 text-white font-light tracking-wide rounded"
        >
          New Message
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => jobMatch("Senior React Developer", 95)}
          className="px-4 py-2 bg-gray-800 text-white font-light tracking-wide rounded"
        >
          Job Match
        </motion.button>
      </div>
    </div>
  );
}