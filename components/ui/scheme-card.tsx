import { motion } from 'framer-motion'

interface SchemeCardProps {
  title: string;
  description: string;
  tags?: string[];
  actionText: string;
  variant?: 'default' | 'alert' | 'warning';
  icon?: JSX.Element;
  date?: string;
  location?: string;
  onClick?: () => void;
}

export function SchemeCard({
  title,
  description,
  tags,
  actionText,
  variant = 'default',
  icon,
  date,
  location,
  onClick
}: SchemeCardProps) {
  const variants = {
    default: 'bg-gray-900/50 border-gray-800/50 hover:border-rose-500/20 text-rose-400 hover:text-rose-300',
    alert: 'bg-red-500/10 border-red-900/50 hover:border-red-500/20 text-red-400 hover:text-red-300',
    warning: 'bg-orange-500/10 border-orange-900/50 hover:border-orange-500/20 text-orange-400 hover:text-orange-300'
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`group p-6 backdrop-blur-sm rounded-xl border transition-all duration-300
                hover:shadow-lg hover:shadow-rose-500/5 ${variants[variant]}`}
    >
      <div className="flex justify-between items-start">
        {icon && (
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-gray-800/50">{icon}</div>
          </div>
        )}
        <div className="flex-1 ml-3">
          <h3 className="text-lg font-medium">{title}</h3>
          {date && <p className="text-xs mt-1 opacity-70">{date}</p>}
        </div>
      </div>

      <p className="mt-3 text-sm text-gray-400">{description}</p>

      {tags && tags.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span key={tag} 
                  className="px-2 py-1 text-xs bg-rose-500/10 text-rose-400 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      )}

      {location && (
        <div className="mt-3 flex items-center text-sm text-gray-400">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          </svg>
          <span>{location}</span>
        </div>
      )}

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClick}
        className="mt-4 w-full px-4 py-2.5 bg-rose-500/10 text-rose-400 rounded-lg 
                 hover:bg-rose-500/20 transition-colors flex items-center justify-center
                 font-medium"
      >
        {actionText}
        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </motion.button>
    </motion.div>
  )
}