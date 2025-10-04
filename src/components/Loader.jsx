import React from "react";
import { motion } from "framer-motion";

// Main Loader Component
export default function Loader({ size = "medium", variant = "spinner", text = "Loading..." }) {
  const sizeClasses = {
    small: "w-6 h-6",
    medium: "w-12 h-12",
    large: "w-16 h-16",
    xlarge: "w-24 h-24"
  };

  const textSizes = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg",
    xlarge: "text-xl"
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {variant === "spinner" && (
        <SpinnerLoader size={size} sizeClasses={sizeClasses} />
      )}
      {variant === "dots" && (
        <DotsLoader size={size} sizeClasses={sizeClasses} />
      )}
      {variant === "pulse" && (
        <PulseLoader size={size} sizeClasses={sizeClasses} />
      )}
      {variant === "skeleton" && (
        <SkeletonLoader />
      )}
      {text && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`text-gray-600 font-light tracking-wide ${textSizes[size]}`}
        >
          {text}
        </motion.p>
      )}
    </div>
  );
}

// Spinner Loader Variant
function SpinnerLoader({ size, sizeClasses }) {
  return (
    <motion.div
      className={`border-2 border-gray-300 border-t-gray-800 rounded-full ${sizeClasses[size]}`}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  );
}

// Dots Loader Variant
function DotsLoader({ size, sizeClasses }) {
  const dotVariants = {
    animate: {
      y: ["0%", "-50%", "0%"],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className={`flex items-center justify-center space-x-1 ${sizeClasses[size]}`}>
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className="w-1/3 h-1/3 bg-gray-800 rounded-full"
          variants={dotVariants}
          animate="animate"
          transition={{
            delay: index * 0.1,
            duration: 0.6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
}

// Pulse Loader Variant
function PulseLoader({ size, sizeClasses }) {
  return (
    <motion.div
      className={`bg-gray-800 rounded-full ${sizeClasses[size]}`}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [1, 0.7, 1]
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
}

// Skeleton Loader Variant
export function SkeletonLoader({ type = "card", lines = 3 }) {
  if (type === "card") {
    return <CardSkeleton />;
  }
  
  if (type === "text") {
    return <TextSkeleton lines={lines} />;
  }

  if (type === "profile") {
    return <ProfileSkeleton />;
  }

  return <CardSkeleton />;
}

// Card Skeleton
function CardSkeleton() {
  return (
    <div className="bg-white border border-gray-200 p-6 space-y-4">
      <div className="flex items-center space-x-4">
        <motion.div
          className="w-12 h-12 bg-gray-200 rounded-full"
          animate={{
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <div className="space-y-2 flex-1">
          <motion.div
            className="h-4 bg-gray-200 rounded"
            animate={{
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.1
            }}
          />
          <motion.div
            className="h-3 bg-gray-200 rounded w-2/3"
            animate={{
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.2
            }}
          />
        </div>
      </div>
      <motion.div
        className="h-24 bg-gray-200 rounded"
        animate={{
          opacity: [0.5, 1, 0.5]
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.3
        }}
      />
      <div className="flex space-x-2">
        <motion.div
          className="h-6 bg-gray-200 rounded w-16"
          animate={{
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.4
          }}
        />
        <motion.div
          className="h-6 bg-gray-200 rounded w-20"
          animate={{
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
      </div>
    </div>
  );
}

// Text Skeleton
function TextSkeleton({ lines = 3 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: lines }, (_, index) => (
        <motion.div
          key={index}
          className={`h-4 bg-gray-200 rounded ${index === lines - 1 ? 'w-3/4' : 'w-full'}`}
          animate={{
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.1
          }}
        />
      ))}
    </div>
  );
}

// Profile Skeleton
function ProfileSkeleton() {
  return (
    <div className="bg-white border border-gray-200 p-6 space-y-6">
      <div className="flex items-center space-x-4">
        <motion.div
          className="w-20 h-20 bg-gray-200 rounded-full"
          animate={{
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <div className="space-y-2 flex-1">
          <motion.div
            className="h-6 bg-gray-200 rounded w-1/2"
            animate={{
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.1
            }}
          />
          <motion.div
            className="h-4 bg-gray-200 rounded w-1/3"
            animate={{
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.2
            }}
          />
        </div>
      </div>
      <div className="space-y-3">
        {Array.from({ length: 4 }, (_, index) => (
          <motion.div
            key={index}
            className="h-4 bg-gray-200 rounded"
            animate={{
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.3 + index * 0.1
            }}
          />
        ))}
      </div>
    </div>
  );
}

// Page Loader Component
export function PageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="text-center space-y-6">
        <motion.div
          className="flex items-center justify-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-12 h-12 border border-gray-300 flex items-center justify-center mr-3">
            <span className="text-gray-800 font-light text-xl tracking-tight">N</span>
          </div>
          <span className="text-2xl font-light text-gray-800 tracking-wide">
            NextLead
          </span>
        </motion.div>
        
        <Loader size="large" variant="spinner" text="Loading your experience..." />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-gray-500 font-light tracking-wide text-sm"
        >
          Preparing something amazing for you
        </motion.div>
      </div>
    </div>
  );
}

// Button Loader Component
export function ButtonLoader({ size = "medium" }) {
  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-5 h-5",
    large: "w-6 h-6"
  };

  return (
    <motion.div
      className={`border-2 border-white border-t-transparent rounded-full ${sizeClasses[size]}`}
      animate={{ rotate: 360 }}
      transition={{
        duration: 0.8,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  );
}

// Content Loader Wrapper
export function ContentLoader({ isLoading, children, type = "card", skeletonCount = 1 }) {
  if (!isLoading) return children;

  return (
    <div className="space-y-4">
      {Array.from({ length: skeletonCount }, (_, index) => (
        <SkeletonLoader key={index} type={type} />
      ))}
    </div>
  );
}

// Inline Loader Component
export function InlineLoader() {
  return (
    <motion.div
      className="flex items-center gap-2 text-gray-600"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="w-3 h-3 bg-gray-600 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <span className="text-sm font-light tracking-wide">Loading...</span>
    </motion.div>
  );
}