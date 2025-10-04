// components/HeroSection.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
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

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Minimal Background Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent"></div>
      
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02] bg-[length:50px_50px] bg-[linear-gradient(to_right,_#f0f0f0_1px,_transparent_1px),_linear-gradient(to_bottom,_#f0f0f0_1px,_transparent_1px)]"></div>

      {/* Elegant Floating Elements */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 border border-white/5 rounded-full"
        variants={floatingVariants}
        animate="floating"
        style={{ animationDelay: '0s' }}
      />
      
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-80 h-80 border border-white/5 rounded-full"
        variants={floatingVariants}
        animate="floating"
        style={{ animationDelay: '2s' }}
      />

      {/* Main Content */}
      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <motion.div
          className="space-y-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Premium Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-3"
          >
            <div className="w-16 h-px bg-white/20"></div>
            <span className="text-white/60 text-sm tracking-[0.3em] uppercase font-light">
              Elite Career Platform
            </span>
            <div className="w-16 h-px bg-white/20"></div>
          </motion.div>

          {/* Main Heading */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-white tracking-tight leading-[0.9]">
              Next
              <motion.span
                className="block bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent font-light mt-4"
                whileInView={{ opacity: [0.8, 1] }}
                transition={{ duration: 1.5, delay: 0.5 }}
              >
                Lead
              </motion.span>
            </h1>
          </motion.div>

          {/* Subtitle */}
          <motion.div variants={itemVariants} className="space-y-8">
            <p className="text-xl md:text-2xl text-white/60 font-light leading-relaxed max-w-2xl mx-auto tracking-wide">
              Curated walk-in interviews for exceptional talent. 
              <br />
              Where ambition meets opportunity.
            </p>

            {/* Divider */}
            <div className="w-24 h-px bg-white/20 mx-auto"></div>

            {/* Minimal CTA */}
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
                  to="/register"
                  className="group inline-flex items-center gap-4 px-12 py-4 border border-white/30 text-white font-light tracking-wider rounded-none hover:bg-white/5 transition-all duration-500 backdrop-blur-sm"
                >
                  <span className="text-sm uppercase tracking-[0.2em]">Begin Journey</span>
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
                  className="text-white/50 hover:text-white font-light text-sm uppercase tracking-[0.2em] transition-all duration-500 underline-offset-8 hover:underline"
                >
                  View Opportunities
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-white/30"
        >
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>

      {/* Luxury Accent Elements */}
      <div className="absolute top-12 left-12 w-px h-24 bg-gradient-to-b from-white/20 to-transparent"></div>
      <div className="absolute top-12 right-12 w-px h-24 bg-gradient-to-b from-white/20 to-transparent"></div>
      <div className="absolute bottom-12 left-12 w-px h-24 bg-gradient-to-t from-white/20 to-transparent"></div>
      <div className="absolute bottom-12 right-12 w-px h-24 bg-gradient-to-t from-white/20 to-transparent"></div>
    </section>
  );
}