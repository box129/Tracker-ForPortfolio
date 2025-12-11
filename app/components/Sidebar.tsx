'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Sidebar icons (SVG Data URIs)
const iconLogo = "data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0L93.3013 25V75L50 100L6.69873 75V25L50 0Z' fill='black'/%3E%3Cpath d='M50 20L75 35V65L50 80L25 65V35L50 20Z' fill='white'/%3E%3C/svg%3E";
const iconDashboard = "data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3 3h7v7H3V3zm11 0h7v7h-7V3zm0 11h7v7h-7v-7zM3 14h7v7H3v-7z' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E";
const iconGoals = "data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 2l3 6 6 1-4 4 1 6-6-3-6 3 1-6-4-4 6-1 3-6z' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"; // Star for Goals
const iconHabits = "data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"; // Calendar for Habits
const iconSettings = "data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3Cpath d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (path: string) => pathname.startsWith(path);

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 bottom-0 w-80 bg-white border-r border-[#e6e6e6] flex flex-col z-50
          transform transition-transform duration-300 ease-in-out
          md:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Close Button (Mobile Only) */}
        <button
          onClick={onClose}
          className="md:hidden absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition"
          aria-label="Close menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Logo */}
        <div className="flex flex-col items-center gap-2 pt-10 pb-12 md:pb-16">
          <img src={iconLogo} alt="Seun Tracker" className="w-16 md:w-20 h-16 md:h-20" />
          <p className="font-montserrat font-semibold text-lg md:text-xl text-black">Seun Tracker</p>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-4 md:px-6 space-y-2 md:space-y-3 overflow-y-auto">
          {/* Dashboard */}
          <Link
            href="/dashboard"
            onClick={onClose}
            className={`flex items-center gap-5 md:gap-6 px-5 md:px-6 py-4 rounded-lg font-geist font-medium text-base md:text-xl transition min-h-[56px] ${
              isActive('/dashboard')
                ? 'bg-black text-white'
                : 'text-black hover:bg-gray-50 active:bg-gray-100'
            }`}
          >
            <div className={`w-7 md:w-8 h-7 md:h-8 shrink-0 ${isActive('/dashboard') ? 'invert' : ''}`}>
              <img src={iconDashboard} alt="Dashboard" className="w-full h-full" />
            </div>
            <span>Dashboard</span>
          </Link>

          {/* Goals (was Credentials) */}
          <Link
            href="/goals"
            onClick={onClose}
            className={`flex items-center gap-5 md:gap-6 px-5 md:px-6 py-4 rounded-lg font-geist font-medium text-base md:text-xl transition min-h-[56px] ${
              isActive('/goals')
                ? 'bg-black text-white'
                : 'text-black hover:bg-gray-50 active:bg-gray-100'
            }`}
          >
            <div className={`w-7 md:w-8 h-7 md:h-8 shrink-0 ${isActive('/goals') ? 'invert' : ''}`}>
               <img src={iconGoals} alt="Goals" className="w-full h-full" />
            </div>
            <span>Goals</span>
          </Link>

          {/* Habits (was Entity) */}
          <Link
            href="/habits"
            onClick={onClose}
            className={`flex items-center gap-5 md:gap-6 px-5 md:px-6 py-4 rounded-lg font-geist font-medium text-base md:text-xl transition min-h-[56px] ${
              isActive('/habits')
                ? 'bg-black text-white'
                : 'text-black hover:bg-gray-50 active:bg-gray-100'
            }`}
          >
            <div className={`w-7 md:w-8 h-7 md:h-8 shrink-0 ${isActive('/habits') ? 'invert' : ''}`}>
              <img src={iconHabits} alt="Habits" className="w-full h-full" />
            </div>
            <span>Habits</span>
          </Link>

          {/* Settings */}
          <Link
            href="/settings"
            onClick={onClose}
            className={`flex items-center gap-5 md:gap-6 px-5 md:px-6 py-4 rounded-lg font-geist font-medium text-base md:text-xl transition min-h-[56px] ${
              isActive('/settings')
                ? 'bg-black text-white'
                : 'text-black hover:bg-gray-50 active:bg-gray-100'
            }`}
          >
            <div className={`w-7 md:w-8 h-7 md:h-8 shrink-0 ${isActive('/settings') ? 'invert' : ''}`}>
              <img src={iconSettings} alt="Settings" className="w-full h-full" />
            </div>
            <span>Settings</span>
          </Link>
        </nav>
      </aside>
    </>
  );
}
