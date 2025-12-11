'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Sidebar from '../components/Sidebar';

// Header icons (SVGs)
const iconNotification = "data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM18 16V11C18 7.93 16.36 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.63 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16ZM16 17H8V11C8 8.52 9.51 6.5 12 6.5C14.49 6.5 16 8.52 16 11V17Z' fill='%23323232'/%3E%3C/svg%3E";
const iconDropdown = "data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7 10L12 15L17 10H7Z' fill='%23323232'/%3E%3C/svg%3E";
const iconLogout = "data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M17 7L15.59 8.41L18.17 11H8V13H18.17L15.59 15.58L17 17L22 12L17 7ZM4 5H12V3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H12V19H4V5Z' fill='black'/%3E%3C/svg%3E";

// Quick actions icons (SVGs)
const iconAddGoal = "data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM17 13H13V17H11V13H7V11H11V7H13V11H17V13Z' fill='%232E7D32'/%3E%3C/svg%3E";
const iconAddHabit = "data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M19 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.11 21 21 20.1 21 19V5C21 3.9 20.11 3 19 3ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z' fill='%23F57C00'/%3E%3C/svg%3E";
const iconSearch = "data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z' fill='%23C62828'/%3E%3C/svg%3E";
const iconViewAll = "data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3 13H5V3H3V13ZM7 13H9V3H7V13ZM11 13H13V3H11V13ZM15 3V13H17V3H15ZM3 21H5V15H3V21ZM7 21H9V15H7V21ZM11 21H13V15H11V21ZM15 21H17V15H15Z' fill='%236A1B9A'/%3E%3C/svg%3E";

// Activity icons (SVGs)
const iconActivityGoal = "data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M14.4 6L14 4H5V21H7V14H12L12.4 16H19V6H14.4ZM17 14H14L13.6 12H7V6H12L12.4 8H17V14Z' fill='%23000000'/%3E%3C/svg%3E";
const iconActivityHabit = "data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M19 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.11 21 21 20.1 21 19V5C21 3.9 20.11 3 19 3ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z' fill='%23000000'/%3E%3C/svg%3E";

// Dashboard background
const dashboardBgImage = "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=2000&q=80";

// Sample activity data
const activities = [
  {
    id: 1,
    type: 'goal_deadline',
    title: 'Goal Deadline Approaching',
    description: 'Your goal "Read 24 Books" is 80% complete. Keep going to finish by December 31st.',
    time: '2h ago',
    icon: iconActivityGoal,
  },
  {
    id: 2,
    type: 'new_habit',
    title: 'New Habit Started',
    description: 'You started a new habit: "Morning Meditation". Consistency is key!',
    time: '5h ago',
    icon: iconActivityHabit,
  },
  {
    id: 3,
    type: 'habit_streak',
    title: '7 Day Streak!',
    description: 'Congratulations! You have completed "Drink 2L Water" for 7 days in a row.',
    time: '1d ago',
    icon: iconActivityHabit,
  },
  {
    id: 4,
    type: 'goal_completed',
    title: 'Goal Achieved',
    description: 'You successfully completed the goal "Run a Marathon". Great job!',
    time: '2d ago',
    icon: iconActivityGoal,
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const [showAllActivities, setShowAllActivities] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    router.push('/login');
  };

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [sidebarOpen]);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };

    if (userMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [userMenuOpen]);

  const displayedActivities = showAllActivities ? activities : activities.slice(0, 4);

  return (
    <div className="min-h-screen bg-white flex">
      {/* SIDEBAR */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* MAIN CONTENT */}
      <div className="flex-1 md:ml-80 w-full">
        {/* HEADER */}
        <header className="bg-white border-b border-[#e6e6e6] px-4 md:px-10 py-4 md:py-7 flex items-center justify-between shadow-sm sticky top-0 z-30">
          <div className="flex items-center gap-3 md:gap-4">
            {/* Hamburger Menu Button (Mobile Only) */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 active:bg-gray-200 transition"
              aria-label="Open menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="font-unbounded font-semibold text-xl md:text-2xl text-black">Dashboard</h1>
          </div>

          <div className="flex items-center gap-3 md:gap-7">
            {/* Notification Icon */}
            <button className="relative min-w-[44px] min-h-[44px] flex items-center justify-center hover:bg-gray-100 rounded-lg transition active:bg-gray-200">
              <img src={iconNotification} alt="Notifications" className="w-6 md:w-8 h-6 md:h-8" />
            </button>

            {/* User Profile Dropdown */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="bg-[#f6f6f6] flex items-center gap-2 md:gap-4 px-2 md:px-3 py-1.5 md:py-2 rounded-full hover:bg-gray-100 active:bg-gray-200 transition min-h-[44px]"
              >
                <div className="flex items-center gap-2 md:gap-3.5">
                  {/* Avatar */}
                  <div className="w-10 md:w-14 h-10 md:h-14 bg-gray-400 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="font-montserrat font-normal text-sm md:text-xl text-black">AD</span>
                  </div>
                  {/* Name and Role - Hidden on mobile */}
                  <div className="text-left hidden md:block">
                    <p className="font-montserrat font-medium text-base text-black">Firstname Lastname</p>
                    <p className="font-montserrat font-normal text-sm text-black">Seun Tracker</p>
                  </div>
                </div>
                {/* Dropdown Arrow */}
                <img src={iconDropdown} alt="Menu" className="w-6 md:w-9 h-6 md:h-9 flex-shrink-0" />
              </button>

              {/* Dropdown Menu */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-[calc(100vw-2rem)] max-w-[320px] md:w-80 bg-white border border-[#c9c9c9] rounded-lg shadow-lg z-50 overflow-hidden">
                  {/* User Info */}
                  <div className="px-6 md:px-8 py-4 md:py-5 border-b border-gray-300">
                    <div className="flex items-center gap-3 md:gap-4">
                      <div className="w-16 md:w-20 h-16 md:h-20 bg-gray-400 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="font-montserrat font-normal text-white text-sm md:text-base">AD</span>
                      </div>
                      <div>
                        <p className="font-montserrat font-normal text-xs md:text-sm text-black">admin@seuntracker.com</p>
                        <p className="font-montserrat font-normal text-xs md:text-sm text-black mt-2 md:mt-3">Premium User</p>
                      </div>
                    </div>
                  </div>

                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 md:py-3 bg-[#e8e8e8] hover:bg-gray-300 transition font-montserrat font-medium text-sm md:text-base text-black"
                  >
                    <img src={iconLogout} alt="Logout" className="w-5 md:w-7 h-5 md:h-7 flex-shrink-0" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="p-4 md:p-8 lg:p-10 overflow-x-hidden">
          {!showAllActivities ? (
            // Main Dashboard View
            <div className="space-y-6 md:space-y-8 max-w-[1800px] mx-auto">
              {/* Dashboard Overview Section */}
              <div
                className="bg-cover bg-center rounded-xl p-6 md:p-10 lg:p-12 relative overflow-hidden shadow-lg"
                style={{ backgroundImage: `url(${dashboardBgImage})` }}
              >
                <div className="absolute inset-0 bg-black/60" />
                <div className="relative z-10">
                  <h2 className="font-montserrat font-semibold text-xl md:text-2xl text-white mb-6 md:mb-8">Hi, User! Ready to crush your goals?</h2>

                  {/* Stats Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                    {/* Total Goals */}
                    <div className="bg-white rounded-lg p-6 lg:p-8 transition-all duration-200 hover:shadow-lg hover:scale-105">
                      <p className="font-montserrat font-medium text-sm md:text-base text-black mb-4 md:mb-5">Total Goals</p>
                      <p className="font-montserrat font-semibold text-3xl md:text-4xl text-black">12</p>
                    </div>

                    {/* Active Habits */}
                    <div className="bg-white rounded-lg p-6 lg:p-8 transition-all duration-200 hover:shadow-lg hover:scale-105">
                      <p className="font-montserrat font-medium text-sm md:text-base text-black mb-4 md:mb-5">Active Habits</p>
                      <p className="font-montserrat font-semibold text-3xl md:text-4xl text-black">5</p>
                    </div>

                    {/* Completed */}
                    <div className="bg-white rounded-lg p-6 lg:p-8 transition-all duration-200 hover:shadow-lg hover:scale-105">
                      <p className="font-montserrat font-medium text-sm md:text-base text-black mb-4 md:mb-5">Goals Completed</p>
                      <p className="font-montserrat font-semibold text-3xl md:text-4xl text-black">3</p>
                    </div>

                    {/* Streak */}
                    <div className="bg-white rounded-lg p-6 lg:p-8 transition-all duration-200 hover:shadow-lg hover:scale-105">
                      <p className="font-montserrat font-medium text-sm md:text-base text-black mb-4 md:mb-5">Current Streak</p>
                      <p className="font-montserrat font-semibold text-3xl md:text-4xl text-black">12 Days</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8 max-w-[1600px]">
                {/* Recent Activities - Wider */}
                <div className="xl:col-span-2 bg-white border border-[#e6e6e6] rounded-lg p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-center justify-between mb-6 md:mb-8 flex-wrap gap-3">
                    <h3 className="font-geist font-semibold text-xl md:text-2xl text-black">Recent Activity</h3>
                    <button
                      onClick={() => setShowAllActivities(true)}
                      className="bg-[#f0f0f0] flex items-center gap-2 px-5 md:px-7 py-2 md:py-3 rounded-full hover:bg-gray-200 transition font-geist font-normal text-xs md:text-sm text-black whitespace-nowrap"
                    >
                      See All
                    </button>
                  </div>

                  {/* Activities List */}
                  <div className="space-y-0">
                    {activities.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-12 md:py-16">
                        <p className="font-montserrat font-semibold text-sm md:text-base text-gray-400">No Recent Activities. Get started!</p>
                      </div>
                    ) : (
                      activities.slice(0, 4).map((activity, index) => (
                        <div key={activity.id} className={index < 3 ? 'border-b border-[#e6e6e6]' : ''}>
                          <div className="flex items-start gap-3 md:gap-5 py-4 md:py-5">
                            <img src={activity.icon} alt={activity.type} className="w-12 md:w-16 h-12 md:h-16 flex-shrink-0 rounded p-2 bg-gray-50" />
                            <div className="flex-1 min-w-0">
                              <p className="font-montserrat font-semibold text-sm md:text-base text-black">{activity.title}</p>
                              <p className="font-montserrat font-normal text-xs md:text-base text-black mt-1 md:mt-2 line-clamp-2 md:line-clamp-none">{activity.description}</p>
                            </div>
                            <p className="font-montserrat font-semibold text-xs md:text-base text-black flex-shrink-0 whitespace-nowrap ml-2">{activity.time}</p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white border border-[#e6e6e6] rounded-lg p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow duration-200">
                  <h3 className="font-unbounded font-medium text-xl md:text-2xl text-black mb-4 md:mb-6">Quick Actions</h3>

                  <div className="space-y-2 md:space-y-3">
                    {/* Add Goal */}
                    <div 
                      onClick={() => router.push('/goals')}
                      className="bg-white border border-[#dedede] rounded-lg p-3 md:p-4 hover:shadow-md transition cursor-pointer"
                    >
                      <div className="flex gap-3 md:gap-4">
                        <div className="bg-[#d5ffda] w-14 md:w-16 h-14 md:h-16 rounded flex items-center justify-center flex-shrink-0">
                          <img src={iconAddGoal} alt="Add" className="w-7 md:w-9 h-7 md:h-9" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-montserrat font-semibold text-xs md:text-sm text-black line-clamp-1">Set New Goal</p>
                          <p className="font-montserrat font-normal text-xs text-black mt-1 md:mt-2 line-clamp-2">Create a new personal or professional goal.</p>
                        </div>
                      </div>
                    </div>

                    {/* Add Habit */}
                    <div 
                      onClick={() => router.push('/habits')}
                      className="bg-white border border-[#dedede] rounded-lg p-3 md:p-4 hover:shadow-md transition cursor-pointer"
                    >
                      <div className="flex gap-3 md:gap-4">
                        <div className="bg-[#ffedc8] w-14 md:w-16 h-14 md:h-16 rounded flex items-center justify-center flex-shrink-0">
                          <img src={iconAddHabit} alt="Upload" className="w-7 md:w-9 h-7 md:h-9" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-montserrat font-semibold text-xs md:text-sm text-black line-clamp-1">Start New Habit</p>
                          <p className="font-montserrat font-normal text-xs text-black mt-1 md:mt-2 line-clamp-2">Build consistency with daily tracking.</p>
                        </div>
                      </div>
                    </div>

                    {/* View Progress */}
                    <div className="bg-white border border-[#dedede] rounded-lg p-3 md:p-4 hover:shadow-md transition cursor-pointer">
                      <div className="flex gap-3 md:gap-4">
                        <div className="bg-[#ffdad5] w-14 md:w-16 h-14 md:h-16 rounded flex items-center justify-center flex-shrink-0">
                          <img src={iconSearch} alt="Search" className="w-7 md:w-9 h-7 md:h-9" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-montserrat font-semibold text-xs md:text-sm text-black line-clamp-1">Check Progress</p>
                          <p className="font-montserrat font-normal text-xs text-black mt-1 md:mt-2 line-clamp-2">Analyze your streaks and completion rates.</p>
                        </div>
                      </div>
                    </div>

                    {/* View All */}
                    <div
                      onClick={() => router.push('/goals')}
                      className="bg-white border border-[#dedede] rounded-lg p-3 md:p-4 hover:shadow-md transition cursor-pointer"
                    >
                      <div className="flex gap-3 md:gap-4">
                        <div className="bg-[#ffd5f2] w-14 md:w-16 h-14 md:h-16 rounded flex items-center justify-center flex-shrink-0">
                          <img src={iconViewAll} alt="View All" className="w-7 md:w-9 h-7 md:h-9" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-montserrat font-semibold text-xs md:text-sm text-black line-clamp-1">View All Goals</p>
                          <p className="font-montserrat font-normal text-xs text-black mt-1 md:mt-2 line-clamp-2">See all your active goals and achievements.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            // Expanded Activities View
            <div className="bg-white border border-[#e6e6e6] rounded-lg p-6 md:p-8 max-w-[1400px] mx-auto shadow-sm">
              <div className="flex items-center justify-between mb-6 md:mb-8 flex-wrap gap-3">
                <h2 className="font-montserrat font-semibold text-xl md:text-2xl text-black">Notifications / Recent Activities</h2>
                <button
                  onClick={() => setShowAllActivities(false)}
                  className="font-montserrat font-normal text-sm text-black hover:text-gray-600 transition whitespace-nowrap"
                >
                  ← Back
                </button>
              </div>

              <div className="border-b border-[#e6e6e6] mb-4" />

              {/* Full Activities List */}
              <div className="space-y-0">
                {displayedActivities.map((activity, index) => (
                  <div key={activity.id} className={index < displayedActivities.length - 1 ? 'border-b border-[#e6e6e6]' : ''}>
                    <div className="flex items-start gap-3 md:gap-5 py-5 md:py-6">
                      <img src={activity.icon} alt={activity.type} className="w-12 md:w-16 h-12 md:h-16 flex-shrink-0 rounded p-2 bg-gray-50" />
                      <div className="flex-1 min-w-0">
                        <p className="font-montserrat font-semibold text-sm md:text-base text-black">{activity.title}</p>
                        <p className="font-montserrat font-normal text-xs md:text-base text-black mt-1 md:mt-2">{activity.description}</p>
                      </div>
                      <p className="font-montserrat font-semibold text-xs md:text-base text-black flex-shrink-0 whitespace-nowrap ml-2">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
