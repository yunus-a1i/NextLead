import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Calendar,
  Clock,
  User,
  Tag,
  ArrowLeft,
  Share2,
  Bookmark,
  Heart,
  Eye,
  MessageCircle,
  Facebook,
  Twitter,
  Linkedin,
  Link2,
  BookOpen,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

export default function BlogDetailPage() {
  const { id } = useParams();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);

  // Mock blog data - in real app, this would come from API
  const blogPost = {
    id: 1,
    title: 'Mastering the Art of Walk-In Interviews',
    excerpt: 'Learn how to make a lasting impression in walk-in interviews and stand out from the competition.',
    content: `
      <p>Walk-in interviews present a unique opportunity for candidates to make a direct connection with potential employers. Unlike traditional interviews, they allow for immediate feedback and a more personal interaction. However, this format also requires specific preparation and mindset to ensure success.</p>

      <h2>Understanding the Walk-In Interview Format</h2>
      <p>Walk-in interviews are typically shorter and more focused than scheduled interviews. Companies use them to efficiently screen multiple candidates while still getting a sense of personality and cultural fit. The key is to make a strong impression quickly.</p>

      <h2>Preparation Strategies</h2>
      <h3>Research the Company</h3>
      <p>Even though walk-in interviews are spontaneous, you should never walk in unprepared. Research the company's mission, values, recent achievements, and the specific role you're interested in. This knowledge will help you tailor your responses and ask insightful questions.</p>

      <h3>Perfect Your Elevator Pitch</h3>
      <p>With limited time, your introduction needs to be concise and impactful. Prepare a 30-second elevator pitch that highlights your key skills, experiences, and what makes you unique as a candidate.</p>

      <h2>During the Interview</h2>
      <h3>First Impressions Matter</h3>
      <p>Dress professionally, maintain eye contact, and offer a firm handshake. Your non-verbal communication speaks volumes before you even say a word.</p>

      <h3>Showcase Your Adaptability</h3>
      <p>Walk-in interviews often test how well you think on your feet. Be prepared for unexpected questions and demonstrate your ability to adapt to different situations.</p>

      <blockquote>
        "The most successful candidates in walk-in interviews are those who can quickly establish rapport and demonstrate genuine interest in the role."
      </blockquote>

      <h2>Common Mistakes to Avoid</h2>
      <ul>
        <li><strong>Being too casual:</strong> While the format is less formal, maintain professional demeanor</li>
        <li><strong>Lack of specific examples:</strong> Prepare concrete stories that demonstrate your skills</li>
        <li><strong>Poor time management:</strong> Be concise and respect the interviewer's time</li>
        <li><strong>Neglecting to ask questions:</strong> Have 2-3 thoughtful questions prepared</li>
      </ul>

      <h2>Follow-Up Strategy</h2>
      <p>Even in walk-in settings, follow-up matters. Send a thank-you email within 24 hours, reiterating your interest and key qualifications.</p>

      <p>Mastering walk-in interviews takes practice, but with the right preparation and mindset, you can turn these opportunities into job offers. Remember that each interview is a learning experience that brings you closer to your ideal role.</p>
    `,
    category: 'interview',
    author: {
      name: 'Sarah Chen',
      role: 'Senior Career Coach',
      bio: 'With over 10 years of experience in career coaching and recruitment, Sarah has helped thousands of candidates land their dream jobs through effective interview strategies.',
      avatar: '/api/placeholder/100/100'
    },
    date: '2024-12-15',
    readTime: '6 min read',
    image: '/api/placeholder/800/400',
    views: 1247,
    likes: 89,
    shares: 34,
    comments: 23,
    featured: true,
    tags: ['interview', 'career', 'tips', 'preparation', 'success']
  };

  const relatedPosts = [
    {
      id: 2,
      title: '5 Common Interview Questions and How to Answer Them',
      excerpt: 'Prepare for your next interview with these proven response strategies.',
      category: 'interview',
      date: '2024-12-10',
      readTime: '5 min read'
    },
    {
      id: 3,
      title: 'Building Confidence for High-Stakes Interviews',
      excerpt: 'Techniques to overcome nervousness and present your best self.',
      category: 'career',
      date: '2024-12-08',
      readTime: '4 min read'
    },
    {
      id: 4,
      title: 'The Psychology of First Impressions',
      excerpt: 'Understanding how interviewers form opinions in the first few minutes.',
      category: 'interview',
      date: '2024-12-05',
      readTime: '7 min read'
    }
  ];

  const shareOptions = [
    { icon: Facebook, label: 'Facebook', color: 'text-blue-600' },
    { icon: Twitter, label: 'Twitter', color: 'text-blue-400' },
    { icon: Linkedin, label: 'LinkedIn', color: 'text-blue-700' },
    { icon: Link2, label: 'Copy Link', color: 'text-gray-600' }
  ];

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

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = blogPost.title;

    switch (platform) {
      case 'Facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'Twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'LinkedIn':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'Copy Link':
        navigator.clipboard.writeText(url);
        // Show toast notification
        break;
      default:
        break;
    }
    setShowShareOptions(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Navigation */}
      <nav className="border-b border-gray-200 bg-white/70 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              to="/blog"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 font-light tracking-wide transition-colors duration-500 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
              <span>Back to Blog</span>
            </Link>
            
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={`p-2 border ${
                  isBookmarked ? 'border-gray-800 bg-gray-800 text-white' : 'border-gray-300 text-gray-600 hover:border-gray-800'
                } transition-all duration-500`}
              >
                <Bookmark className="w-4 h-4" />
              </motion.button>

              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowShareOptions(!showShareOptions)}
                  className="p-2 border border-gray-300 text-gray-600 hover:border-gray-800 transition-all duration-500"
                >
                  <Share2 className="w-4 h-4" />
                </motion.button>

                {showShareOptions && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 top-full mt-2 bg-white border border-gray-200 p-4 space-y-3 min-w-48"
                  >
                    {shareOptions.map((option) => {
                      const Icon = option.icon;
                      return (
                        <button
                          key={option.label}
                          onClick={() => handleShare(option.label)}
                          className="flex items-center gap-3 w-full text-left p-2 hover:bg-gray-50 transition-colors duration-300 group"
                        >
                          <Icon className={`w-4 h-4 ${option.color}`} />
                          <span className="text-gray-700 font-light tracking-wide text-sm group-hover:text-gray-900">
                            {option.label}
                          </span>
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.article
          className="space-y-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Article Header */}
          <motion.header variants={itemVariants} className="space-y-8">
            {/* Category and Meta */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-sm text-gray-500 font-light tracking-wide">
                <span className="px-3 py-1 border border-gray-300 uppercase tracking-wider">
                  {blogPost.category}
                </span>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(blogPost.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{blogPost.readTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>{blogPost.views.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-light text-gray-800 tracking-tight leading-tight">
                {blogPost.title}
              </h1>

              {/* Excerpt */}
              <p className="text-xl text-gray-600 font-light tracking-wide leading-relaxed">
                {blogPost.excerpt}
              </p>
            </div>

            {/* Author Info */}
            <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
              <div className="w-16 h-16 border border-gray-300 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <h3 className="text-lg font-light text-gray-800 tracking-wide">
                  {blogPost.author.name}
                </h3>
                <p className="text-gray-600 font-light tracking-wide text-sm">
                  {blogPost.author.role}
                </p>
                <p className="text-gray-500 font-light tracking-wide text-sm mt-1">
                  {blogPost.author.bio}
                </p>
              </div>
            </div>
          </motion.header>

          {/* Featured Image */}
          <motion.div variants={itemVariants} className="bg-gray-200 h-96">
            <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
              <BookOpen className="w-16 h-16 text-white opacity-50" />
            </div>
          </motion.div>

          {/* Article Content */}
          <motion.div
            variants={itemVariants}
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: blogPost.content }}
          />

          {/* Tags */}
          <motion.div variants={itemVariants} className="flex items-center gap-3 pt-8 border-t border-gray-200">
            <Tag className="w-5 h-5 text-gray-600" />
            <div className="flex flex-wrap gap-2">
              {blogPost.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 border border-gray-300 text-gray-600 font-light tracking-wide text-sm hover:border-gray-800 hover:text-gray-800 transition-all duration-300 cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Engagement Actions */}
          <motion.div variants={itemVariants} className="flex items-center justify-between py-8 border-t border-gray-200">
            <div className="flex items-center gap-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsLiked(!isLiked)}
                className={`flex items-center gap-2 ${
                  isLiked ? 'text-red-600' : 'text-gray-600 hover:text-red-600'
                } transition-colors duration-300`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                <span className="font-light tracking-wide">{blogPost.likes + (isLiked ? 1 : 0)}</span>
              </motion.button>

              <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors duration-300">
                <MessageCircle className="w-5 h-5" />
                <span className="font-light tracking-wide">{blogPost.comments}</span>
              </button>

              <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors duration-300">
                <Share2 className="w-5 h-5" />
                <span className="font-light tracking-wide">{blogPost.shares}</span>
              </button>
            </div>
          </motion.div>

          {/* Author Bio */}
          <motion.section variants={itemVariants} className="bg-white border border-gray-200 p-8">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 border border-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-8 h-8 text-gray-600" />
              </div>
              <div>
                <h3 className="text-xl font-light text-gray-800 tracking-wide mb-2">
                  About {blogPost.author.name}
                </h3>
                <p className="text-gray-600 font-light tracking-wide leading-relaxed">
                  {blogPost.author.bio}
                </p>
              </div>
            </div>
          </motion.section>

          {/* Related Posts */}
          <motion.section variants={itemVariants} className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-light text-gray-800 tracking-wide">
                Related Articles
              </h2>
              <div className="flex items-center gap-2">
                <button className="p-2 border border-gray-300 text-gray-600 hover:border-gray-800 transition-all duration-500">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="p-2 border border-gray-300 text-gray-600 hover:border-gray-800 transition-all duration-500">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  whileHover={{ y: -5 }}
                  className="bg-white border border-gray-200 p-6 group cursor-pointer hover:border-gray-800 transition-all duration-500"
                >
                  <Link to={`/blog/${post.id}`}>
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span className="font-light tracking-wide uppercase">{post.category}</span>
                        <span>•</span>
                        <span className="font-light">{post.readTime}</span>
                      </div>
                      <h3 className="text-lg font-light text-gray-800 tracking-wide line-clamp-2 group-hover:text-gray-600 transition-colors duration-300">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 font-light tracking-wide text-sm line-clamp-2">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span className="font-light">{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </motion.section>

          {/* Newsletter CTA */}
          <motion.section variants={itemVariants} className="bg-white border border-gray-200 p-8 text-center">
            <div className="max-w-md mx-auto space-y-4">
              <h3 className="text-xl font-light text-gray-800 tracking-wide">
                Stay Updated
              </h3>
              <p className="text-gray-600 font-light tracking-wide">
                Get the latest career insights and interview tips delivered to your inbox.
              </p>
              <div className="flex gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-800 font-light tracking-wide focus:border-gray-500 focus:outline-none transition-colors duration-500"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 border border-gray-800 text-gray-800 font-light tracking-wide hover:bg-gray-800 hover:text-white transition-all duration-500"
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </motion.section>
        </motion.article>
      </div>

      {/* Fixed Corner Elements */}
      <div className="fixed top-12 left-12 w-px h-24 bg-gradient-to-b from-gray-300 to-transparent"></div>
      <div className="fixed top-12 right-12 w-px h-24 bg-gradient-to-b from-gray-300 to-transparent"></div>
    </div>
  );
}