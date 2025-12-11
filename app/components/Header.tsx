'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Header icons (SVGs)
const iconNotification = "data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM18 16V11C18 7.93 16.36 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.63 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16ZM16 17H8V11C8 8.52 9.51 6.5 12 6.5C14.49 6.5 16 8.52 16 11V17Z' fill='%23323232'/%3E%3C/svg%3E";
const iconDropdown = "data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7 10L12 15L17 10H7Z' fill='%23323232'/%3E%3C/svg%3E";
const iconLogout = "data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M17 7L15.59 8.41L18.17 11H8V13H18.17L15.59 15.58L17 17L22 12L17 7ZM4 5H12V3H4C2.9 3 2 3.9 2 5V19C2 20.1 2.9 21 4 21H12V19H4V5Z' fill='black'/%3E%3C/svg%3E";

interface HeaderProps {
  title: string;
  onMenuClick: () => void;
}

export default function Header({ title, onMenuClick }: HeaderProps) {
  const router = useRouter();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    router.push('/login');
  };

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

  return (
    <header className="bg-white border-b border-[#e6e6e6] px-4 md:px-10 py-4 md:py-7 flex items-center justify-between shadow-sm sticky top-0 z-30">
      <div className="flex items-center gap-3 md:gap-4">
        {/* Hamburger Menu Button (Mobile Only) */}
        <button
          onClick={onMenuClick}
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 active:bg-gray-200 transition"
          aria-label="Open menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h1 className="font-unbounded font-semibold text-xl md:text-2xl text-black">{title}</h1>
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
  );
}
