import React from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Target,
  Users,
  Zap,
  Shield,
  Award,
  Globe,
  Heart,
  ArrowRight,
  Building,
  Star,
  CheckCircle,
  TrendingUp,
  User,
  Clock
} from "lucide-react";

export default function AboutPage() {
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

  const values = [
    {
      icon: Target,
      title: "Excellence",
      description: "We strive for excellence in every interaction and match we facilitate."
    },
    {
      icon: Users,
      title: "Connection",
      description: "Building meaningful connections between talent and opportunity."
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Continuously innovating to improve the recruitment experience."
    },
    {
      icon: Shield,
      title: "Trust",
      description: "Maintaining the highest standards of security and privacy."
    },
    {
      icon: Award,
      title: "Quality",
      description: "Focusing on quality matches over quantity of applications."
    },
    {
      icon: Globe,
      title: "Accessibility",
      description: "Making career opportunities accessible to everyone, everywhere."
    }
  ];

  const milestones = [
    {
      year: "2022",
      title: "Company Founded",
      description: "NextLead was born from a vision to revolutionize recruitment."
    },
    {
      year: "2023",
      title: "Platform Launch",
      description: "Successfully launched our MVP with 50+ partner companies."
    },
    {
      year: "2024",
      title: "Growth Phase",
      description: "Expanded to 500+ companies and 10,000+ active candidates."
    },
    {
      year: "2025",
      title: "Future Vision",
      description: "Planning international expansion and AI-powered matching."
    }
  ];

  const team = [
    {
      name: "Sarah Chen",
      role: "CEO & Founder",
      bio: "Former tech recruiter with 10+ years in talent acquisition.",
      expertise: ["Recruitment", "Strategy", "Leadership"]
    },
    {
      name: "Michael Rodriguez",
      role: "CTO",
      bio: "Software engineer passionate about building scalable platforms.",
      expertise: ["Technology", "AI/ML", "Infrastructure"]
    },
    {
      name: "Emily Watson",
      role: "Head of Product",
      bio: "Product manager focused on user-centric design and experience.",
      expertise: ["Product", "UX/UI", "Research"]
    },
    {
      name: "James Thompson",
      role: "Head of Growth",
      bio: "Growth marketer with expertise in scaling B2B platforms.",
      expertise: ["Marketing", "Sales", "Partnerships"]
    }
  ];

  const stats = [
    { number: "10K+", label: "Successful Hires" },
    { number: "500+", label: "Partner Companies" },
    { number: "85%", label: "Interview Success Rate" },
    { number: "24h", label: "Average Response Time" }
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
                About
                <motion.span
                  className="block bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent font-light mt-4"
                  whileInView={{ opacity: [0.8, 1] }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                >
                  NextLead
                </motion.span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed max-w-3xl mx-auto tracking-wide">
                Revolutionizing the way companies find talent and candidates discover opportunities through curated walk-in interviews.
              </p>
              <div className="w-16 h-px bg-gray-300 mx-auto"></div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="w-16 h-px bg-gray-300"></div>
              <h2 className="text-3xl font-light text-gray-800 tracking-wide">
                Our Mission
              </h2>
              <p className="text-gray-600 font-light tracking-wide leading-relaxed text-lg">
                To create a more efficient, transparent, and human-centric recruitment ecosystem 
                where exceptional talent meets meaningful opportunities through direct connections.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="font-light tracking-wide">Eliminate lengthy application processes</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="font-light tracking-wide">Foster direct candidate-employer relationships</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="font-light tracking-wide">Promote diversity and equal opportunity</span>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              <div className="w-16 h-px bg-gray-300"></div>
              <h2 className="text-3xl font-light text-gray-800 tracking-wide">
                Our Vision
              </h2>
              <p className="text-gray-600 font-light tracking-wide leading-relaxed text-lg">
                We envision a world where finding the right career opportunity or the perfect candidate 
                is seamless, efficient, and accessible to everyone, regardless of background or location.
              </p>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-block"
              >
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-3 px-8 py-4 border border-gray-800 text-gray-800 font-light tracking-wide hover:bg-gray-800 hover:text-white transition-all duration-500 group"
                >
                  <span>Join Our Mission</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-b border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="text-center group"
              >
                <div className="w-16 h-16 border border-gray-300 mx-auto mb-4 flex items-center justify-center group-hover:border-gray-800 transition-colors duration-500">
                  <TrendingUp className="w-6 h-6 text-gray-600 group-hover:text-gray-800 transition-colors duration-500" />
                </div>
                <div className="text-3xl font-light text-gray-800 mb-1">{stat.number}</div>
                <div className="text-gray-600 font-light tracking-wide text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="w-16 h-px bg-gray-300 mx-auto"></div>
              <h2 className="text-3xl font-light text-gray-800 tracking-wide">
                Our Values
              </h2>
              <p className="text-gray-600 font-light tracking-wide max-w-2xl mx-auto">
                The principles that guide everything we do at NextLead
              </p>
              <div className="w-16 h-px bg-gray-300 mx-auto"></div>
            </motion.div>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  variants={itemVariants}
                  className="bg-white border border-gray-200 p-8 text-center group hover:border-gray-800 transition-all duration-500"
                  whileHover={{ y: -5 }}
                >
                  <motion.div
                    className="w-16 h-16 border border-gray-300 mx-auto mb-6 flex items-center justify-center group-hover:border-gray-800 transition-colors duration-500"
                    variants={floatingVariants}
                    animate="floating"
                  >
                    <Icon className="w-6 h-6 text-gray-600 group-hover:text-gray-800 transition-colors duration-500" />
                  </motion.div>
                  <h3 className="text-xl font-light text-gray-800 tracking-wide mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 font-light tracking-wide leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 border-b border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="w-16 h-px bg-gray-300 mx-auto"></div>
              <h2 className="text-3xl font-light text-gray-800 tracking-wide">
                Our Journey
              </h2>
              <p className="text-gray-600 font-light tracking-wide max-w-2xl mx-auto">
                From startup to industry innovator
              </p>
              <div className="w-16 h-px bg-gray-300 mx-auto"></div>
            </motion.div>
          </motion.div>

          <motion.div
            className="space-y-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                variants={itemVariants}
                className="flex items-start gap-8 group"
              >
                <div className="flex-shrink-0 w-20 text-right">
                  <div className="w-16 h-px bg-gray-300 mt-3 group-hover:bg-gray-800 transition-colors duration-500"></div>
                  <div className="text-2xl font-light text-gray-800 tracking-wide mt-2">
                    {milestone.year}
                  </div>
                </div>
                
                <div className="flex-1 pb-12 border-l border-gray-300 pl-8 relative">
                  <div className="absolute -left-2 top-0 w-4 h-4 border border-gray-300 rounded-full bg-white group-hover:border-gray-800 transition-colors duration-500"></div>
                  <h3 className="text-xl font-light text-gray-800 tracking-wide mb-2">
                    {milestone.title}
                  </h3>
                  <p className="text-gray-600 font-light tracking-wide leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="space-y-4">
              <div className="w-16 h-px bg-gray-300 mx-auto"></div>
              <h2 className="text-3xl font-light text-gray-800 tracking-wide">
                Meet Our Team
              </h2>
              <p className="text-gray-600 font-light tracking-wide max-w-2xl mx-auto">
                The passionate individuals driving NextLead forward
              </p>
              <div className="w-16 h-px bg-gray-300 mx-auto"></div>
            </motion.div>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                variants={itemVariants}
                className="bg-white border border-gray-200 p-6 text-center group hover:border-gray-800 transition-all duration-500"
                whileHover={{ y: -5 }}
              >
                <div className="w-20 h-20 border border-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center group-hover:border-gray-800 transition-colors duration-500">
                  <Users className="w-8 h-8 text-gray-600 group-hover:text-gray-800 transition-colors duration-500" />
                </div>
                <h3 className="text-lg font-light text-gray-800 tracking-wide mb-1">
                  {member.name}
                </h3>
                <p className="text-gray-600 font-light tracking-wide text-sm mb-3">
                  {member.role}
                </p>
                <p className="text-gray-600 font-light tracking-wide text-sm leading-relaxed mb-4">
                  {member.bio}
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {member.expertise.map((skill, skillIndex) => (
                    <span
                      key={skill}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-light tracking-wide border border-gray-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            className="space-y-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="w-16 h-px bg-gray-300 mx-auto"></div>
              <h2 className="text-3xl font-light text-gray-800 tracking-wide">
                Ready to Transform Recruitment?
              </h2>
              <p className="text-gray-600 font-light tracking-wide text-lg max-w-2xl mx-auto">
                Join thousands of companies and candidates who have found better matches faster with NextLead.
              </p>
              <div className="w-16 h-px bg-gray-300 mx-auto"></div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/register?role=candidate"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gray-800 text-white font-light tracking-wide hover:bg-gray-900 transition-all duration-500 group"
                >
                  <User className="w-4 h-4" />
                  <span>Start as Candidate</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  to="/register?role=recruiter"
                  className="inline-flex items-center gap-3 px-8 py-4 border border-gray-800 text-gray-800 font-light tracking-wide hover:bg-gray-800 hover:text-white transition-all duration-500 group"
                >
                  <Building className="w-4 h-4" />
                  <span>Start as Recruiter</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="pt-8"
            >
              <p className="text-gray-400 font-light tracking-wide text-sm">
                Join our mission to make recruitment more human, efficient, and effective.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Fixed Corner Elements */}
      <div className="fixed top-12 left-12 w-px h-24 bg-gradient-to-b from-gray-300 to-transparent"></div>
      <div className="fixed top-12 right-12 w-px h-24 bg-gradient-to-b from-gray-300 to-transparent"></div>
      <div className="fixed bottom-12 left-12 w-px h-24 bg-gradient-to-t from-gray-300 to-transparent"></div>
      <div className="fixed bottom-12 right-12 w-px h-24 bg-gradient-to-t from-gray-300 to-transparent"></div>
    </div>
  );
}