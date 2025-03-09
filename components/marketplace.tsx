import { useState } from 'react'

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
      <div className="flex h-full flex-col bg-gray-950">
        <div className="flex items-center p-4 border-b border-gray-800">
          <button onClick={onBack} className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h2 className="ml-4 text-lg font-medium text-gray-200">Choose Your Role</h2>
        </div>

        <div className="flex-1 p-6 flex items-center justify-center">
          <div className="grid grid-cols-2 gap-6 w-full max-w-2xl">
            <button
              onClick={() => setUserType('buyer')}
              className="h-48 bg-gray-900 rounded-2xl p-6 ring-1 ring-gray-800 hover:ring-green-500/50 transition-all group"
            >
              <div className="h-full flex flex-col items-center justify-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20">
                  <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-medium text-green-400">Buyer</h3>
                  <p className="text-sm text-gray-400 mt-1">Browse listings and make purchases</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => setUserType('seller')}
              className="h-48 bg-gray-900 rounded-2xl p-6 ring-1 ring-gray-800 hover:ring-green-500/50 transition-all group"
            >
              <div className="h-full flex flex-col items-center justify-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center group-hover:bg-green-500/20">
                  <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-medium text-green-400">Seller</h3>
                  <p className="text-sm text-gray-400 mt-1">List your items for sale</p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Seller Form
  if (userType === 'seller' && isAddingListing) {
    return (
      <div className="flex h-full flex-col bg-gray-950">
        <div className="flex items-center p-4 border-b border-gray-800">
          <button onClick={() => setIsAddingListing(false)} className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h2 className="ml-4 text-lg font-medium text-gray-200">Create Listing</h2>
        </div>

        <div className="flex-1 p-6 overflow-auto scrollbar-hide" 
          style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Listing Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as ListingType })}
                className="w-full bg-gray-900 text-gray-200 rounded-lg px-4 py-2 ring-1 ring-gray-800 focus:ring-green-500"
              >
                <option value="equipment">Equipment</option>
                <option value="produce">Produce</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-gray-900 text-gray-200 rounded-lg px-4 py-2 ring-1 ring-gray-800 focus:ring-green-500"
                placeholder="What are you selling?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-gray-900 text-gray-200 rounded-lg px-4 py-2 ring-1 ring-gray-800 focus:ring-green-500 h-24"
                placeholder="Describe your item..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Price</label>
              <input
                type="text"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full bg-gray-900 text-gray-200 rounded-lg px-4 py-2 ring-1 ring-gray-800 focus:ring-green-500"
                placeholder="₹ Price"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Contact Information</label>
              <input
                type="text"
                value={formData.contact}
                onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                className="w-full bg-gray-900 text-gray-200 rounded-lg px-4 py-2 ring-1 ring-gray-800 focus:ring-green-500"
                placeholder="Phone number or email"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-600 transition-colors"
            >
              Create Listing
            </button>
          </form>
        </div>
      </div>
    )
  }

  // Seller Dashboard
  if (userType === 'seller') {
    return (
      <div className="flex h-full flex-col bg-gray-950">
        <div className="flex items-center p-4 border-b border-gray-800">
          <button onClick={() => setUserType('none')} className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h2 className="ml-4 text-lg font-medium text-gray-200">Seller Dashboard</h2>
        </div>

        <div className="flex-1 p-6 overflow-auto scrollbar-hide"
          style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}>
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          <button
            onClick={() => setIsAddingListing(true)}
            className="w-full bg-gray-900 p-4 rounded-xl ring-1 ring-gray-800 hover:ring-green-500/50 transition-all mb-8"
          >
            <div className="flex items-center justify-center space-x-2 text-green-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>Add New Listing</span>
            </div>
          </button>

          <h3 className="text-lg font-medium text-gray-200 mb-4">Your Listings</h3>
          <div className="space-y-4">
            <div className="bg-gray-900 p-4 rounded-xl ring-1 ring-gray-800">
              <div className="text-center text-gray-400">
                No listings yet. Create your first listing!
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Buyer View (Original Marketplace Content)
  return (
    <div className="flex h-full flex-col bg-gray-950">
      {/* ...existing header code... */}
      <div className="flex items-center p-4 border-b border-gray-800">
        <button onClick={() => setUserType('none')} className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <h2 className="ml-4 text-lg font-medium text-gray-200">Browse Listings</h2>
      </div>

      {/* ...existing marketplace content... */}
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
  )
}