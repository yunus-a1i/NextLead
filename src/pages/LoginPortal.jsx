import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  User,
  Briefcase,
  ArrowRight,
  Building,
  Users,
  Star,
  CheckCircle,
  Shield,
  Zap,
} from "lucide-react";

export default function LoginPortal() {
  const navigate = useNavigate();
  const token = localStorage.getItem("user");
  const user = JSON.parse(localStorage.getItem("user"));
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  const floatingVariants = {
    floating: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const candidateFeatures = [
    {
      icon: Zap,
      title: "Fast Applications",
      description: "Apply to walk-in interviews in seconds",
    },
    {
      icon: Building,
      title: "Top Companies",
      description: "Access opportunities from leading employers",
    },
    {
      icon: CheckCircle,
      title: "Direct Interviews",
      description: "Skip lengthy application processes",
    },
    {
      icon: Shield,
      title: "Secure Platform",
      description: "Your data is protected and private",
    },
  ];

  const recruiterFeatures = [
    {
      icon: Users,
      title: "Quality Candidates",
      description: "Access pre-screened, qualified talent",
    },
    {
      icon: Zap,
      title: "Fast Hiring",
      description: "Reduce time-to-hire significantly",
    },
    {
      icon: Star,
      title: "Curated Matches",
      description: "AI-powered candidate matching",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "Business-grade data protection",
    },
  ];

  useEffect(() => {
    if (!token || !user?.role) return;
    if (user.role === "candidate") navigate("/candidate/dashboard");
    else if (user.role === "recruiter") navigate("/recruiter/dashboard");
  }, [token, user]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-6">
      <div className="max-w-6xl w-full">
        <motion.div
          className="text-center space-y-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="w-16 h-px bg-gray-300 mx-auto"></div>

            {/* Logo */}
            <motion.div
              className="flex items-center justify-center space-x-3 mb-8"
              variants={itemVariants}
            >
              <div className="w-12 h-12 border border-gray-300 flex items-center justify-center">
                <span className="text-gray-800 font-light text-xl tracking-tight">
                  N
                </span>
              </div>
              <span className="text-3xl font-light text-gray-800 tracking-wide">
                NextLead
              </span>
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-light text-gray-800 tracking-tight leading-[0.9]">
              Welcome to
              <motion.span
                className="block bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent font-light mt-4"
                whileInView={{ opacity: [0.8, 1] }}
                transition={{ duration: 1.5, delay: 0.5 }}
              >
                NextLead
              </motion.span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed max-w-3xl mx-auto tracking-wide">
              Choose how you'd like to access our platform
            </p>

            <div className="w-16 h-px bg-gray-300 mx-auto"></div>
          </motion.div>

          {/* Login Options */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto"
            variants={itemVariants}
          >
            {/* Candidate Login Card */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white border border-gray-200 p-8 group hover:border-gray-800 transition-all duration-500"
            >
              <div className="text-center space-y-6">
                {/* Icon */}
                <motion.div
                  className="w-20 h-20 border border-gray-300 mx-auto flex items-center justify-center group-hover:border-gray-800 transition-colors duration-500"
                  variants={floatingVariants}
                  animate="floating"
                >
                  <User className="w-8 h-8 text-gray-600 group-hover:text-gray-800 transition-colors duration-500" />
                </motion.div>

                {/* Content */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-light text-gray-800 tracking-wide">
                    Candidate Login
                  </h2>
                  <p className="text-gray-600 font-light tracking-wide leading-relaxed">
                    Find your next career opportunity through curated walk-in
                    interviews
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-3">
                  {candidateFeatures.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="flex items-center gap-3 text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300"
                      >
                        <Icon className="w-4 h-4 flex-shrink-0" />
                        <span className="font-light tracking-wide">
                          {feature.title}
                        </span>
                        <span className="text-gray-400 font-light">•</span>
                        <span className="font-light text-gray-500 flex-1 text-left">
                          {feature.description}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>

                {/* CTA Button */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="pt-4"
                >
                  <Link
                    to="/login?role=candidate"
                    className="inline-flex items-center justify-center gap-3 w-full px-8 py-4 border border-gray-800 text-gray-800 font-light tracking-wide hover:bg-gray-800 hover:text-white transition-all duration-500 group"
                  >
                    <span>Continue as Candidate</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </motion.div>

                {/* Secondary Link */}
                <div className="pt-2">
                  <Link
                    to="/register?role=candidate"
                    className="text-gray-500 hover:text-gray-700 font-light tracking-wide text-sm transition-colors duration-300"
                  >
                    Don't have an account? Sign up
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Recruiter Login Card */}
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white border border-gray-200 p-8 group hover:border-gray-800 transition-all duration-500"
            >
              <div className="text-center space-y-6">
                {/* Icon */}
                <motion.div
                  className="w-20 h-20 border border-gray-300 mx-auto flex items-center justify-center group-hover:border-gray-800 transition-colors duration-500"
                  variants={floatingVariants}
                  animate="floating"
                  style={{ animationDelay: "1s" }}
                >
                  <Briefcase className="w-8 h-8 text-gray-600 group-hover:text-gray-800 transition-colors duration-500" />
                </motion.div>

                {/* Content */}
                <div className="space-y-4">
                  <h2 className="text-2xl font-light text-gray-800 tracking-wide">
                    Recruiter Login
                  </h2>
                  <p className="text-gray-600 font-light tracking-wide leading-relaxed">
                    Find qualified candidates faster with our direct interview
                    platform
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-3">
                  {recruiterFeatures.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <motion.div
                        key={feature.title}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                        className="flex items-center gap-3 text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300"
                      >
                        <Icon className="w-4 h-4 flex-shrink-0" />
                        <span className="font-light tracking-wide">
                          {feature.title}
                        </span>
                        <span className="text-gray-400 font-light">•</span>
                        <span className="font-light text-gray-500 flex-1 text-left">
                          {feature.description}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>

                {/* CTA Button */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="pt-4"
                >
                  <Link
                    to="/login?role=recruiter"
                    className="inline-flex items-center justify-center gap-3 w-full px-8 py-4 border border-gray-800 text-gray-800 font-light tracking-wide hover:bg-gray-800 hover:text-white transition-all duration-500 group"
                  >
                    <span>Continue as Recruiter</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </motion.div>

                {/* Secondary Link */}
                <div className="pt-2">
                  <Link
                    to="/register?role=recruiter"
                    className="text-gray-500 hover:text-gray-700 font-light tracking-wide text-sm transition-colors duration-300"
                  >
                    Need a recruiter account? Sign up
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Divider */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center space-x-4 max-w-sm mx-auto"
          >
            <div className="w-16 h-px bg-gray-300"></div>
            <span className="text-gray-500 font-light tracking-wide text-sm">
              Or
            </span>
            <div className="w-16 h-px bg-gray-300"></div>
          </motion.div>

          {/* Guest Access */}
          <motion.div variants={itemVariants} className="text-center">
            <p className="text-gray-600 font-light tracking-wide mb-4">
              Just want to explore opportunities?
            </p>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                to="/interviews"
                className="inline-flex items-center gap-2 px-8 py-3 border border-gray-300 text-gray-600 font-light tracking-wide hover:border-gray-800 hover:text-gray-800 transition-all duration-500 group"
              >
                <span>Browse Opportunities as Guest</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Security Note */}
          <motion.div
            variants={itemVariants}
            className="text-center max-w-2xl mx-auto"
          >
            <div className="flex items-center justify-center gap-2 text-gray-500 mb-2">
              <Shield className="w-4 h-4" />
              <span className="font-light tracking-wide text-sm">
                Enterprise-grade security
              </span>
            </div>
            <p className="text-gray-400 font-light tracking-wide text-xs">
              Your data is encrypted and protected. We never share your
              information with third parties.
            </p>
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
