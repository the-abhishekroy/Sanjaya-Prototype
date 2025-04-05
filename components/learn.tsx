import { useState } from 'react'
import { motion } from 'framer-motion'
import { GradientBackground } from './ui/gradient-background'

interface Course {
  id: string;
  title: string;
  duration: string;
  points: number;
  progress: number;
  videoUrl: string;
  thumbnail?: string;
  category: 'beginner' | 'intermediate' | 'advanced';
  description: string;
}

const courses: Course[] = [
  {
    id: '1',
    title: "Modern Irrigation Techniques",
    duration: "15 mins",
    points: 50,
    progress: 0,
    videoUrl: "/videos/irrigation-sample.mp4",
    category: 'beginner',
    description: "Learn the latest methods in efficient water management for your crops"
  },
  {
    id: '2',
    title: "Organic Farming Basics",
    duration: "20 mins",
    points: 75,
    progress: 0,
    videoUrl: "/videos/organic-sample.mp4",
    category: 'intermediate',
    description: "Master the fundamentals of chemical-free farming practices"
  },
  {
    id: '3',
    title: "Smart Pest Control",
    duration: "12 mins",
    points: 40,
    progress: 0,
    videoUrl: "/videos/pest-control-sample.mp4",
    category: 'advanced',
    description: "Advanced techniques for sustainable pest management"
  },
  {
    id: '4',
    title: "Soil Health Management",
    duration: "18 mins",
    points: 60,
    progress: 0,
    videoUrl: "/videos/soil-health.mp4",
    category: 'beginner',
    description: "Understanding and maintaining optimal soil conditions"
  },
  {
    id: '5',
    title: "Crop Rotation Strategies",
    duration: "25 mins",
    points: 80,
    progress: 0,
    videoUrl: "/videos/crop-rotation.mp4",
    category: 'intermediate',
    description: "Maximize soil fertility and yield through strategic crop rotation"
  },
  {
    id: '6',
    title: "Digital Farm Management",
    duration: "30 mins",
    points: 100,
    progress: 0,
    videoUrl: "/videos/digital-farming.mp4",
    category: 'advanced',
    description: "Modern techniques for managing farm operations using technology"
  },
  {
    id: '7',
    title: "Sustainable Agriculture",
    duration: "22 mins",
    points: 70,
    progress: 0,
    videoUrl: "/videos/sustainable.mp4",
    category: 'intermediate',
    description: "Eco-friendly farming practices for long-term sustainability"
  },
  {
    id: '8',
    title: "Weather-Smart Farming",
    duration: "15 mins",
    points: 45,
    progress: 0,
    videoUrl: "/videos/weather-smart.mp4",
    category: 'beginner',
    description: "Adapt your farming practices to weather patterns"
  }
]

interface LearnProps {
  onBack: () => void;
}

export default function Learn({ onBack }: LearnProps) {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [activeCategory, setActiveCategory] = useState<'all' | Course['category']>('all')

  const filteredCourses = activeCategory === 'all' 
    ? courses 
    : courses.filter(course => course.category === activeCategory)

  if (selectedCourse) {
    return (
      <div className="fixed inset-0 flex flex-col bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
        <GradientBackground />
        
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10"
        >
          <div className="backdrop-blur-sm bg-gray-900/50 border-b border-gray-800/50">
            <div className="w-full px-6">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center space-x-4">
                  <button 
                    onClick={() => setSelectedCourse(null)}
                    className="p-2 hover:bg-gray-800/50 rounded-lg transition-all"
                  >
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                  </button>
                  <div>
                    <h1 className="text-xl font-semibold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                      {selectedCourse.title}
                    </h1>
                    <p className="text-sm text-gray-400">{selectedCourse.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Video Section */}
        <div className="relative flex-1 flex flex-col">
          <div className="relative w-full h-[40vh] bg-black">
            <video
              className="absolute inset-0 w-full h-full object-cover"
              controls
              autoPlay
              src={selectedCourse.videoUrl}
            />
          </div>

          {/* Course Info */}
          <div className="flex-1 p-6 overflow-auto scrollbar-hide">
            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 ring-1 ring-gray-800">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="space-y-2">
                  <span className="text-sm text-gray-400">Category</span>
                  <div className="flex items-center space-x-2">
                    <span className="px-3 py-1 bg-amber-500/10 text-amber-400 rounded-full">
                      {selectedCourse.category}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <span className="text-sm text-gray-400">Duration</span>
                  <div className="text-amber-400 font-medium">
                    {selectedCourse.duration}
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-sm text-gray-400">Points</span>
                  <div className="flex items-center space-x-2 text-amber-400">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="font-medium">{selectedCourse.points}</span>
                  </div>
                </div>
              </div>

              {/* Progress Section */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-400">Course Progress</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-amber-500/10 text-amber-400 rounded-lg 
                             hover:bg-amber-500/20 transition-all duration-300"
                  >
                    Mark Complete
                  </motion.button>
                </div>
                
                <div className="h-2 w-full bg-gray-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${selectedCourse.progress}%` }}
                    transition={{ duration: 0.5 }}
                    className="h-full bg-gradient-to-r from-amber-500 to-amber-600"
                  />
                </div>
                <div className="text-right text-sm text-amber-400 font-medium">
                  {selectedCourse.progress}% Complete
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex flex-col bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
      <GradientBackground />

      {/* Premium Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10"
      >
        <div className="backdrop-blur-sm bg-gray-900/50 border-b border-gray-800/50">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={onBack}
                  className="p-2 hover:bg-gray-800/50 rounded-lg transition-all"
                >
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                </button>
                <div>
                  <h1 className="text-xl font-semibold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                    Learn & Earn
                  </h1>
                  <p className="text-sm text-gray-400">Enhance your farming knowledge</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative flex-1 overflow-auto scrollbar-hide"
      >
        <div className="max-w-6xl mx-auto p-6">
          {/* Category Filters */}
          <div className="flex space-x-2 mb-8 overflow-x-auto scrollbar-hide">
            {['all', 'beginner', 'intermediate', 'advanced'].map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category as typeof activeCategory)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all
                          ${activeCategory === category
                            ? 'bg-amber-500/20 text-amber-400 ring-1 ring-amber-500/50'
                            : 'text-gray-400 hover:bg-gray-800/50'}`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {/* Course Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedCourse(course)}
                className="group cursor-pointer"
              >
                <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 
                              ring-1 ring-gray-800 hover:ring-amber-500/30
                              transition-all duration-300">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-medium bg-gradient-to-r from-amber-400 to-amber-500 
                                     bg-clip-text text-transparent group-hover:to-amber-400">
                          {course.title}
                        </h3>
                        <span className="px-2 py-0.5 bg-amber-500/10 text-amber-400 rounded-full text-xs">
                          {course.category}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 mb-4">{course.description}</p>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-400">{course.duration}</span>
                        <span className="flex items-center space-x-1">
                          <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="text-sm text-amber-400">{course.points} points</span>
                        </span>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="ml-4 p-3 bg-amber-500/10 text-amber-400 rounded-xl
                               hover:bg-amber-500/20 transition-colors"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                              d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      </svg>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}