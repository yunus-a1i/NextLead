import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Home, 
  ArrowLeft, 
  Search,
  AlertCircle,
  RefreshCw,
  Mail,
  HelpCircle
} from "lucide-react";

export default function SomethingWentWrongPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.8
      }
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const floatingVariants = {
    floating: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const quickActions = [
    {
      icon: Home,
      label: "Go Home",
      description: "Return to the homepage",
      action: "/"
    },
    {
      icon: ArrowLeft,
      label: "Go Back",
      description: "Return to previous page",
      action: -1
    },
    {
      icon: Search,
      label: "Search",
      description: "Find what you need",
      action: "/search"
    },
    {
      icon: RefreshCw,
      label: "Reload",
      description: "Refresh the page",
      action: "reload"
    }
  ];

  const supportOptions = [
    {
      icon: HelpCircle,
      title: "Help Center",
      description: "Find answers to common questions",
      link: "/help"
    },
    {
      icon: Mail,
      title: "Contact Support",
      description: "Get help from our team",
      link: "/contact"
    }
  ];

  const handleAction = (action) => {
    if (action === "reload") {
      window.location.reload();
    } else if (action === -1) {
      window.history.back();
    } else {
      window.location.href = action;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        <motion.div
          className="text-center space-y-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="w-16 h-px bg-gray-300 mx-auto"></div>
            
            {/* Animated Icon */}
            <motion.div
              className="w-24 h-24 border border-gray-300 mx-auto flex items-center justify-center mb-6"
              variants={floatingVariants}
              animate="floating"
            >
              <AlertCircle className="w-12 h-12 text-gray-600" />
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-light text-gray-800 tracking-tight leading-[0.9]">
              Page Not
              <motion.span
                className="block bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent font-light mt-4"
                whileInView={{ opacity: [0.8, 1] }}
                transition={{ duration: 1.5, delay: 0.5 }}
              >
                Found
              </motion.span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed max-w-2xl mx-auto tracking-wide">
              We can't seem to find the page you're looking for. 
              It might have been moved, deleted, or never existed.
            </p>

            <div className="w-16 h-px bg-gray-300 mx-auto"></div>
          </motion.div>

          {/* Error Code */}
          <motion.div 
            variants={itemVariants}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-full px-6 py-3">
              <span className="text-gray-500 font-light tracking-wide text-sm">Error Code:</span>
              <span className="text-gray-800 font-light tracking-wide">404</span>
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div>
              <h2 className="text-2xl font-light text-gray-800 tracking-wide mb-6">
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl mx-auto">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <motion.button
                      key={action.label}
                      onClick={() => handleAction(action.action)}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="p-6 bg-white border border-gray-200 text-left hover:border-gray-800 transition-all duration-500 group"
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="w-12 h-12 border border-gray-300 flex items-center justify-center mb-4 group-hover:border-gray-800 transition-colors duration-500">
                        <Icon className="w-5 h-5 text-gray-600 group-hover:text-gray-800 transition-colors duration-500" />
                      </div>
                      <h3 className="text-lg font-light text-gray-800 tracking-wide mb-2">
                        {action.label}
                      </h3>
                      <p className="text-gray-600 font-light tracking-wide text-sm">
                        {action.description}
                      </p>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Support Section */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="w-16 h-px bg-gray-300 mx-auto"></div>
            
            <div>
              <h2 className="text-2xl font-light text-gray-800 tracking-wide mb-6">
                Need Help?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                {supportOptions.map((option, index) => {
                  const Icon = option.icon;
                  return (
                    <motion.div
                      key={option.title}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="bg-white border border-gray-200 p-6 hover:border-gray-800 transition-all duration-500 group cursor-pointer"
                    >
                      <Link to={option.link} className="block">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 border border-gray-300 flex items-center justify-center group-hover:border-gray-800 transition-colors duration-500">
                            <Icon className="w-5 h-5 text-gray-600 group-hover:text-gray-800 transition-colors duration-500" />
                          </div>
                          <div className="text-left">
                            <h3 className="text-lg font-light text-gray-800 tracking-wide mb-1">
                              {option.title}
                            </h3>
                            <p className="text-gray-600 font-light tracking-wide text-sm">
                              {option.description}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Search Suggestion */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="w-16 h-px bg-gray-300 mx-auto"></div>
            
            <div className="max-w-md mx-auto">
              <h3 className="text-lg font-light text-gray-800 tracking-wide mb-4">
                Try searching instead
              </h3>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="What are you looking for?"
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 text-gray-800 font-light tracking-wide focus:border-gray-500 focus:outline-none transition-colors duration-500"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      window.location.href = `/search?q=${e.target.value}`;
                    }
                  }}
                />
              </div>
            </div>
          </motion.div>

          {/* Technical Details (Collapsible) */}
          <motion.div variants={itemVariants} className="space-y-4 max-w-2xl mx-auto">
            <details className="bg-white border border-gray-200 p-6 group">
              <summary className="cursor-pointer list-none">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-light text-gray-800 tracking-wide">
                    Technical Details
                  </span>
                  <div className="w-5 h-5 border border-gray-300 flex items-center justify-center group-hover:border-gray-800 transition-colors duration-500">
                    <div className="w-2 h-2 bg-gray-600"></div>
                  </div>
                </div>
              </summary>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="space-y-3 text-left">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 font-light">URL:</span>
                    <span className="text-gray-800 font-light">{window.location.href}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 font-light">Status:</span>
                    <span className="text-gray-800 font-light">404 Not Found</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 font-light">Timestamp:</span>
                    <span className="text-gray-800 font-light">{new Date().toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </details>
          </motion.div>
        </motion.div>
      </div>

      {/* Fixed Corner Elements */}
      <div className="fixed top-12 left-12 w-px h-24 bg-gradient-to-b from-gray-300 to-transparent"></div>
      <div className="fixed top-12 right-12 w-px h-24 bg-gradient-to-b from-gray-300 to-transparent"></div>
      <div className="fixed bottom-12 left-12 w-px h-24 bg-gradient-to-t from-gray-300 to-transparent"></div>
      <div className="fixed bottom-12 right-12 w-px h-24 bg-gradient-to-t from-gray-300 to-transparent"></div>
    </div>
  );
}