import { useState } from 'react'
import { GradientBackground } from './ui/gradient-background'
import { motion } from 'framer-motion'

interface MarketplaceProps {
  onBack: () => void;
}

type UserType = 'none' | 'buyer' | 'seller';
type ListingType = 'equipment' | 'produce';

interface SellerFormData {
  type: ListingType;
  title: string;
  description: string;
  price: string;
  contact: string;
}

export default function Marketplace({ onBack }: MarketplaceProps) {
  const [userType, setUserType] = useState<UserType>('none')
  const [isAddingListing, setIsAddingListing] = useState(false)
  const [formData, setFormData] = useState<SellerFormData>({
    type: 'equipment',
    title: '',
    description: '',
    price: '',
    contact: ''
  })

  // Selection Screen
  if (userType === 'none') {
    return (
      <div className="fixed inset-0 flex flex-col">
        <GradientBackground />
        
        {/* Premium Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10"
        >
          <div className="backdrop-blur-sm bg-gray-900/50 border-b border-gray-800/50">
            <div className="max-w-6xl mx-auto px-4 py-4">
              <div className="flex items-center space-x-4">
                <button onClick={onBack} 
                  className="p-2 hover:bg-gray-800/50 rounded-lg transition-all">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                </button>
                <div>
                  <h1 className="text-xl font-semibold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                    Choose Your Role
                  </h1>
                  <p className="text-sm text-gray-400">Select how you want to use the marketplace</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Role Selection Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative flex-1 p-6 flex items-center justify-center"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
            {[
              {
                type: 'buyer',
                title: 'Buyer',
                description: 'Browse listings and make purchases',
                icon: (
                  <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                )
              },
              {
                type: 'seller',
                title: 'Seller',
                description: 'List your items for sale',
                icon: (
                  <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                )
              }
            ].map((role) => (
              <motion.button
                key={role.type}
                onClick={() => setUserType(role.type as UserType)}
                className="group h-48 relative overflow-hidden rounded-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 
                              group-hover:from-green-900/20 group-hover:to-gray-800 transition-all duration-300" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 bg-grid-pattern opacity-5" />
                </div>
                <div className="relative h-full p-6 flex flex-col items-center justify-center space-y-4">
                  <div className="w-16 h-16 rounded-xl bg-green-500/10 flex items-center justify-center 
                                group-hover:bg-green-500/20 transition-colors duration-300 
                                ring-1 ring-green-500/20 group-hover:ring-green-500/40">
                    {role.icon}
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-medium bg-gradient-to-r from-green-400 to-green-500 
                                 bg-clip-text text-transparent group-hover:to-green-400">
                      {role.title}
                    </h3>
                    <p className="text-sm text-gray-400 mt-2">{role.description}</p>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  // Seller Form
  if (userType === 'seller' && isAddingListing) {
    return (
      <div className="fixed inset-0 flex flex-col">
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
                    onClick={() => setIsAddingListing(false)}
                    className="p-2 rounded-lg hover:bg-gray-800/50 transition-all"
                  >
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <div>
                    <h1 className="text-xl font-semibold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                      Create New Listing
                    </h1>
                    <p className="text-sm text-gray-400">Add your product to the marketplace</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Form Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative flex-1 overflow-auto scrollbar-hide"
        >
          <div className="max-w-2xl mx-auto p-6">
            <form className="space-y-6">
              <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 ring-1 ring-gray-800">
                <div className="space-y-6">
                  {/* Listing Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Listing Type</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value as ListingType })}
                      className="w-full bg-gray-800/50 text-gray-200 rounded-lg px-4 py-2.5 
                               ring-1 ring-gray-700 focus:ring-green-500/50 
                               transition-all duration-200"
                    >
                      <option value="equipment">Equipment</option>
                      <option value="produce">Produce</option>
                    </select>
                  </div>

                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Title</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full bg-gray-800/50 text-gray-200 rounded-lg px-4 py-2.5 
                               ring-1 ring-gray-700 focus:ring-green-500/50 
                               transition-all duration-200"
                      placeholder="What are you selling?"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full bg-gray-800/50 text-gray-200 rounded-lg px-4 py-2.5 
                               ring-1 ring-gray-700 focus:ring-green-500/50 
                               transition-all duration-200 h-24 resize-none"
                      placeholder="Describe your item..."
                    />
                  </div>

                  {/* Price */}
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Price</label>
                    <div className="relative">
                      <span className="absolute left-4 top-2.5 text-gray-500">₹</span>
                      <input
                        type="text"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        className="w-full bg-gray-800/50 text-gray-200 rounded-lg pl-8 pr-4 py-2.5 
                                 ring-1 ring-gray-700 focus:ring-green-500/50 
                                 transition-all duration-200"
                        placeholder="Enter price"
                      />
                    </div>
                  </div>

                  {/* Contact */}
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Contact Information</label>
                    <input
                      type="text"
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      className="w-full bg-gray-800/50 text-gray-200 rounded-lg px-4 py-2.5 
                               ring-1 ring-gray-700 focus:ring-green-500/50 
                               transition-all duration-200"
                      placeholder="Phone number or email"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-green-600 
                         hover:from-green-600 hover:to-green-700 
                         text-white rounded-lg px-4 py-3 
                         shadow-lg shadow-green-500/20
                         transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Create Listing
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    );
  }

  // Seller Dashboard
  if (userType === 'seller') {
    return (
      <div className="fixed inset-0 flex flex-col">
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
                    onClick={() => setUserType('none')}
                    className="p-2 rounded-lg hover:bg-gray-800/50 transition-all"
                  >
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <div>
                    <h1 className="text-xl font-semibold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                      Seller Dashboard
                    </h1>
                    <p className="text-sm text-gray-400">Manage your marketplace listings</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Dashboard Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative flex-1 overflow-auto scrollbar-hide"
        >
          <div className="max-w-6xl mx-auto p-6">
            {/* Add Listing Button */}
            <motion.button
              onClick={() => setIsAddingListing(true)}
              className="w-full bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl 
                       ring-1 ring-gray-800 hover:ring-green-500/50 
                       transition-all duration-300 mb-8
                       group"
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex items-center justify-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center 
                              group-hover:bg-green-500/20 transition-colors duration-300">
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <span className="text-lg font-medium text-green-400">Add New Listing</span>
              </div>
            </motion.button>

            {/* Listings Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent">
                Your Listings
              </h3>
              <motion.div 
                className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl ring-1 ring-gray-800"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto rounded-xl bg-gray-800/50 flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                  </div>
                  <p className="text-gray-400 mb-4">No listings yet. Create your first listing!</p>
                  <button
                    onClick={() => setIsAddingListing(true)}
                    className="text-sm text-green-400 hover:text-green-300 transition-colors"
                  >
                    Get Started →
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Buyer View (Original Marketplace Content)
  return (
    <div className="fixed inset-0 flex flex-col">
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
                <button onClick={() => setUserType('none')} 
                        className="p-2 rounded-lg hover:bg-gray-800/50 transition-colors">
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div>
                  <h1 className="text-xl font-semibold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                    Marketplace
                  </h1>
                  <p className="text-sm text-gray-400">Buy and sell farm products</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Content Area */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative flex-1 overflow-auto"
      >
        <div className="max-w-6xl mx-auto px-4 py-6">
          {/* Your existing marketplace content with enhanced styling */}
          <div className="flex-1 p-6 overflow-auto scrollbar-hide"
            style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
            <style jsx>{`
              div::-webkit-scrollbar {
                display: none;
              }
            `}</style>
            {/* Categories */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-gray-900 p-4 rounded-xl ring-1 ring-gray-800">
                <h3 className="text-lg font-medium text-green-400 mb-2">Equipment</h3>
                <p className="text-sm text-gray-400">Browse farming tools and machinery</p>
              </div>
              <div className="bg-gray-900 p-4 rounded-xl ring-1 ring-gray-800">
                <h3 className="text-lg font-medium text-green-400 mb-2">Produce</h3>
                <p className="text-sm text-gray-400">Buy/Sell agricultural products</p>
              </div>
            </div>

            {/* Featured listings */}
            <h3 className="text-lg font-medium text-gray-200 mb-4">Featured Listings</h3>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-gray-900 p-4 rounded-xl ring-1 ring-gray-800">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-green-400 font-medium">Tractor for Rent</h4>
                      <p className="text-sm text-gray-400 mt-1">Available for daily/weekly rental</p>
                    </div>
                    <span className="text-green-400">₹2000/day</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}