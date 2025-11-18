import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  ChevronDown, 
  Search, 
  MapPin, 
  Calendar,
  Building,
  Users,
  Star,
  Award,
  Target
} from "lucide-react";

export default function BeginJourney() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 1.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const floatingVariants = {
    floating: {
      y: [-8, 8, -8],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const steps = [
    {
      icon: Search,
      title: "Discover Opportunities",
      description: "Browse curated walk-in interviews from top companies"
    },
    {
      icon: Target,
      title: "Apply Strategically",
      description: "Submit applications to roles that match your skills"
    },
    {
      icon: Users,
      title: "Attend Interviews",
      description: "Meet with companies and showcase your potential"
    },
    {
      icon: Award,
      title: "Get Hired",
      description: "Receive offers and start your career journey"
    }
  ];

  const features = [
    {
      icon: Building,
      title: "500+ Companies",
      description: "Leading organizations across industries"
    },
    {
      icon: MapPin,
      title: "Location Based",
      description: "Find opportunities in your preferred cities"
    },
    {
      icon: Calendar,
      title: "Real-time Updates",
      description: "Fresh opportunities updated daily"
    },
    {
      icon: Star,
      title: "Curated Matches",
      description: "Smart recommendations based on your profile"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Hero Section */}
      {/* <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent"></div>
        
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 border border-white/5 rounded-full"
          variants={floatingVariants}
          animate="floating"
        />
        
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-80 h-80 border border-white/5 rounded-full"
          variants={floatingVariants}
          animate="floating"
          style={{ animationDelay: '2s' }}
        />

        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <motion.div
            className="space-y-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="space-y-4">
                <div className="w-16 h-px bg-gray-300 mx-auto"></div>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-gray-800 tracking-tight leading-[0.9]">
                  Begin Your
                  <motion.span
                    className="block bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent font-light mt-4"
                    whileInView={{ opacity: [0.8, 1] }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  >
                    Journey
                  </motion.span>
                </h1>
              </div>

              <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed max-w-3xl mx-auto tracking-wide">
                Start your career transformation with curated opportunities from leading companies. 
                Your next role awaits.
              </p>
            </motion.div>

            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              variants={itemVariants}
            >
              <motion.div 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  to="/login-portal"
                  className="group inline-flex items-center gap-4 px-12 py-4 bg-gray-800 text-white font-light tracking-wider hover:bg-gray-900 transition-all duration-500"
                >
                  <span className="text-sm uppercase tracking-[0.2em]">Create Account</span>
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

            <motion.div
              className="pt-12"
              variants={itemVariants}
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-gray-400"
              >
                <ChevronDown className="w-6 h-6 mx-auto" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section> */}

      {/* How It Works Section */}
      <section className="py-20 border-t border-gray-200">
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
              A streamlined process designed to connect you with the right opportunities
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                className="text-center group"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="w-16 h-16 border border-gray-300 mx-auto mb-6 flex items-center justify-center group-hover:border-gray-800 transition-colors duration-500">
                  <step.icon className="w-6 h-6 text-gray-600 group-hover:text-gray-800 transition-colors duration-500" />
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

      {/* Features Section */}
      <section className="py-20 border-t border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-6">
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
              Premium features designed for ambitious professionals
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

      {/* Final CTA Section */}
      <section className="py-20 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-16 h-px bg-gray-300 mx-auto"></div>
            
            <h2 className="text-3xl font-light text-gray-800 tracking-wide">
              Ready to Transform Your Career?
            </h2>
            
            <p className="text-gray-600 font-light tracking-wide text-lg max-w-2xl mx-auto">
              Join thousands of professionals who found their dream roles through NextLead
            </p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                to="/login-portal"
                className="group inline-flex items-center gap-4 px-12 py-4 bg-gray-800 text-white font-light tracking-wider hover:bg-gray-900 transition-all duration-500"
              >
                <span className="text-sm uppercase tracking-[0.2em]">Start Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>

            <p className="text-gray-400 text-sm font-light tracking-wide pt-8">
              No commitment required • Free forever
            </p>
          </motion.div>
        </div>
      </section>

      {/* Luxury Accent Elements */}
      {/* <div className="fixed top-12 left-12 w-px h-24 bg-gradient-to-b from-gray-300 to-transparent"></div>
      <div className="fixed top-12 right-12 w-px h-24 bg-gradient-to-b from-gray-300 to-transparent"></div>
      <div className="fixed bottom-12 left-12 w-px h-24 bg-gradient-to-t from-gray-300 to-transparent"></div>
      <div className="fixed bottom-12 right-12 w-px h-24 bg-gradient-to-t from-gray-300 to-transparent"></div> */}
    </div>
  );
}