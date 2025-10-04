import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Users, 
  Target, 
  Zap, 
  BarChart3, 
  Shield,
  Clock,
  Award,
  Building,
  ArrowRight,
  CheckCircle,
  Calendar,
  MessageSquare,
  Filter,
  Star
} from "lucide-react";

export default function ForRecruiters() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  const features = [
    {
      icon: Target,
      title: "Pre-Screened Talent",
      description: "Access candidates who are actively looking and pre-vetted for quality"
    },
    {
      icon: Zap,
      title: "Fast Hiring",
      description: "Reduce time-to-hire from weeks to days with direct walk-in interviews"
    },
    {
      icon: BarChart3,
      title: "Data-Driven Matching",
      description: "AI-powered candidate matching based on your specific requirements"
    },
    {
      icon: Shield,
      title: "Quality Assurance",
      description: "Every candidate is verified and meets our quality standards"
    }
  ];

  const benefits = [
    "Reduce hiring time by 70%",
    "Access to passive candidates",
    "Lower cost per hire",
    "Higher candidate quality",
    "Streamlined interview process",
    "Real-time analytics dashboard"
  ];

  const platformStats = [
    { number: "50K+", label: "Active Candidates" },
    { number: "85%", label: "Interview Show Rate" },
    { number: "72h", label: "Average Time to Hire" },
    { number: "4.8/5", label: "Client Satisfaction" }
  ];

  const howItWorks = [
    {
      step: "01",
      title: "Post Your Opportunity",
      description: "Create detailed job listings with your specific requirements and interview slots"
    },
    {
      step: "02",
      title: "Receive Qualified Applicants",
      description: "Get matched with pre-screened candidates who fit your role perfectly"
    },
    {
      step: "03",
      title: "Schedule Walk-Ins",
      description: "Coordinate interview times directly through our platform"
    },
    {
      step: "04",
      title: "Hire Top Talent",
      description: "Make offers to the best candidates and track your hiring success"
    }
  ];

  const recruitmentTools = [
    {
      icon: Filter,
      title: "Advanced Filtering",
      description: "Filter candidates by skills, experience, location, and availability"
    },
    {
      icon: Calendar,
      title: "Interview Scheduling",
      description: "Streamlined calendar management for multiple interview slots"
    },
    {
      icon: MessageSquare,
      title: "Direct Communication",
      description: "Communicate directly with candidates through our secure platform"
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Track your hiring metrics and optimize your recruitment strategy"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Hero Section */}
      <section className="relative border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <motion.div
            className="text-center space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="w-16 h-px bg-gray-300 mx-auto"></div>
              <h1 className="text-4xl md:text-6xl font-light text-gray-800 tracking-tight leading-[0.9]">
                For
                <motion.span
                  className="block bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent font-light mt-4"
                  whileInView={{ opacity: [0.8, 1] }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                >
                  Recruiters
                </motion.span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed max-w-3xl mx-auto tracking-wide">
                Streamline your hiring process with qualified candidates through direct walk-in interviews. 
                Find the right talent faster and more efficiently.
              </p>
              <div className="w-16 h-px bg-gray-300 mx-auto"></div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8"
              variants={itemVariants}
            >
              <motion.div 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  to="/register"
                  className="group inline-flex items-center gap-4 px-12 py-4 bg-gray-800 text-white font-light tracking-wider hover:bg-gray-900 transition-all duration-500"
                >
                  <span className="text-sm uppercase tracking-[0.2em]">Start Hiring</span>
                  <div className="w-px h-4 bg-white/30"></div>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-4 px-12 py-4 border border-gray-800 text-gray-800 font-light tracking-wider hover:bg-gray-800 hover:text-white transition-all duration-500"
                >
                  <span className="text-sm uppercase tracking-[0.2em]">Schedule Demo</span>
                  <div className="w-px h-4 bg-gray-800 group-hover:bg-white/30 transition-colors duration-300"></div>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-20 border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-16 h-px bg-gray-300 mx-auto mb-6"></div>
            <h2 className="text-3xl font-light text-gray-800 tracking-wide mb-4">
              Transform Your Hiring Process
            </h2>
            <p className="text-gray-600 font-light tracking-wide max-w-2xl mx-auto">
              Move beyond traditional recruitment methods and connect with qualified candidates directly
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="text-center group"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="w-16 h-16 border border-gray-300 mx-auto mb-6 flex items-center justify-center group-hover:border-gray-800 transition-colors duration-500">
                  <feature.icon className="w-6 h-6 text-gray-600 group-hover:text-gray-800 transition-colors duration-500" />
                </div>
                <h3 className="text-lg font-light text-gray-800 mb-3 tracking-wide">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm font-light leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits & Stats */}
      <section className="py-20 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div>
              <div className="w-16 h-px bg-gray-300 mb-6"></div>
              <h2 className="text-3xl font-light text-gray-800 tracking-wide mb-6">
                Recruiter Benefits
              </h2>
              <p className="text-gray-600 font-light tracking-wide leading-relaxed mb-8">
                Experience significant improvements in your recruitment metrics while reducing time and costs.
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    className="flex items-center gap-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <CheckCircle className="w-5 h-5 text-gray-600 flex-shrink-0" />
                    <span className="text-gray-600 font-light tracking-wide">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-white border border-gray-200 p-8 space-y-6">
                {/* Platform Stats */}
                <div className="grid grid-cols-2 gap-6">
                  {platformStats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      className="text-center"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="text-2xl font-light text-gray-800 mb-1">
                        {stat.number}
                      </div>
                      <div className="text-gray-600 text-sm font-light tracking-wide">
                        {stat.label}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Card */}
                <motion.div
                  className="text-center pt-6 border-t border-gray-100"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    to="/register"
                    className="inline-flex items-center gap-3 px-8 py-4 border border-gray-800 text-gray-800 font-light tracking-wide text-sm hover:bg-gray-800 hover:text-white transition-all duration-500 group"
                  >
                    <span>Create Recruiter Account</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 border-b border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-16 h-px bg-gray-300 mx-auto mb-6"></div>
            <h2 className="text-3xl font-light text-gray-800 tracking-wide mb-4">
              Streamlined Recruitment Process
            </h2>
            <p className="text-gray-600 font-light tracking-wide max-w-2xl mx-auto">
              From posting to hiring, we've optimized every step for maximum efficiency
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {howItWorks.map((step, index) => (
              <motion.div
                key={step.step}
                className="text-center group"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="w-20 h-20 border border-gray-300 mx-auto mb-6 flex items-center justify-center group-hover:border-gray-800 transition-colors duration-500">
                  <span className="text-2xl font-light text-gray-600 group-hover:text-gray-800 transition-colors duration-500">
                    {step.step}
                  </span>
                </div>
                <h3 className="text-lg font-light text-gray-800 mb-3 tracking-wide">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm font-light leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recruitment Tools */}
      <section className="py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-16 h-px bg-gray-300 mx-auto mb-6"></div>
            <h2 className="text-3xl font-light text-gray-800 tracking-wide mb-4">
              Powerful Recruitment Tools
            </h2>
            <p className="text-gray-600 font-light tracking-wide max-w-2xl mx-auto">
              Everything you need to manage your hiring process efficiently
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {recruitmentTools.map((tool, index) => (
              <motion.div
                key={tool.title}
                className="text-center group"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="w-16 h-16 border border-gray-300 mx-auto mb-6 flex items-center justify-center group-hover:border-gray-800 transition-colors duration-500">
                  <tool.icon className="w-6 h-6 text-gray-600 group-hover:text-gray-800 transition-colors duration-500" />
                </div>
                <h3 className="text-lg font-light text-gray-800 mb-3 tracking-wide">
                  {tool.title}
                </h3>
                <p className="text-gray-600 text-sm font-light leading-relaxed">
                  {tool.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-16 h-px bg-gray-300 mx-auto"></div>
            
            <h2 className="text-3xl font-light text-gray-800 tracking-wide">
              Ready to Transform Your Hiring?
            </h2>
            
            <p className="text-gray-600 font-light tracking-wide text-lg max-w-2xl mx-auto">
              Join leading companies that have revolutionized their recruitment with NextLead.
            </p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to="/register"
                className="group inline-flex items-center gap-4 px-12 py-4 bg-gray-800 text-white font-light tracking-wider hover:bg-gray-900 transition-all duration-500"
              >
                <span className="text-sm uppercase tracking-[0.2em]">Start Hiring Today</span>
                <div className="w-px h-4 bg-white/30"></div>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>

              <Link
                to="/contact"
                className="group inline-flex items-center gap-4 px-12 py-4 border border-gray-800 text-gray-800 font-light tracking-wider hover:bg-gray-800 hover:text-white transition-all duration-500"
              >
                <span className="text-sm uppercase tracking-[0.2em]">Request Enterprise Demo</span>
                <div className="w-px h-4 bg-gray-800 group-hover:bg-white/30 transition-colors duration-300"></div>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>

            <p className="text-gray-400 text-sm font-light tracking-wide pt-8">
              No setup fees • Dedicated account manager • 30-day free trial
            </p>
          </motion.div>
        </div>
      </section>

      {/* Fixed Corner Elements */}
      <div className="fixed top-12 left-12 w-px h-24 bg-gradient-to-b from-gray-300 to-transparent"></div>
      <div className="fixed top-12 right-12 w-px h-24 bg-gradient-to-b from-gray-300 to-transparent"></div>
    </div>
  );
}