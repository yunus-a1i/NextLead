import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Search, 
  MapPin, 
  Calendar, 
  Briefcase, 
  Target,
  Users,
  Award,
  Star,
  Clock,
  Building,
  ArrowRight,
  ChevronDown,
  Play,
  CheckCircle
} from "lucide-react";

export default function ForCandidates() {
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
      icon: Search,
      title: "Smart Matching",
      description: "AI-powered job matching based on your skills and preferences"
    },
    {
      icon: Target,
      title: "Targeted Opportunities",
      description: "Curated interviews from companies actively hiring your profile"
    },
    {
      icon: Clock,
      title: "Time-Saving Process",
      description: "Skip the lengthy application process with direct walk-ins"
    },
    {
      icon: Award,
      title: "Quality Assurance",
      description: "Vetted companies with competitive compensation packages"
    }
  ];

  const benefits = [
    "Direct access to hiring managers",
    "Immediate interview feedback",
    "No lengthy application forms",
    "Real-time opportunity updates",
    "Personalized career guidance",
    "Competitive salary insights"
  ];

  const successStats = [
    { number: "85%", label: "Interview Success Rate" },
    { number: "24h", label: "Average Response Time" },
    { number: "500+", label: "Hiring Partners" },
    { number: "10K+", label: "Candidates Hired" }
  ];

  const howItWorks = [
    {
      step: "01",
      title: "Create Your Profile",
      description: "Build your professional profile with skills, experience, and preferences"
    },
    {
      step: "02",
      title: "Get Matched",
      description: "Receive personalized interview opportunities based on your profile"
    },
    {
      step: "03",
      title: "Apply Directly",
      description: "Submit your interest for walk-in interviews with one click"
    },
    {
      step: "04",
      title: "Attend & Excel",
      description: "Meet companies in person and showcase your talents"
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
                  Candidates
                </motion.span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed max-w-3xl mx-auto tracking-wide">
                Your direct path to meaningful career opportunities. 
                Skip the traditional application process and connect with top companies through curated walk-in interviews.
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
                  <span className="text-sm uppercase tracking-[0.2em]">Start Your Journey</span>
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
                  to="/interviews"
                  className="group inline-flex items-center gap-4 px-12 py-4 border border-gray-800 text-gray-800 font-light tracking-wider hover:bg-gray-800 hover:text-white transition-all duration-500"
                >
                  <span className="text-sm uppercase tracking-[0.2em]">Browse Opportunities</span>
                  <div className="w-px h-4 bg-gray-800 group-hover:bg-white/30 transition-colors duration-300"></div>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
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
              Why Choose NextLead
            </h2>
            <p className="text-gray-600 font-light tracking-wide max-w-2xl mx-auto">
              Experience a modern approach to job hunting designed for today's top talent
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
              How It Works
            </h2>
            <p className="text-gray-600 font-light tracking-wide max-w-2xl mx-auto">
              Simple, transparent, and designed for your success
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

      {/* Benefits List */}
      <section className="py-20 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div>
              <div className="w-16 h-px bg-gray-300 mb-6"></div>
              <h2 className="text-3xl font-light text-gray-800 tracking-wide mb-6">
                Candidate Benefits
              </h2>
              <p className="text-gray-600 font-light tracking-wide leading-relaxed mb-8">
                We've reimagined the job search experience to put you in control of your career trajectory.
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
                {/* Success Stats */}
                <div className="grid grid-cols-2 gap-6">
                  {successStats.map((stat, index) => (
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
                    <span>Create Your Profile</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
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
              Ready to Advance Your Career?
            </h2>
            
            <p className="text-gray-600 font-light tracking-wide text-lg max-w-2xl mx-auto">
              Join thousands of professionals who found their dream roles through direct walk-in interviews.
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
                <span className="text-sm uppercase tracking-[0.2em]">Get Started Today</span>
                <div className="w-px h-4 bg-white/30"></div>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>

            <p className="text-gray-400 text-sm font-light tracking-wide pt-8">
              Complete your profile in 5 minutes • Personalized matches • No spam
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