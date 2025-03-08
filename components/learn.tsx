import { useState } from 'react'

interface Course {
  id: string;
  title: string;
  duration: string;
  points: number;
  progress: number;
  videoUrl: string;
}

interface LearnProps {
  onBack: () => void;
}

export default function Learn({ onBack }: LearnProps) {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [courses] = useState<Course[]>([
    {
      id: '1',
      title: "Modern Irrigation Techniques",
      duration: "15 mins",
      points: 50,
      progress: 0,
      videoUrl: "/videos/irrigation-sample.mp4"
    },
    {
      id: '2',
      title: "Organic Farming Basics",
      duration: "20 mins",
      points: 75,
      progress: 0,
      videoUrl: "/videos/organic-sample.mp4"
    },
    {
      id: '3',
      title: "Smart Pest Control",
      duration: "12 mins",
      points: 40,
      progress: 0,
      videoUrl: "/videos/pest-control-sample.mp4"
    }
  ])

  if (selectedCourse) {
    return (
      <div className="flex h-full flex-col bg-gray-950">
        <div className="flex items-center p-4 border-b border-gray-800">
          <button 
            onClick={() => setSelectedCourse(null)}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h2 className="ml-4 text-lg font-medium text-gray-200">{selectedCourse.title}</h2>
        </div>

        <div className="flex-1 flex flex-col">
          {/* Video Player */}
          <div className="relative w-full pt-[56.25%] bg-black">
            <video
              className="absolute inset-0 w-full h-full"
              controls
              autoPlay
              src={selectedCourse.videoUrl}
            />
          </div>

          {/* Course Details */}
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-400">{selectedCourse.duration}</span>
                <span className="text-sm text-indigo-400">{selectedCourse.points} points</span>
              </div>
              <div className="text-sm text-gray-400">
                Progress: {selectedCourse.progress}%
              </div>
            </div>

            <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-500 transition-all duration-300" 
                style={{ width: `${selectedCourse.progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-full flex-col bg-gray-950">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-gray-800">
        <button 
          onClick={onBack}
          className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
        >
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <h2 className="ml-4 text-lg font-medium text-gray-200">Learn & Earn</h2>
      </div>

      <div className="flex-1 p-6 overflow-auto">
        {/* Course Categories */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-gray-900 p-4 rounded-xl ring-1 ring-indigo-500/30">
            <h3 className="text-indigo-400 font-medium mb-2">Featured Courses</h3>
            <p className="text-sm text-gray-400">Start earning while learning</p>
          </div>
          <div className="bg-gray-900 p-4 rounded-xl ring-1 ring-indigo-500/30">
            <h3 className="text-indigo-400 font-medium mb-2">Your Progress</h3>
            <p className="text-sm text-gray-400">Total Points: 0</p>
          </div>
        </div>

        {/* Course List */}
        <div className="space-y-4">
          {courses.map((course) => (
            <div 
              key={course.id} 
              className="bg-gray-900 p-4 rounded-xl ring-1 ring-gray-800 hover:ring-indigo-500/50 transition-all cursor-pointer"
              onClick={() => setSelectedCourse(course)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="text-indigo-400 font-medium">{course.title}</h4>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-sm text-gray-400">{course.duration}</span>
                    <span className="text-sm text-indigo-400">{course.points} points</span>
                  </div>
                  <div className="mt-3 h-1 bg-gray-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-indigo-500" 
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
                <button className="ml-4 p-2 bg-indigo-500/10 text-indigo-400 rounded-lg hover:bg-indigo-500/20 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}