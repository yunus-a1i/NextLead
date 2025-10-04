import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Send,
  User,
  MessageCircle,
  Building,
  ArrowRight,
  CheckCircle
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after success
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        company: "",
        subject: "",
        message: ""
      });
    }, 5000);
  };

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

  const contactMethods = [
    {
      icon: Mail,
      title: "Email Us",
      description: "We'll respond within 24 hours",
      details: "hello@nextlead.com",
      link: "mailto:hello@nextlead.com"
    },
    {
      icon: Phone,
      title: "Call Us",
      description: "Mon-Fri from 9am to 6pm",
      details: "+1 (555) 123-4567",
      link: "tel:+15551234567"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "Come say hello at our office",
      details: "123 Tech Street, San Francisco, CA 94105",
      link: "https://maps.google.com"
    }
  ];

  const officeHours = [
    { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
    { day: "Saturday", hours: "10:00 AM - 2:00 PM" },
    { day: "Sunday", hours: "Closed" }
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
                Get In
                <motion.span
                  className="block bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent font-light mt-4"
                  whileInView={{ opacity: [0.8, 1] }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                >
                  Touch
                </motion.span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed max-w-3xl mx-auto tracking-wide">
                Have questions about NextLead? We're here to help. 
                Reach out to our team and let's start a conversation.
              </p>
              <div className="w-16 h-px bg-gray-300 mx-auto"></div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Contact Information */}
            <motion.div 
              className="lg:col-span-1 space-y-8"
              variants={itemVariants}
            >
              <div>
                <div className="w-16 h-px bg-gray-300 mb-6"></div>
                <h2 className="text-2xl font-light text-gray-800 tracking-wide mb-4">
                  Contact Information
                </h2>
                <p className="text-gray-600 font-light tracking-wide leading-relaxed">
                  Choose the most convenient way to reach us. Our team is ready to assist you with any questions.
                </p>
              </div>

              {/* Contact Methods */}
              <div className="space-y-6">
                {contactMethods.map((method, index) => (
                  <motion.a
                    key={method.title}
                    href={method.link}
                    className="flex items-start gap-4 p-4 border border-gray-200 hover:border-gray-800 transition-all duration-500 group"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-12 h-12 border border-gray-300 flex items-center justify-center group-hover:border-gray-800 transition-colors duration-500 flex-shrink-0">
                      <method.icon className="w-5 h-5 text-gray-600 group-hover:text-gray-800 transition-colors duration-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-light text-gray-800 tracking-wide mb-1">
                        {method.title}
                      </h3>
                      <p className="text-gray-600 font-light tracking-wide text-sm mb-2">
                        {method.description}
                      </p>
                      <p className="text-gray-800 font-light tracking-wide">
                        {method.details}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Office Hours */}
              <div className="border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-5 h-5 text-gray-600" />
                  <h3 className="text-lg font-light text-gray-800 tracking-wide">
                    Office Hours
                  </h3>
                </div>
                <div className="space-y-3">
                  {officeHours.map((schedule, index) => (
                    <div key={schedule.day} className="flex justify-between items-center">
                      <span className="text-gray-600 font-light tracking-wide text-sm">
                        {schedule.day}
                      </span>
                      <span className="text-gray-800 font-light tracking-wide text-sm">
                        {schedule.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              className="lg:col-span-2"
              variants={itemVariants}
            >
              <div className="bg-white border border-gray-200 p-8">
                <div className="mb-8">
                  <div className="w-16 h-px bg-gray-300 mb-4"></div>
                  <h2 className="text-2xl font-light text-gray-800 tracking-wide mb-2">
                    Send us a Message
                  </h2>
                  <p className="text-gray-600 font-light tracking-wide">
                    Fill out the form below and we'll get back to you as soon as possible.
                  </p>
                </div>

                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="text-center py-12"
                    >
                      <CheckCircle className="w-16 h-16 text-gray-800 mx-auto mb-6" />
                      <h3 className="text-2xl font-light text-gray-800 tracking-wide mb-4">
                        Message Sent Successfully
                      </h3>
                      <p className="text-gray-600 font-light tracking-wide max-w-md mx-auto">
                        Thank you for reaching out. We've received your message and will get back to you within 24 hours.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-light text-gray-600 tracking-wide uppercase">
                            Full Name *
                          </label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              required
                              className="w-full pl-10 pr-4 py-3 border border-gray-300 text-gray-800 font-light tracking-wide focus:border-gray-500 focus:outline-none transition-colors duration-500"
                              placeholder="Enter your full name"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-light text-gray-600 tracking-wide uppercase">
                            Email Address *
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              required
                              className="w-full pl-10 pr-4 py-3 border border-gray-300 text-gray-800 font-light tracking-wide focus:border-gray-500 focus:outline-none transition-colors duration-500"
                              placeholder="Enter your email"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-light text-gray-600 tracking-wide uppercase">
                            Company
                          </label>
                          <div className="relative">
                            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="text"
                              name="company"
                              value={formData.company}
                              onChange={handleChange}
                              className="w-full pl-10 pr-4 py-3 border border-gray-300 text-gray-800 font-light tracking-wide focus:border-gray-500 focus:outline-none transition-colors duration-500"
                              placeholder="Your company name"
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-light text-gray-600 tracking-wide uppercase">
                            Subject *
                          </label>
                          <div className="relative">
                            <MessageCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="text"
                              name="subject"
                              value={formData.subject}
                              onChange={handleChange}
                              required
                              className="w-full pl-10 pr-4 py-3 border border-gray-300 text-gray-800 font-light tracking-wide focus:border-gray-500 focus:outline-none transition-colors duration-500"
                              placeholder="What is this regarding?"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-light text-gray-600 tracking-wide uppercase">
                          Message *
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows="6"
                          className="w-full px-4 py-3 border border-gray-300 text-gray-800 font-light tracking-wide focus:border-gray-500 focus:outline-none transition-colors duration-500 resize-none"
                          placeholder="Tell us how we can help you..."
                        />
                      </div>

                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 border border-gray-800 text-gray-800 font-light tracking-wide text-sm hover:bg-gray-800 hover:text-white disabled:bg-gray-300 disabled:border-gray-300 disabled:text-gray-500 transition-all duration-500 group"
                        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border border-current border-t-transparent rounded-full animate-spin" />
                            <span>Sending Message...</span>
                          </>
                        ) : (
                          <>
                            <span>Send Message</span>
                            <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                          </>
                        )}
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 border-t border-gray-200 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-16 h-px bg-gray-300 mx-auto mb-6"></div>
            <h2 className="text-3xl font-light text-gray-800 tracking-wide mb-4">
              Common Questions
            </h2>
            <p className="text-gray-600 font-light tracking-wide mb-8 max-w-2xl mx-auto">
              Quick answers to questions we get asked frequently.
            </p>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block"
            >
              <a
                href="/help"
                className="inline-flex items-center gap-3 px-8 py-4 border border-gray-800 text-gray-800 font-light tracking-wide text-sm hover:bg-gray-800 hover:text-white transition-all duration-500 group"
              >
                <span>Visit Help Center</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Fixed Corner Elements */}
      <div className="fixed top-12 left-12 w-px h-24 bg-gradient-to-b from-gray-300 to-transparent"></div>
      <div className="fixed top-12 right-12 w-px h-24 bg-gradient-to-b from-gray-300 to-transparent"></div>
    </div>
  );
}