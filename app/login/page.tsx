"use client";

import Link from "next/link";

// Image assets from Figma - Auth Choice Screen
// Image assets (Unsplash & SVGs)
const imgPrivateInvestigator = "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&q=80&w=2072"; // Productivity/Planning
const imgLogo = "data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0L93.3013 25V75L50 100L6.69873 75V25L50 0Z' fill='white'/%3E%3Cpath d='M50 20L75 35V65L50 80L25 65V35L50 20Z' fill='black'/%3E%3C/svg%3E"; // Hex Logo
const imgBackArrow = "data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15 19l-7-7 7-7' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E";
const imgArrowButton = "data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 5v14M19 12l-7 7-7-7' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E";

export default function LoginChoicePage() {

  return (
    <main
      className="min-h-screen w-full bg-white flex flex-col lg:flex-row"
      data-node-id="1726:6131"
    >
      {/* Left side - Image with overlay and hero content */}
      <section className="relative w-full lg:w-1/2 h-[40vh] lg:h-screen overflow-hidden flex flex-col">
        <img
          alt="Productivity planning"
          src={imgPrivateInvestigator}
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content overlay */}
        <div className="relative z-10 flex flex-col h-full px-6 sm:px-8 lg:px-12 pt-6 pb-8">
          {/* Header */}
          <header className="flex items-center justify-between w-full text-white mb-auto">
            <div className="flex items-center gap-2 lg:gap-4">
              <div className="relative w-10 h-10 lg:w-12 lg:h-12 shrink-0">
                <img 
                  alt="Seun Tracker Logo" 
                  className="w-full h-full object-contain" 
                  src={imgLogo} 
                />
              </div>
              <p className="font-unbounded font-semibold text-lg lg:text-2xl">
                Seun Tracker
              </p>
            </div>

            <Link
              href="/"
              className="flex items-center gap-2 text-xs sm:text-sm lg:text-base font-montserrat font-medium text-white hover:text-gray-200 transition-colors whitespace-nowrap"
            >
              <div className="relative w-4 h-3 lg:w-5 lg:h-4 shrink-0">
                <img alt="Back Arrow" className="w-full h-full object-contain" src={imgBackArrow} />
              </div>
              <span>Back to Website</span>
            </Link>
          </header>

          {/* Hero Text Section */}
          <div className="relative max-w-sm">
            <div className="flex flex-col gap-4">
              <p className="font-unbounded font-bold text-2xl lg:text-4xl text-white leading-tight">
                Stay on Top of Your Goals & Habits.
              </p>
              
              {/* Arrow button */}
              <button
                type="button"
                className="bg-white rounded-lg lg:rounded-xl w-fit p-2 lg:p-3 flex items-center justify-center hover:bg-gray-100 transition-all duration-200 hover:shadow-lg transform hover:scale-105 active:scale-95"
                aria-label="Learn more"
              >
                <div className="relative w-5 h-5 lg:w-7 lg:h-7">
                  <img alt="Arrow Down" className="w-full h-full object-contain" src={imgArrowButton} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Right side - Choice Buttons */}
      <section className="w-full lg:w-1/2 flex flex-col items-center justify-center px-6 sm:px-8 lg:px-12 py-8 lg:py-0 bg-white">
        <div className="w-full max-w-md space-y-6 lg:space-y-8">
          
          {/* Welcome Text */}
          <div className="space-y-3 text-center">
            <h1 className="font-unbounded font-bold text-3xl lg:text-5xl text-black">
              Hi Welcome to
              <br />
              Seun Tracker
            </h1>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-5 lg:gap-7 w-full">
            {/* Login Button */}
            <Link
              href="/login/signin"
              className="bg-gray-100 hover:bg-gray-200 transition-all duration-200 hover:shadow-lg transform hover:scale-105 active:scale-95 rounded-lg lg:rounded-xl px-6 lg:px-8 py-4 lg:py-5 flex items-center justify-center"
            >
              <p className="font-unbounded font-semibold text-xl lg:text-2xl text-black">
                Login
              </p>
            </Link>

            {/* Create Account Button */}
            <Link
              href="/login/signup"
              className="bg-black hover:bg-gray-900 transition-all duration-200 hover:shadow-lg transform hover:scale-105 active:scale-95 rounded-lg lg:rounded-xl px-6 lg:px-8 py-4 lg:py-5 flex items-center justify-center"
            >
              <p className="font-unbounded font-semibold text-xl lg:text-2xl text-white">
                Create Account
              </p>
            </Link>
          </div>

          {/* Powered by text */}
          <p className="text-center font-montserrat text-sm lg:text-base text-gray-600 mt-6">
            Your Personal Growth Companion
          </p>
        </div>
      </section>
    </main>
  );
}
