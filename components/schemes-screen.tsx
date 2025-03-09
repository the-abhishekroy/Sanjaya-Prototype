import React, { useState } from 'react';

interface SchemesScreenProps {
  onNavigate: (view: 'home' | 'chatbot' | 'marketplace' | 'automation' | 'learn' | 'schemes' | 'analytics') => void;
}

export default function SchemesScreen({ onNavigate }: SchemesScreenProps) {
  const [activeTab, setActiveTab] = useState<'subsidies' | 'loans' | 'alerts' | 'insurance' | 'policies' | 'training'>('subsidies');

  return (
    <div className="h-full w-full overflow-y-auto bg-gray-950 text-gray-200 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      {/* Header with back button */}
      <div className="sticky top-0 z-10 bg-gray-950/80 backdrop-blur-sm border-b border-gray-800">
        <div className="flex items-center p-4">
          <button 
            onClick={() => onNavigate('home')}
            className="p-2 hover:bg-gray-800 rounded-lg"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="ml-4 text-xl font-semibold">Government Schemes</h1>
        </div>

        {/* Fixed Tab Navigation Grid */}
        <div className="grid grid-cols-3 gap-2 px-4 pb-2">
          <button 
            onClick={() => setActiveTab('subsidies')}
            className={`px-3 py-2 rounded-lg text-sm text-center ${activeTab === 'subsidies' ? 'bg-amber-500/20 text-amber-400' : 'hover:bg-gray-800'}`}
          >
            Subsidies
          </button>
          <button 
            onClick={() => setActiveTab('loans')}
            className={`px-3 py-2 rounded-lg text-sm text-center ${activeTab === 'loans' ? 'bg-amber-500/20 text-amber-400' : 'hover:bg-gray-800'}`}
          >
            Loans
          </button>
          <button 
            onClick={() => setActiveTab('alerts')}
            className={`px-3 py-2 rounded-lg text-sm text-center ${activeTab === 'alerts' ? 'bg-amber-500/20 text-amber-400' : 'hover:bg-gray-800'}`}
          >
            Alerts
          </button>
          <button 
            onClick={() => setActiveTab('insurance')}
            className={`px-3 py-2 rounded-lg text-sm text-center ${activeTab === 'insurance' ? 'bg-amber-500/20 text-amber-400' : 'hover:bg-gray-800'}`}
          >
            Insurance
          </button>
          <button 
            onClick={() => setActiveTab('policies')}
            className={`px-3 py-2 rounded-lg text-sm text-center ${activeTab === 'policies' ? 'bg-amber-500/20 text-amber-400' : 'hover:bg-gray-800'}`}
          >
            Policies
          </button>
          <button 
            onClick={() => setActiveTab('training')}
            className={`px-3 py-2 rounded-lg text-sm text-center ${activeTab === 'training' ? 'bg-amber-500/20 text-amber-400' : 'hover:bg-gray-800'}`}
          >
            Training
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {/* Subsidies & Grants Tab */}
        {activeTab === 'subsidies' && (
          <div className="space-y-4 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <div className="p-4 bg-gray-900 rounded-xl border border-gray-800">
              <h3 className="text-lg font-medium text-amber-400">PM-KISAN Scheme</h3>
              <p className="mt-2 text-sm text-gray-400">₹6,000 annual income support in three installments</p>
              <button className="mt-4 px-4 py-2 bg-amber-500/10 text-amber-400 rounded-lg hover:bg-amber-500/20">
                Check Eligibility
              </button>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-gray-800">
              <h3 className="text-lg font-medium text-amber-400">National Mission For Sustainable Agriculture</h3>
              <p className="mt-2 text-sm text-gray-400">Up to ₹50,000 for rainwater harvesting structures</p>
              <button className="mt-4 px-4 py-2 bg-amber-500/10 text-amber-400 rounded-lg hover:bg-amber-500/20">
                Apply Now
              </button>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-gray-800">
              <h3 className="text-lg font-medium text-amber-400">Solar Pump Subsidy Scheme</h3>
              <p className="mt-2 text-sm text-gray-400">90% subsidy on solar pump installation</p>
              <button className="mt-4 px-4 py-2 bg-amber-500/10 text-amber-400 rounded-lg hover:bg-amber-500/20">
                View Details
              </button>
            </div>
          </div>
        )}

        {/* Loan Assistance Tab */}
        {activeTab === 'loans' && (
          <div className="space-y-4 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <div className="p-4 bg-gray-900 rounded-xl border border-gray-800">
              <h3 className="text-lg font-medium text-amber-400">Kisan Credit Card</h3>
              <p className="mt-2 text-sm text-gray-400">Interest rate: 4% per annum | Limit up to ₹3 lakhs</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="px-2 py-1 text-xs bg-amber-500/10 text-amber-400 rounded-full">No Collateral</span>
                <span className="px-2 py-1 text-xs bg-amber-500/10 text-amber-400 rounded-full">Quick Approval</span>
              </div>
              <button className="mt-4 px-4 py-2 bg-amber-500/10 text-amber-400 rounded-lg hover:bg-amber-500/20">
                Apply for KCC
              </button>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-gray-800">
              <h3 className="text-lg font-medium text-amber-400">Agriculture Infrastructure Fund</h3>
              <p className="mt-2 text-sm text-gray-400">Long term debt financing up to ₹2 crore</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="px-2 py-1 text-xs bg-amber-500/10 text-amber-400 rounded-full">3% Interest Subvention</span>
              </div>
              <button className="mt-4 px-4 py-2 bg-amber-500/10 text-amber-400 rounded-lg hover:bg-amber-500/20">
                Check Details
              </button>
            </div>
          </div>
        )}

        {/* Emergency Alerts Tab */}
        {activeTab === 'alerts' && (
          <div className="space-y-4 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <div className="p-4 bg-red-500/10 rounded-xl border border-red-900">
              <div className="flex items-center">
                <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <h3 className="ml-2 text-lg font-medium text-red-400">Heavy Rainfall Alert</h3>
              </div>
              <p className="mt-2 text-sm text-gray-400">Expected in your region within next 48 hours</p>
              <button className="mt-4 px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20">
                View Precautions
              </button>
            </div>

            <div className="p-4 bg-orange-500/10 rounded-xl border border-orange-900">
              <div className="flex items-center">
                <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <h3 className="ml-2 text-lg font-medium text-orange-400">Pest Alert: Army Worm</h3>
              </div>
              <p className="mt-2 text-sm text-gray-400">Detected in nearby districts. Take preventive measures.</p>
              <button className="mt-4 px-4 py-2 bg-orange-500/10 text-orange-400 rounded-lg hover:bg-orange-500/20">
                View Solutions
              </button>
            </div>
          </div>
        )}

        {/* Crop Insurance Tab */}
        {activeTab === 'insurance' && (
          <div className="space-y-4 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <div className="p-4 bg-gray-900 rounded-xl border border-gray-800">
              <h3 className="text-lg font-medium text-amber-400">Pradhan Mantri Fasal Bima Yojana</h3>
              <p className="mt-2 text-sm text-gray-400">Premium: Only 2% for Kharif crops</p>
              <div className="mt-3 space-y-2">
                <div className="flex items-center text-sm text-gray-400">
                  <svg className="w-5 h-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Natural Fire & Lightning coverage</span>
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  <svg className="w-5 h-5 mr-2 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Storm, Hailstorm, Cyclone coverage</span>
                </div>
              </div>
              <button className="mt-4 px-4 py-2 bg-amber-500/10 text-amber-400 rounded-lg hover:bg-amber-500/20">
                Enroll Now
              </button>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-gray-800">
              <h3 className="text-lg font-medium text-amber-400">Weather Based Crop Insurance</h3>
              <p className="mt-2 text-sm text-gray-400">Protection against weather uncertainties</p>
              <button className="mt-4 px-4 py-2 bg-amber-500/10 text-amber-400 rounded-lg hover:bg-amber-500/20">
                Calculate Premium
              </button>
            </div>
          </div>
        )}

        {/* Policy Updates Tab */}
        {activeTab === 'policies' && (
          <div className="space-y-4 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <div className="p-4 bg-gray-900 rounded-xl border border-gray-800">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-medium text-amber-400">MSP Increase for Rabi Crops</h3>
                <span className="text-xs text-gray-400">2 days ago</span>
              </div>
              <p className="mt-2 text-sm text-gray-400">Government announces higher MSP for six Rabi crops</p>
              <button className="mt-4 px-4 py-2 bg-amber-500/10 text-amber-400 rounded-lg hover:bg-amber-500/20">
                Read More
              </button>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-gray-800">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-medium text-amber-400">New Organic Farming Policy</h3>
                <span className="text-xs text-gray-400">1 week ago</span>
              </div>
              <p className="mt-2 text-sm text-gray-400">Additional incentives for organic farming certification</p>
              <button className="mt-4 px-4 py-2 bg-amber-500/10 text-amber-400 rounded-lg hover:bg-amber-500/20">
                View Benefits
              </button>
            </div>
          </div>
        )}

        {/* Training & Events Tab */}
        {activeTab === 'training' && (
          <div className="space-y-4 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <div className="p-4 bg-gray-900 rounded-xl border border-gray-800">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-amber-400">Modern Farming Techniques Workshop</h3>
                  <p className="text-xs text-emerald-400 mt-1">Mar 15, 2025 • Free Entry</p>
                </div>
                <span className="px-2 py-1 text-xs bg-emerald-500/10 text-emerald-400 rounded-full">Upcoming</span>
              </div>
              <p className="mt-2 text-sm text-gray-400">Learn latest farming technologies and sustainable practices</p>
              <div className="mt-3 flex items-center text-sm text-gray-400">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Agricultural Research Center, Guwahati</span>
              </div>
              <button className="mt-4 px-4 py-2 bg-amber-500/10 text-amber-400 rounded-lg hover:bg-amber-500/20">
                Register Now
              </button>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-gray-800">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-amber-400">Organic Certification Training</h3>
                  <p className="text-xs text-blue-400 mt-1">Online • Self-Paced</p>
                </div>
                <span className="px-2 py-1 text-xs bg-blue-500/10 text-blue-400 rounded-full">Online</span>
              </div>
              <p className="mt-2 text-sm text-gray-400">Complete guide to organic farming certification process</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="px-2 py-1 text-xs bg-amber-500/10 text-amber-400 rounded-full">4 Weeks</span>
                <span className="px-2 py-1 text-xs bg-amber-500/10 text-amber-400 rounded-full">Certificate</span>
              </div>
              <button className="mt-4 px-4 py-2 bg-amber-500/10 text-amber-400 rounded-lg hover:bg-amber-500/20">
                Enroll Free
              </button>
            </div>

            <div className="p-4 bg-gray-900 rounded-xl border border-gray-800">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-amber-400">Kisan Mela 2025</h3>
                  <p className="text-xs text-purple-400 mt-1">Apr 1-3, 2025 • Exhibition</p>
                </div>
                <span className="px-2 py-1 text-xs bg-purple-500/10 text-purple-400 rounded-full">3 Days</span>
              </div>
              <p className="mt-2 text-sm text-gray-400">Annual agricultural exhibition with latest farming equipment</p>
              <div className="mt-3 flex items-center text-sm text-gray-400">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>State Fair Ground, Guwahati</span>
              </div>
              <button className="mt-4 px-4 py-2 bg-amber-500/10 text-amber-400 rounded-lg hover:bg-amber-500/20">
                Get Pass
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}