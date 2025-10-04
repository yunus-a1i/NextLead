import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  ArrowRight, 
  Calendar,
  Clock,
  User,
  Tag,
  ChevronDown,
  BookOpen,
  TrendingUp,
  Briefcase,
  GraduationCap,
  Star,
  Eye,
  Heart,
  Share2,
  Bookmark
} from "lucide-react";

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('latest');

  const categories = [
    { id: 'all', name: 'All Articles', icon: BookOpen },
    { id: 'career', name: 'Career Advice', icon: Briefcase },
    { id: 'interview', name: 'Interview Tips', icon: TrendingUp },
    { id: 'recruitment', name: 'Recruitment', icon: User },
    { id: 'skills', name: 'Skills Development', icon: GraduationCap },
    { id: 'industry', name: 'Industry Insights', icon: Star }
  ];

  const blogPosts = [
    {
      id: 1,
      title: 'Mastering the Art of Walk-In Interviews',
      excerpt: 'Learn how to make a lasting impression in walk-in interviews and stand out from the competition.',
      category: 'interview',
      author: 'Sarah Chen',
      date: '2024-12-15',
      readTime: '6 min read',
      image: '/api/placeholder/400/250',
      views: 1247,
      likes: 89,
      featured: true,
      tags: ['interview', 'career', 'tips']
    },
    {
      id: 2,
      title: 'The Future of Recruitment: Trends to Watch in 2024',
      excerpt: 'Discover how AI and new technologies are transforming the recruitment landscape.',
      category: 'recruitment',
      author: 'Michael Rodriguez',
      date: '2024-12-12',
      readTime: '8 min read',
      image: '/api/placeholder/400/250',
      views: 892,
      likes: 67,
      featured: true,
      tags: ['recruitment', 'technology', 'trends']
    },
    {
      id: 3,
      title: '5 Essential Skills Employers Look For in 2024',
      excerpt: 'Stay ahead of the curve with these in-demand skills that will boost your career prospects.',
      category: 'skills',
      author: 'Dr. Emily Watson',
      date: '2024-12-10',
      readTime: '5 min read',
      image: '/api/placeholder/400/250',
      views: 1563,
      likes: 124,
      featured: false,
      tags: ['skills', 'development', 'career']
    },
    {
      id: 4,
      title: 'Navigating Career Transitions Successfully',
      excerpt: 'Practical advice for making smooth career changes and adapting to new industries.',
      category: 'career',
      author: 'James Thompson',
      date: '2024-12-08',
      readTime: '7 min read',
      image: '/api/placeholder/400/250',
      views: 734,
      likes: 45,
      featured: false,
      tags: ['career', 'transition', 'advice']
    },
    {
      id: 5,
      title: 'Building a Personal Brand That Gets You Hired',
      excerpt: 'Learn how to craft a compelling personal brand that attracts the right opportunities.',
      category: 'career',
      author: 'Lisa Park',
      date: '2024-12-05',
      readTime: '6 min read',
      image: '/api/placeholder/400/250',
      views: 982,
      likes: 78,
      featured: false,
      tags: ['personal-brand', 'career', 'marketing']
    },
    {
      id: 6,
      title: 'The Psychology of Successful Interviews',
      excerpt: 'Understand the mental aspects of interviewing and how to leverage psychology for success.',
      category: 'interview',
      author: 'Dr. Robert Kim',
      date: '2024-12-03',
      readTime: '9 min read',
      image: '/api/placeholder/400/250',
      views: 1123,
      likes: 91,
      featured: false,
      tags: ['psychology', 'interview', 'success']
    }
  ];

  const popularTags = [
    'Interview Tips', 'Career Growth', 'Job Search', 'Resume', 'Networking',
    'Salary Negotiation', 'Remote Work', 'Leadership', 'Tech Skills', 'Soft Skills'
  ];

  const featuredPost = blogPosts.find(post => post.featured);

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortBy === 'latest') {
      return new Date(b.date) - new Date(a.date);
    } else if (sortBy === 'popular') {
      return b.views - a.views;
    }
    return 0;
  });

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
              NextLead Blog
            </h1>
            <p className="text-gray-600 font-light tracking-wide text-lg max-w-2xl mx-auto">
              Insights, advice, and trends for candidates and recruiters
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
                  placeholder="Search articles..."
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
            <div className="lg:col-span-1 space-y-8">
              {/* Categories */}
              <div className="bg-white border border-gray-200 p-6">
                <h3 className="text-lg font-light text-gray-800 tracking-wide mb-4">
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
                        <span className="text-sm">{category.name}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Popular Tags */}
              <div className="bg-white border border-gray-200 p-6">
                <h3 className="text-lg font-light text-gray-800 tracking-wide mb-4">
                  Popular Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSearchQuery(tag)}
                      className="px-3 py-1 border border-gray-300 text-gray-600 font-light tracking-wide text-sm hover:border-gray-800 hover:text-gray-800 transition-all duration-300"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Newsletter */}
              <div className="bg-white border border-gray-200 p-6">
                <h3 className="text-lg font-light text-gray-800 tracking-wide mb-4">
                  Stay Updated
                </h3>
                <p className="text-gray-600 font-light tracking-wide text-sm mb-4">
                  Get the latest career insights and tips delivered to your inbox.
                </p>
                <div className="space-y-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border border-gray-300 text-gray-800 font-light tracking-wide focus:border-gray-500 focus:outline-none transition-colors duration-500"
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 border border-gray-800 text-gray-800 font-light tracking-wide text-sm hover:bg-gray-800 hover:text-white transition-all duration-500"
                  >
                    <span>Subscribe</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Blog Content */}
            <div className="lg:col-span-3">
              {/* Featured Post */}
              {featuredPost && activeCategory === 'all' && (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white border border-gray-200 mb-8 group cursor-pointer"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="h-64 lg:h-80 bg-gray-200 group-hover:opacity-95 transition-opacity duration-500">
                      {/* Image placeholder */}
                      <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                        <BookOpen className="w-12 h-12 text-white opacity-50" />
                      </div>
                    </div>
                    <div className="p-8 flex flex-col justify-center">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-2 py-1 bg-gray-800 text-white text-xs font-light tracking-wide">
                          Featured
                        </span>
                        <span className="text-gray-500 text-xs font-light tracking-wide uppercase">
                          {categories.find(cat => cat.id === featuredPost.category)?.name}
                        </span>
                      </div>
                      <h2 className="text-2xl font-light text-gray-800 tracking-wide mb-4 group-hover:text-gray-600 transition-colors duration-300">
                        {featuredPost.title}
                      </h2>
                      <p className="text-gray-600 font-light tracking-wide leading-relaxed mb-6">
                        {featuredPost.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            <span className="font-light">{featuredPost.author}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span className="font-light">{new Date(featuredPost.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span className="font-light">{featuredPost.readTime}</span>
                          </div>
                        </div>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors duration-300"
                        >
                          <span className="text-sm font-light tracking-wide">Read More</span>
                          <ArrowRight className="w-4 h-4" />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Sort and Filter */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div className="text-gray-600 font-light tracking-wide">
                  Showing {sortedPosts.length} articles
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-gray-600 font-light tracking-wide text-sm">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border border-gray-300 text-gray-800 font-light tracking-wide focus:border-gray-500 focus:outline-none transition-colors duration-500 appearance-none bg-white"
                  >
                    <option value="latest">Latest</option>
                    <option value="popular">Most Popular</option>
                  </select>
                </div>
              </div>

              {/* Blog Posts Grid */}
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                key={`${activeCategory}-${sortBy}`}
              >
                <AnimatePresence mode="wait">
                  {sortedPosts.map((post, index) => (
                    <motion.article
                      key={post.id}
                      variants={itemVariants}
                      layout
                      className="bg-white border border-gray-200 group cursor-pointer hover:border-gray-300 transition-all duration-500"
                    >
                      {/* Image */}
                      <div className="h-48 bg-gray-200 group-hover:opacity-90 transition-opacity duration-500">
                        <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                          <BookOpen className="w-8 h-8 text-white opacity-50" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-gray-500 text-xs font-light tracking-wide uppercase">
                            {categories.find(cat => cat.id === post.category)?.name}
                          </span>
                          {post.featured && (
                            <span className="px-2 py-1 bg-gray-800 text-white text-xs font-light tracking-wide">
                              Featured
                            </span>
                          )}
                        </div>

                        <h3 className="text-xl font-light text-gray-800 tracking-wide mb-3 group-hover:text-gray-600 transition-colors duration-300 line-clamp-2">
                          {post.title}
                        </h3>

                        <p className="text-gray-600 font-light tracking-wide leading-relaxed mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>

                        {/* Meta Information */}
                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            <span className="font-light">{post.author}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span className="font-light">{new Date(post.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span className="font-light">{post.readTime}</span>
                          </div>
                        </div>

                        {/* Tags and Stats */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                          <div className="flex items-center gap-2">
                            {post.tags.slice(0, 2).map(tag => (
                              <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-light tracking-wide">
                                {tag}
                              </span>
                            ))}
                          </div>
                          <div className="flex items-center gap-3 text-gray-400">
                            <div className="flex items-center gap-1">
                              <Eye className="w-4 h-4" />
                              <span className="text-xs font-light">{post.views}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Heart className="w-4 h-4" />
                              <span className="text-xs font-light">{post.likes}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </AnimatePresence>
              </motion.div>

              {/* Load More */}
              {sortedPosts.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-center mt-12"
                >
                  <button className="inline-flex items-center gap-2 px-8 py-3 border border-gray-300 text-gray-700 font-light tracking-wide hover:border-gray-500 transition-all duration-500 group">
                    <span>Load More Articles</span>
                    <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" />
                  </button>
                </motion.div>
              )}

              {/* No Results */}
              {sortedPosts.length === 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-16"
                >
                  <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-light text-gray-800 tracking-wide mb-2">
                    No articles found
                  </h3>
                  <p className="text-gray-600 font-light tracking-wide">
                    Try adjusting your search or filter criteria
                  </p>
                </motion.div>
              )}
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