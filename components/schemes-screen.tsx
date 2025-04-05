import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GradientBackground } from './ui/gradient-background';
import { SchemeCard } from './ui/scheme-card';

interface SchemesScreenProps {
  onNavigate: (view: 'home' | 'chatbot' | 'marketplace' | 'automation' | 'learn' | 'schemes' | 'analytics') => void;
}

interface SchemeCardProps {
  title: string;
  description: string;
  tags?: string[];
  actionText: string;
  date?: string;
  eventType?: string;
  alertType?: string;
}

export default function SchemesScreen({ onNavigate }: SchemesScreenProps) {
  const [activeTab, setActiveTab] = useState<'subsidies' | 'loans' | 'alerts' | 'insurance' | 'policies' | 'training'>('subsidies');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { id: 'subsidies', icon: '💰', label: 'Subsidies' },
    { id: 'loans', icon: '🏦', label: 'Loans' },
    { id: 'alerts', icon: '⚠️', label: 'Alerts' },
    { id: 'insurance', icon: '🛡️', label: 'Insurance' },
    { id: 'policies', icon: '📜', label: 'Policies' },
    { id: 'training', icon: '🎓', label: 'Training' }
  ];

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
                  onClick={() => onNavigate('home')}
                  className="p-2 hover:bg-gray-800/50 rounded-lg transition-all"
                >
                  <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div>
                  <h1 className="text-xl font-semibold bg-gradient-to-r from-rose-400 to-rose-600 bg-clip-text text-transparent">
                    Government Schemes
                  </h1>
                  <p className="text-sm text-gray-400">Discover available support programs</p>
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative max-w-xs w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search schemes..."
                  className="w-full bg-gray-800/50 text-gray-200 rounded-lg px-4 py-2 
                           pl-10 ring-1 ring-gray-700 focus:ring-rose-500/50 
                           transition-all duration-200"
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="mt-4 flex space-x-2 overflow-x-auto scrollbar-hide">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    flex items-center px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap
                    transition-all duration-200 ease-in-out
                    ${activeTab === tab.id 
                      ? 'bg-rose-500/10 text-rose-400 ring-1 ring-rose-500/50' 
                      : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'}
                  `}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Content Area */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="relative flex-1 overflow-auto scrollbar-hide"
      >
        <div className="max-w-6xl mx-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeTab === 'subsidies' && (
              <>
                <SchemeCard
                  title="PM-KISAN Scheme"
                  description="₹6,000 annual income support in three installments"
                  tags={['Direct Benefit', 'All Farmers']}
                  actionText="Check Eligibility"
                />
                <SchemeCard
                  title="National Mission For Sustainable Agriculture"
                  description="Up to ₹50,000 for rainwater harvesting structures"
                  actionText="Apply Now"
                />
                <SchemeCard
                  title="Solar Pump Subsidy Scheme"
                  description="90% subsidy on solar pump installation"
                  actionText="View Details"
                />
              </>
            )}
            {activeTab === 'loans' && (
              <>
                <SchemeCard
                  title="Kisan Credit Card"
                  description="Interest rate: 4% per annum | Limit up to ₹3 lakhs"
                  tags={['No Collateral', 'Quick Approval']}
                  actionText="Apply for KCC"
                />
                <SchemeCard
                  title="Agriculture Infrastructure Fund"
                  description="Long term debt financing up to ₹2 crore"
                  tags={['3% Interest Subvention']}
                  actionText="Check Details"
                />
              </>
            )}
            {activeTab === 'alerts' && (
              <>
                <SchemeCard
                  title="Heavy Rainfall Alert"
                  description="Expected in your region within next 48 hours"
                  actionText="View Precautions"
                  alertType="red"
                />
                <SchemeCard
                  title="Pest Alert: Army Worm"
                  description="Detected in nearby districts. Take preventive measures."
                  actionText="View Solutions"
                  alertType="orange"
                />
              </>
            )}
            {activeTab === 'insurance' && (
              <>
                <SchemeCard
                  title="Pradhan Mantri Fasal Bima Yojana"
                  description="Premium: Only 2% for Kharif crops"
                  tags={['Natural Fire & Lightning coverage', 'Storm, Hailstorm, Cyclone coverage']}
                  actionText="Enroll Now"
                />
                <SchemeCard
                  title="Weather Based Crop Insurance"
                  description="Protection against weather uncertainties"
                  actionText="Calculate Premium"
                />
              </>
            )}
            {activeTab === 'policies' && (
              <>
                <SchemeCard
                  title="MSP Increase for Rabi Crops"
                  description="Government announces higher MSP for six Rabi crops"
                  actionText="Read More"
                  date="2 days ago"
                />
                <SchemeCard
                  title="New Organic Farming Policy"
                  description="Additional incentives for organic farming certification"
                  actionText="View Benefits"
                  date="1 week ago"
                />
              </>
            )}
            {activeTab === 'training' && (
              <>
                <SchemeCard
                  title="Modern Farming Techniques Workshop"
                  description="Learn latest farming technologies and sustainable practices"
                  tags={['Mar 15, 2025 • Free Entry', 'Agricultural Research Center, Guwahati']}
                  actionText="Register Now"
                  eventType="upcoming"
                />
                <SchemeCard
                  title="Organic Certification Training"
                  description="Complete guide to organic farming certification process"
                  tags={['4 Weeks', 'Certificate']}
                  actionText="Enroll Free"
                  eventType="online"
                />
                <SchemeCard
                  title="Kisan Mela 2025"
                  description="Annual agricultural exhibition with latest farming equipment"
                  tags={['Apr 1-3, 2025 • Exhibition', 'State Fair Ground, Guwahati']}
                  actionText="Get Pass"
                  eventType="3 days"
                />
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}