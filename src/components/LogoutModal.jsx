import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LogOut, 
  X, 
  User,
  Shield,
  HelpCircle
} from "lucide-react";

export default function LogoutModal({ isOpen, onClose, onConfirm, user }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  };

  const modalVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.9,
      y: 20
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: -20,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            className="bg-white border border-gray-200 max-w-md w-full"
            variants={modalVariants}
          >
            {/* Header */}
            <motion.div 
              className="p-6 border-b border-gray-100"
              variants={itemVariants}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 border border-gray-300 flex items-center justify-center">
                    <LogOut className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-light text-gray-800 tracking-wide">
                      Sign Out
                    </h2>
                    <p className="text-gray-600 font-light tracking-wide text-sm">
                      Confirm your logout
                    </p>
                  </div>
                </div>
                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 border border-gray-300 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors duration-300"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>

            {/* User Info */}
            <motion.div 
              className="p-6 border-b border-gray-100"
              variants={itemVariants}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 border border-gray-300 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <h3 className="text-lg font-light text-gray-800 tracking-wide">
                    {user?.name || "User"}
                  </h3>
                  <p className="text-gray-600 font-light tracking-wide text-sm capitalize">
                    {user?.role || "Candidate"}
                  </p>
                  <p className="text-gray-500 font-light tracking-wide text-sm">
                    {user?.email || "user@example.com"}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Warning Message */}
            <motion.div 
              className="p-6 border-b border-gray-100"
              variants={itemVariants}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-light text-gray-800 tracking-wide mb-2">
                    Security Notice
                  </h4>
                  <p className="text-gray-600 font-light tracking-wide text-sm leading-relaxed">
                    You will be signed out of your account on this device. 
                    Any unsaved changes will be lost.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Help Link */}
            <motion.div 
              className="p-6 border-b border-gray-100"
              variants={itemVariants}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-3 text-gray-600 hover:text-gray-800 transition-colors duration-300 cursor-pointer group">
                <HelpCircle className="w-4 h-4" />
                <span className="font-light tracking-wide text-sm">
                  Having trouble signing out?
                </span>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div 
              className="p-6 flex flex-col sm:flex-row gap-3"
              variants={itemVariants}
              transition={{ delay: 0.4 }}
            >
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-light tracking-wide hover:border-gray-400 transition-all duration-500"
              >
                Cancel
              </motion.button>
              <motion.button
                onClick={onConfirm}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 px-6 py-3 border border-gray-800 text-gray-800 font-light tracking-wide hover:bg-gray-800 hover:text-white transition-all duration-500 flex items-center justify-center gap-2 group"
              >
                <LogOut className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                <span>Sign Out</span>
              </motion.button>
            </motion.div>

            {/* Footer Note */}
            <motion.div 
              className="px-6 py-4 bg-gray-50 border-t border-gray-100"
              variants={itemVariants}
              transition={{ delay: 0.5 }}
            >
              <p className="text-gray-500 font-light tracking-wide text-xs text-center">
                You can sign back in anytime with your credentials
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}