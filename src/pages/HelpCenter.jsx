import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  ArrowRight, 
  ChevronDown,
  HelpCircle,
  User,
  Briefcase,
  FileText,
  Settings,
  Mail,
  Phone,
  MessageCircle,
  BookOpen,
  Video,
  Download,
  Star,
  Clock,
  Shield,
  CreditCard,
  Users
} from "lucide-react";

export default function HelpCenter() {
  const [activeCategory, setActiveCategory] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqs, setOpenFaqs] = useState({});

  const toggleFaq = (id) => {
    setOpenFaqs(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const categories = [
    {
      id: 'general',
      name: 'General',
      icon: HelpCircle,
      description: 'Basic questions about NextLead'
    },
    {
      id: 'candidates',
      name: 'For Candidates',
      icon: User,
      description: 'Job seeking and applications'
    },
    {
      id: 'recruiters',
      name: 'For Recruiters',
      icon: Briefcase,
      description: 'Hiring and talent acquisition'
    },
    {
      id: 'account',
      name: 'Account & Settings',
      icon: Settings,
      description: 'Profile and account management'
    },
    {
      id: 'billing',
      name: 'Billing & Plans',
      icon: CreditCard,
      description: 'Pricing and subscription'
    },
    {
      id: 'safety',
      name: 'Safety & Trust',
      icon: Shield,
      description: 'Security and guidelines'
    }
  ];

  const faqs = {
    general: [
      {
        id: 'gen-1',
        question: 'What is NextLead?',
        answer: 'NextLead is a premium platform connecting top talent with leading companies through curated walk-in interviews. We streamline the hiring process by eliminating lengthy application procedures and facilitating direct connections between candidates and recruiters.'
      },
      {
        id: 'gen-2',
        question: 'How is NextLead different from other job platforms?',
        answer: 'Unlike traditional job boards, NextLead focuses exclusively on walk-in interviews, providing immediate opportunities for candidates and faster hiring for companies. Our curated approach ensures quality matches and eliminates the noise of mass applications.'
      },
      {
        id: 'gen-3',
        question: 'Is NextLead available in my city?',
        answer: 'NextLead is currently available in major metropolitan areas across the United States, with plans for international expansion. You can check availability in your location by browsing opportunities on our platform.'
      },
      {
        id: 'gen-4',
        question: 'How do I get started with NextLead?',
        answer: 'Simply create an account, complete your profile, and start browsing opportunities. The process takes less than 5 minutes and immediately connects you with relevant interview opportunities.'
      }
    ],
    candidates: [
      {
        id: 'cand-1',
        question: 'How do I apply for walk-in interviews?',
        answer: 'Browse available opportunities, review company details and requirements, then click "Apply Now" on interviews that match your profile. You\'ll receive confirmation and interview details directly through the platform.'
      },
      {
        id: 'cand-2',
        question: 'What should I bring to a walk-in interview?',
        answer: 'We recommend bringing multiple copies of your resume, a valid ID, and any relevant portfolio materials. Dress professionally and arrive 10-15 minutes early to complete any necessary paperwork.'
      },
      {
        id: 'cand-3',
        question: 'Can I reschedule or cancel an interview?',
        answer: 'Yes, you can reschedule or cancel interviews up to 24 hours before the scheduled time through your dashboard. Late cancellations may affect your profile rating.'
      },
      {
        id: 'cand-4',
        question: 'How are interview opportunities matched to my profile?',
        answer: 'Our AI matching algorithm analyzes your skills, experience, preferences, and career goals to surface the most relevant opportunities. You can further refine matches using our advanced filters.'
      }
    ],
    recruiters: [
      {
        id: 'rec-1',
        question: 'How do I post interview opportunities?',
        answer: 'After creating your recruiter account, navigate to the "Post Interview" section. Fill in the job details, requirements, interview slots, and any specific instructions. Your opportunity will go live immediately after review.'
      },
      {
        id: 'rec-2',
        question: 'What types of roles can I post?',
        answer: 'You can post opportunities for any professional role across industries. We support full-time, part-time, contract, and internship positions. All opportunities must comply with our quality standards.'
      },
      {
        id: 'rec-3',
        question: 'How are candidates screened?',
        answer: 'All candidates undergo initial screening including profile verification, skill assessment, and experience validation. You can set additional requirements and use our advanced filtering tools.'
      },
      {
        id: 'rec-4',
        question: 'What support do you provide for recruiters?',
        answer: 'We offer dedicated account management, candidate matching assistance, interview scheduling tools, and analytics dashboards to optimize your hiring process.'
      }
    ],
    account: [
      {
        id: 'acc-1',
        question: 'How do I update my profile information?',
        answer: 'Navigate to your profile page and click the "Edit Profile" button. You can update personal information, skills, experience, and preferences at any time.'
      },
      {
        id: 'acc-2',
        question: 'Can I change my account type?',
        answer: 'Yes, you can switch between candidate and recruiter accounts in your settings. Note that this will require completing the appropriate profile information.'
      },
      {
        id: 'acc-3',
        question: 'How do I delete my account?',
        answer: 'Account deletion can be initiated in the privacy settings section. This process is irreversible and will remove all your data from our platform.'
      },
      {
        id: 'acc-4',
        question: 'Is my personal information secure?',
        answer: 'We employ enterprise-grade security measures including encryption, secure data storage, and strict privacy controls to protect your information.'
      }
    ],
    billing: [
      {
        id: 'bill-1',
        question: 'What are the pricing plans for candidates?',
        answer: 'Basic candidate services are completely free. Premium features like advanced analytics and priority matching are available through our subscription plans.'
      },
      {
        id: 'bill-2',
        question: 'How does billing work for recruiters?',
        answer: 'Recruiter plans are subscription-based with tiered pricing. You can choose monthly or annual billing, with discounts for enterprise-level commitments.'
      },
      {
        id: 'bill-3',
        question: 'Can I cancel my subscription anytime?',
        answer: 'Yes, you can cancel your subscription at any time through your account settings. You\'ll continue to have access until the end of your billing period.'
      },
      {
        id: 'bill-4',
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards, PayPal, and bank transfers for enterprise accounts. All transactions are securely processed.'
      }
    ],
    safety: [
      {
        id: 'safe-1',
        question: 'How do you ensure candidate safety?',
        answer: 'We verify all companies and opportunities, provide secure communication channels, and offer safety guidelines for in-person interviews.'
      },
      {
        id: 'safe-2',
        question: 'What should I do if I encounter suspicious activity?',
        answer: 'Immediately report any suspicious activity through our reporting system or contact our support team. We investigate all reports promptly.'
      },
      {
        id: 'safe-3',
        question: 'Are interviews conducted in secure locations?',
        answer: 'We require all interviews to be conducted in professional, accessible locations. Company offices must meet our venue standards.'
      },
      {
        id: 'safe-4',
        question: 'How is my data protected?',
        answer: 'We comply with global data protection regulations and implement industry-leading security measures to safeguard your information.'
      }
    ]
  };

  const resources = [
    {
      icon: BookOpen,
      title: 'User Guides',
      description: 'Comprehensive documentation',
      link: '/guides'
    },
    {
      icon: Video,
      title: 'Video Tutorials',
      description: 'Step-by-step walkthroughs',
      link: '/tutorials'
    },
    {
      icon: Download,
      title: 'Resources',
      description: 'Templates and tools',
      link: '/resources'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Connect with other users',
      link: '/community'
    }
  ];

  const contactOptions = [
    {
      icon: Mail,
      title: 'Email Support',
      description: '24-48 hour response time',
      action: 'mailto:support@nextlead.com'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Mon-Fri, 9AM-6PM PST',
      action: 'tel:+15551234567'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Instant help available',
      action: '/chat'
    }
  ];

  const filteredFaqs = faqs[activeCategory].filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <section className="border-b border-gray-200 bg-white/70 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <motion.div
            className="text-center space-y-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-16 h-px bg-gray-300 mx-auto"></div>
            <h1 className="text-4xl font-light text-gray-800 tracking-tight">
              Help Center
            </h1>
            <p className="text-gray-600 font-light tracking-wide text-lg max-w-2xl mx-auto">
              Find answers to common questions and learn how to make the most of NextLead
            </p>
            <div className="w-16 h-px bg-gray-300 mx-auto"></div>

            {/* Search Bar */}
            <motion.div
              className="max-w-2xl mx-auto pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for answers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 text-gray-800 font-light tracking-wide focus:border-gray-500 focus:outline-none transition-colors duration-500"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-200 p-6 space-y-6 sticky top-8">
                <h3 className="text-lg font-light text-gray-800 tracking-wide">
                  Categories
                </h3>
                <nav className="space-y-2">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={`w-full flex items-center gap-3 px-3 py-3 text-left font-light tracking-wide transition-all duration-300 ${
                          activeCategory === category.id
                            ? 'bg-gray-800 text-white'
                            : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <div className="flex-1 text-left">
                          <div className="text-sm">{category.name}</div>
                          <div className="text-xs opacity-75 mt-1">{category.description}</div>
                        </div>
                      </button>
                    );
                  })}
                </nav>

                {/* Resources */}
                <div className="pt-6 border-t border-gray-100">
                  <h4 className="text-sm font-light text-gray-800 tracking-wide uppercase mb-4">
                    Resources
                  </h4>
                  <div className="space-y-3">
                    {resources.map((resource) => {
                      const Icon = resource.icon;
                      return (
                        <Link
                          key={resource.title}
                          to={resource.link}
                          className="flex items-center gap-3 p-2 text-gray-600 hover:text-gray-800 font-light tracking-wide text-sm transition-colors duration-300 group"
                        >
                          <Icon className="w-4 h-4" />
                          <div>
                            <div>{resource.title}</div>
                            <div className="text-xs text-gray-500">{resource.description}</div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Content */}
            <div className="lg:col-span-3">
              <div className="bg-white border border-gray-200 p-8">
                {/* Category Header */}
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8"
                >
                  <div className="w-16 h-px bg-gray-300 mb-4"></div>
                  <h2 className="text-2xl font-light text-gray-800 tracking-wide mb-2">
                    {categories.find(cat => cat.id === activeCategory)?.name}
                  </h2>
                  <p className="text-gray-600 font-light tracking-wide">
                    {categories.find(cat => cat.id === activeCategory)?.description}
                  </p>
                </motion.div>

                {/* FAQ List */}
                <div className="space-y-4">
                  <AnimatePresence mode="wait">
                    {filteredFaqs.map((faq, index) => (
                      <motion.div
                        key={faq.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border border-gray-200"
                      >
                        <button
                          onClick={() => toggleFaq(faq.id)}
                          className="w-full flex items-center justify-between p-6 text-left font-light tracking-wide hover:bg-gray-50 transition-all duration-300 group"
                        >
                          <span className="text-gray-800 text-lg pr-4">{faq.question}</span>
                          <ChevronDown 
                            className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
                              openFaqs[faq.id] ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                        
                        <AnimatePresence>
                          {openFaqs[faq.id] && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="px-6 pb-6">
                                <div className="w-8 h-px bg-gray-300 mb-4"></div>
                                <p className="text-gray-600 font-light tracking-wide leading-relaxed">
                                  {faq.answer}
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Still Need Help */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-12 pt-8 border-t border-gray-100"
                >
                  <div className="text-center space-y-6">
                    <div className="w-16 h-px bg-gray-300 mx-auto"></div>
                    <h3 className="text-xl font-light text-gray-800 tracking-wide">
                      Still need help?
                    </h3>
                    <p className="text-gray-600 font-light tracking-wide max-w-2xl mx-auto">
                      Our support team is here to assist you with any questions or issues.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                      {contactOptions.map((option, index) => {
                        const Icon = option.icon;
                        return (
                          <motion.a
                            key={option.title}
                            href={option.action}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex flex-col items-center p-6 border border-gray-200 text-gray-600 hover:text-gray-800 hover:border-gray-800 transition-all duration-500 group"
                          >
                            <Icon className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform duration-300" />
                            <h4 className="font-light tracking-wide mb-2">{option.title}</h4>
                            <p className="text-sm text-gray-500 text-center">{option.description}</p>
                          </motion.a>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fixed Corner Elements */}
      <div className="fixed top-12 left-12 w-px h-24 bg-gradient-to-b from-gray-300 to-transparent"></div>
      <div className="fixed top-12 right-12 w-px h-24 bg-gradient-to-b from-gray-300 to-transparent"></div>
    </div>
  );
}