"use client";

// Photos from Unsplash
const imgFreepikGenrateAnImageThatExplainsmartCertificateTra359761 = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"; // Hero BG
const imgPortraitYoungGirlGrayTShirtPurpleWall1 = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"; // Avatar 1
const imgHappyManStudentWithAfroHairdoShowsWhiteTeethBeingGoodMoodAfterClasses1 = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"; // Avatar 2
const imgCloseUpPortraitAttractiveYoungWomanIsolated11 = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"; // Avatar 3
const img897551 = "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800"; // Smart Credentials (Security)
const img51 = "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800"; // Notifications (Tech)
const imgWomanSittingHomeOfficeDeskLookingBusinessDocuments1 = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800"; // Analytics

// Icons & Logos (SVG Data URIs)
const imgSubtract = "data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0L93.3013 25V75L50 100L6.69873 75V25L50 0Z' fill='black'/%3E%3Cpath d='M50 20L75 35V65L50 80L25 65V35L50 20Z' fill='white'/%3E%3C/svg%3E"; // Main Logo (Black Hexagon)
const imgSubtract3 = "data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0L93.3013 25V75L50 100L6.69873 75V25L50 0Z' fill='white'/%3E%3Cpath d='M50 20L75 35V65L50 80L25 65V35L50 20Z' fill='black'/%3E%3C/svg%3E"; // Footer Logo (White Hexagon)
const imgSubtract1 = "data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='12' cy='12' r='10' stroke='white' stroke-width='2'/%3E%3Cpath d='M12 8v8M8 12h8' stroke='white' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E"; // Features Icon
const imgSubtract2 = "data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='12' cy='12' r='10' stroke='black' stroke-width='2'/%3E%3Cpath d='M12 7v5l3 3' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"; // How it works icon
const imgLine2 = "data:image/svg+xml,%3Csvg width='1000' height='2' viewBox='0 0 1000 2' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cline y1='1' x2='1000' y2='1' stroke='%23E5E7EB' stroke-width='2' stroke-dasharray='8 8'/%3E%3C/svg%3E"; // Dotted Line
const img = "data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M5 12h14M12 5l7 7-7 7' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"; // Right Arrow
const img1 = "data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M19 9l-7 7-7-7' stroke='gray' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"; // Chevron Down
const img2 = "data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M7 17L17 7M17 7H7M17 7V17' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"; // Up-Right Arrow

import { useState } from 'react';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileMenuOpen(false); // Close mobile menu after clicking
    }
  };

  return (
    <div className="bg-white relative w-full overflow-hidden" data-name="Axiomtracker" data-node-id="1706:7231">
      {/* Navbar */}
      <nav className="w-full flex items-center justify-between px-4 sm:px-6 md:px-8 py-4 md:py-6 bg-white border-b border-gray-200 sticky top-0 z-50" data-node-id="1708:7296">
        <div className="flex gap-8 md:gap-20 items-center">
          <div className="relative w-16 h-16 md:w-24 md:h-24" data-name="Logo" data-node-id="1707:7279">
            <img alt="Axiom Tracker Logo" className="w-full h-full" src={imgSubtract} />
          </div>
          {/* Desktop Navigation */}
          <div className="hidden lg:flex gap-6 items-center">
            <button onClick={() => scrollToSection('hero')} className="border border-black rounded-full px-8 md:px-10 py-2 md:py-2.5 hover:bg-black hover:text-white transition-all duration-200 cursor-pointer">
              <p className="font-montserrat font-medium text-base md:text-lg text-center">Home</p>
            </button>
            <button onClick={() => scrollToSection('features')} className="border border-black rounded-full px-8 md:px-10 py-2 md:py-2.5 hover:bg-black hover:text-white transition-all duration-200 cursor-pointer">
              <p className="font-montserrat font-medium text-base md:text-lg text-center">Features</p>
            </button>
            <button onClick={() => scrollToSection('faqs')} className="border border-black rounded-full px-6 md:px-8 py-2 md:py-2.5 hover:bg-black hover:text-white transition-all duration-200 cursor-pointer">
              <p className="font-montserrat font-medium text-base md:text-lg text-center">FAQs</p>
            </button>
          </div>
        </div>
        
        {/* Desktop Auth Buttons */}
        <div className="hidden sm:flex gap-3 md:gap-7 items-center">
          <a href="/login" className="border border-black rounded-xl md:rounded-2xl px-6 md:px-10 py-3 md:py-5.5 transition-all duration-200 hover:bg-black hover:text-white cursor-pointer min-h-[44px] flex items-center justify-center">
            <p className="font-montserrat font-medium text-base md:text-lg text-center">Login</p>
          </a>
          <a href="/login" className="bg-black rounded-xl md:rounded-2xl px-6 md:px-10 py-3 md:py-5.5 transition-all duration-200 hover:bg-gray-800 hover:shadow-lg cursor-pointer min-h-[44px] flex items-center justify-center">
            <p className="font-montserrat font-medium text-base md:text-lg text-white text-center">Get Started</p>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="sm:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 active:bg-gray-200 transition"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden absolute top-[88px] left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-40 animate-slideDown">
          <div className="flex flex-col p-4 space-y-3">
            <button onClick={() => scrollToSection('hero')} className="border border-black rounded-full px-6 py-3 hover:bg-black hover:text-white transition-all duration-200 cursor-pointer text-center w-full">
              <p className="font-montserrat font-medium text-base">Home</p>
            </button>
            <button onClick={() => scrollToSection('features')} className="border border-black rounded-full px-6 py-3 hover:bg-black hover:text-white transition-all duration-200 cursor-pointer text-center w-full">
              <p className="font-montserrat font-medium text-base">Features</p>
            </button>
            <button onClick={() => scrollToSection('faqs')} className="border border-black rounded-full px-6 py-3 hover:bg-black hover:text-white transition-all duration-200 cursor-pointer text-center w-full">
              <p className="font-montserrat font-medium text-base">FAQs</p>
            </button>
            <div className="border-t border-gray-200 pt-3 space-y-3">
              <a href="/login" className="block border border-black rounded-xl px-6 py-3 transition-all duration-200 hover:bg-black hover:text-white cursor-pointer text-center">
                <p className="font-montserrat font-medium text-base">Login</p>
              </a>
              <a href="/login" className="block bg-black rounded-xl px-6 py-3 transition-all duration-200 hover:bg-gray-800 cursor-pointer text-center">
                <p className="font-montserrat font-medium text-base text-white">Get Started</p>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section id="hero" className="relative w-full bg-black overflow-hidden" data-node-id="1715:873">
        <div className="absolute inset-0 overflow-hidden">
          <img alt="Hero Background" className="w-full h-full object-cover opacity-100" src={imgFreepikGenrateAnImageThatExplainsmartCertificateTra359761} />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-between px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20 min-h-[85vh] md:min-h-[90vh]" data-node-id="1717:874">
          <div className="flex-1 flex flex-col gap-8 sm:gap-10 md:gap-12 items-center justify-center w-full max-w-5xl mx-auto pt-8 sm:pt-10 md:pt-12" data-node-id="1712:491">
            {/* Welcome Badge */}
            <div className="bg-white rounded-lg px-6 sm:px-8 py-3 sm:py-4 inline-flex" data-node-id="1712:493">
              <p className="font-montserrat font-medium text-base sm:text-lg text-black">Welcome to Seun Tracker</p>
            </div>

            {/* Main Content */}
            <div className="flex flex-col gap-4 sm:gap-6 items-center w-full text-center text-white" data-node-id="1712:497">
              <h1 className="font-unbounded font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight max-w-4xl px-4">
                Master Your Habits.<br />Crush Your Goals.
              </h1>
              <p className="font-geist font-medium text-lg sm:text-xl md:text-2xl leading-relaxed max-w-3xl px-4">
                Your personal command center for growth. Track habits, set ambitious goals, and get the insights you need to become your best self—every single day.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center w-full justify-center mt-4" data-node-id="1712:500">
              <a href="/login" className="bg-white rounded-3xl px-6 sm:px-8 py-3 sm:py-4 inline-flex cursor-pointer hover:bg-gray-100 transition-all duration-200 hover:shadow-lg transform hover:scale-105 active:scale-95 min-h-[44px] w-full sm:w-auto" data-node-id="1712:501">
                <p className="font-montserrat font-semibold text-base sm:text-lg text-black">Get Started</p>
              </a>
              <div className="flex items-center gap-2 w-full sm:w-auto" data-node-id="1712:503">
                <button onClick={() => scrollToSection('how-it-works')} className="bg-white rounded-3xl px-6 sm:px-8 py-3 sm:py-4 inline-flex cursor-pointer hover:bg-gray-100 transition-all duration-200 hover:shadow-lg transform hover:scale-105 active:scale-95 min-h-[44px] flex-1 sm:flex-initial" data-node-id="1712:504">
                  <p className="font-montserrat font-semibold text-base sm:text-lg text-black">Learn How it Works</p>
                </button>
                <button onClick={() => scrollToSection('how-it-works')} className="bg-white rounded-3xl px-3 sm:px-4 py-3 sm:py-4 inline-flex cursor-pointer hover:bg-gray-100 transition-all duration-200 hover:shadow-lg transform hover:scale-105 active:scale-95 min-h-[44px]" data-node-id="1712:506">
                  <img alt="Arrow" className="w-6 h-6 sm:w-8 sm:h-8" src={img} />
                </button>
              </div>
            </div>
          </div>

          {/* Social Avatars - At bottom of hero */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 items-center pb-4 sm:pb-6 mt-auto" data-node-id="1712:490">
            <div className="bg-white rounded-full p-2 flex gap-0 flex-row">
              <div className="rounded-full overflow-hidden w-10 h-10 sm:w-11 sm:h-11 -mr-2 border-2 border-white">
                <img alt="User 1" className="w-full h-full object-cover" src={imgPortraitYoungGirlGrayTShirtPurpleWall1} />
              </div>
              <div className="rounded-full overflow-hidden w-10 h-10 sm:w-11 sm:h-11 -mr-2 border-2 border-white z-10">
                <img alt="User 2" className="w-full h-full object-cover" src={imgHappyManStudentWithAfroHairdoShowsWhiteTeethBeingGoodMoodAfterClasses1} />
              </div>
              <div className="rounded-full overflow-hidden w-10 h-10 sm:w-11 sm:h-11 border-2 border-white z-20">
                <img alt="User 3" className="w-full h-full object-cover" src={imgCloseUpPortraitAttractiveYoungWomanIsolated11} />
              </div>
            </div>
            <p className="font-geist font-semibold text-sm sm:text-base text-white max-w-xs text-center sm:text-left px-4 sm:px-0">
              Join thousands of achievers tracking their journey with Seun Tracker
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="w-full px-4 sm:px-6 md:px-8 py-12 sm:py-14 md:py-16 bg-white" data-node-id="1717:883">
        <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6" data-node-id="1717:881">
          <p className="font-unbounded font-semibold text-xl sm:text-2xl text-gray-700">About</p>
          <p className="font-geist font-medium text-lg sm:text-xl md:text-2xl text-black leading-relaxed">
            {`Seun Tracker is a modern personal productivity platform designed to help students and professionals stay organized. Whether you're tracking study milestones, building new habits, or managing personal deadlines, our intelligent dashboard keeps you focused on what matters most. Stop drifting and start achieving.`}
          </p>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="w-full px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20 bg-white" data-node-id="1717:880">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="space-y-4 sm:space-y-6 mb-12 sm:mb-14 md:mb-16" data-node-id="1714:637">
            <div className="flex flex-col gap-5 sm:gap-7 items-center" data-node-id="1713:518">
              <div className="relative w-12 h-12 sm:w-16 sm:h-16" data-name="Circle" data-node-id="1713:525">
                <img alt="" className="w-full h-full" src={imgSubtract2} />
              </div>
              <p className="font-unbounded font-semibold text-2xl sm:text-3xl md:text-4xl text-gray-700 text-center px-4">
                How Does Seun Tracker Work?
              </p>
            </div>
            <p className="font-geist font-medium text-lg sm:text-xl md:text-2xl text-black text-center max-w-3xl mx-auto px-4">
              Building a better you shouldn't be complicated. Our simple three-step process helps you gain momentum fast.
            </p>
          </div>

          {/* Three Step Cards with Connecting Lines */}
          <div className="hidden md:block">
            {/* Circles with connecting lines */}
            <div className="relative flex justify-center items-center mb-12">
              <div className="flex items-center justify-between w-full max-w-4xl">
                {[
                  { step: "01" },
                  { step: "02" },
                  { step: "03" }
                ].map((card, idx) => (
                  <div key={idx} className="flex items-center">
                    <div className="bg-black rounded-full w-28 h-28 lg:w-32 lg:h-32 flex items-center justify-center shadow-xl z-10 transition-all duration-200 hover:shadow-2xl hover:scale-110 cursor-pointer">
                      <p className="font-unbounded font-semibold text-2xl lg:text-3xl text-white text-center">{card.step}</p>
                    </div>
                    {idx < 2 && (
                      <div className="h-0.5 bg-black w-20 lg:w-32 xl:w-40"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Content Cards */}
            <div className="grid grid-cols-3 gap-4 lg:gap-6">
              {[
                { title: "Set Your Goals", body: "Define what success looks like for you. Whether it's learning a new skill, reading more books, or hitting fitness milestones." },
                { title: "Track Habits", body: "Build consistency with daily habit tracking. Set streaks, get reminders, and visualize your progress over time." },
                { title: "Review Progress", body: "See how far you've come. Access detailed analytics, celebrate wins, and adjust your plan based on real data." }
              ].map((card, idx) => (
                <div key={idx} className="bg-white rounded-2xl border-2 border-black p-6 lg:p-8 flex flex-col gap-4 lg:gap-6 items-center text-center transition-all duration-200 hover:shadow-xl hover:border-gray-400 cursor-pointer">
                  <p className="font-unbounded font-semibold text-xl lg:text-2xl text-black">{card.title}</p>
                  <p className="font-geist font-medium text-base lg:text-lg text-black leading-relaxed">{card.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile View - Stacked */}
          <div className="md:hidden space-y-6 sm:space-y-8">
            {[
              { step: "01", title: "Set Your Goals", body: "Define what success looks like for you. Whether it's learning a new skill, reading more books, or hitting fitness milestones." },
              { step: "02", title: "Track Habits", body: "Build consistency with daily habit tracking. Set streaks, get reminders, and visualize your progress over time." },
              { step: "03", title: "Review Progress", body: "See how far you've come. Access detailed analytics, celebrate wins, and adjust your plan based on real data." }
            ].map((card, idx) => (
              <div key={idx} className="border-2 border-black rounded-2xl p-5 sm:p-6 flex flex-col gap-5 sm:gap-6 items-center transition-all duration-200 hover:shadow-lg hover:border-gray-400 cursor-pointer">
                <div className="bg-black rounded-full w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center shadow-lg">
                  <p className="font-unbounded font-semibold text-2xl sm:text-3xl text-white text-center">{card.step}</p>
                </div>
                <div className="flex flex-col gap-3 sm:gap-4 items-center text-center w-full">
                  <p className="font-unbounded font-semibold text-xl sm:text-2xl text-black">{card.title}</p>
                  <p className="font-geist font-medium text-base sm:text-lg text-black">{card.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full bg-black py-12 sm:py-14 md:py-16 px-4 sm:px-6 md:px-8" data-node-id="1714:635">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="space-y-5 sm:space-y-7 mb-12 sm:mb-14 md:mb-16 text-center" data-node-id="1714:647">
            <div className="inline-block mx-auto space-y-6 sm:space-y-8" data-node-id="1714:639">
              <p className="font-unbounded font-semibold text-3xl sm:text-4xl text-white px-4">Seun Tracker Features</p>
              <div className="flex justify-center">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20" data-node-id="1714:643">
                  <img alt="" className="w-full h-full" src={imgSubtract1} />
                </div>
              </div>
            </div>
            <p className="font-geist font-medium text-lg sm:text-xl md:text-2xl text-white px-4">
              Everything you need to organize your life, build discipline, and reach your full potential.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12" data-node-id="1792:9853">
            {/* Smart Credentials -> Goal Tracking */}
            <div className="bg-white rounded-2xl overflow-hidden flex flex-col h-full transition-all duration-200 hover:shadow-xl hover:scale-105 cursor-pointer" data-node-id="1715:649">
              <div className="h-60 sm:h-64 md:h-72 overflow-hidden" data-node-id="1792:9854">
                <img alt="Personal Goal Tracking" className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" src={img897551} />
              </div>
              <div className="p-5 sm:p-6 space-y-2 sm:space-y-2.5 flex-1 flex flex-col">
                <p className="font-montserrat font-semibold text-xl sm:text-2xl text-black">Smart Goal Tracking</p>
                <p className="font-montserrat font-normal text-base sm:text-lg text-black">Break down big dreams into minimal actionable steps. Track deadlines and milestones effortlessly.</p>
              </div>
            </div>

            {/* Intelligent Notifications -> Habit Building */}
            <div className="bg-white rounded-2xl overflow-hidden flex flex-col h-full transition-all duration-200 hover:shadow-xl hover:scale-105 cursor-pointer" data-node-id="1792:9859">
              <div className="h-60 sm:h-64 md:h-72 overflow-hidden" data-node-id="1792:9860">
                <img alt="Habit Reminders" className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" src={img51} />
              </div>
              <div className="p-5 sm:p-6 space-y-2 sm:space-y-2.5 flex-1 flex flex-col">
                <p className="font-montserrat font-semibold text-xl sm:text-2xl text-black">Daily Habit Reminders</p>
                <p className="font-montserrat font-normal text-base sm:text-lg text-black">Stay consistent with gentle nudges. Customize your notification schedule to fit your routine.</p>
              </div>
            </div>

            {/* Real-Time Analytics -> Personal Insights */}
            <div className="bg-white rounded-2xl overflow-hidden flex flex-col h-full transition-all duration-200 hover:shadow-xl hover:scale-105 cursor-pointer" data-node-id="1792:9871">
              <div className="h-60 sm:h-64 md:h-72 overflow-hidden" data-node-id="1792:9872">
                <img alt="Progress Insights" className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" src={imgWomanSittingHomeOfficeDeskLookingBusinessDocuments1} />
              </div>
              <div className="p-5 sm:p-6 space-y-2 sm:space-y-2.5 flex-1 flex flex-col">
                <p className="font-montserrat font-semibold text-xl sm:text-2xl text-black">Personal Insights</p>
                <p className="font-montserrat font-normal text-base sm:text-lg text-black">Visualize your growth with beautiful charts. Identify patterns and understand your productivity peaks.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider Line */}
      <div className="w-full max-w-6xl mx-auto px-8 py-4" data-node-id="1714:648">
        <img alt="" className="w-full" src={imgLine2} />
      </div>

      {/* FAQs Section */}
      <section id="faqs" className="w-full px-8 py-20 bg-white" data-node-id="1715:703">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 space-y-4" data-node-id="1811:1931">
            <p className="font-unbounded font-semibold text-3xl sm:text-4xl text-gray-700">Frequently Asked Questions</p>
            <p className="font-geist font-medium text-lg sm:text-xl text-black max-w-3xl mx-auto">
              {`Got questions? We've got answers. Can't find what you're looking for? Contact our support team.`}
            </p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-5">
            {[
              {
                question: "How does Seun Tracker help me reach my goals?",
                answer: "Seun Tracker turns abstract goals into action. By letting you define clear milestones and track daily habits that lead to those goals, we help you bridge the gap between planning and doing. Our reminder system ensures you never forget a task, while visual progress bars keep you motivated to maintain your streak."
              },
              {
                question: "Is Seun Tracker suitable for students?",
                answer: "Absolutely! Students use Seun Tracker to manage assignment deadlines, track study hours, and build routine habits like 'Review Notes' or 'Practice Coding'. It's perfect for balancing academic responsibilities with personal growth projects."
              },
              {
                question: "Can I sync my data across devices?",
                answer: "Yes. Your Seun Tracker account is cloud-based, meaning you can access your dashboard from your laptop, tablet, or phone. Start your day by reviewing goals on your phone, and dive deep into analytics on your desktop later. Your progress is always up to date."
              },
              {
                question: "Is my personal data private?",
                answer: "Your privacy is paramount. Seun Tracker uses industry-standard encryption to protect your data. We do not sell your personal information or habit data to third parties. Your goals and dreams are personal, and we keep them that way."
              }
            ].map((faq, idx) => (
              <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all duration-200" data-node-id={`1715:${671 + idx * 6}`}>
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                  className="w-full px-8 py-8 flex items-center justify-between cursor-pointer group"
                >
                  <div className="flex gap-6 items-center w-full">
                    <div className={`shrink-0 flex items-center justify-center transition-transform duration-200 ${openFaqIndex === idx ? 'rotate-90' : ''}`}>
                      <div className="rotate-180 scale-y-[-1]">
                        <img alt="Expand" className="size-7" src={img1} />
                      </div>
                    </div>
                    <p className="font-unbounded font-semibold text-xl sm:text-2xl text-gray-700 group-hover:text-black transition-colors duration-200 text-left">{faq.question}</p>
                  </div>
                </button>
                {openFaqIndex === idx && (
                  <div className="px-8 pb-8 pl-20 animate-fadeIn">
                    <p className="font-geist font-normal text-base sm:text-lg text-gray-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider Line */}
      <div className="w-full max-w-6xl mx-auto px-8 py-4" data-node-id="1717:955">
        <img alt="" className="w-full" src={imgLine2} />
      </div>

      {/* Final CTA Section */}
      <section className="w-full bg-black py-20 px-8" data-node-id="1715:704">
        <div className="max-w-3xl mx-auto flex flex-col gap-10 items-center text-center py-12" data-node-id="1715:716">
          <p className="font-unbounded font-bold text-3xl sm:text-4xl text-white leading-tight">
            Ready to Transform Your Productivity?
          </p>
          <p className="font-geist font-semibold text-xl sm:text-2xl text-white max-w-2xl">
            Join a community of doers who trust Seun Tracker to organize their lives and achieve their dreams.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 items-center" data-node-id="1715:705">
            <a href="/login" className="bg-white rounded-3xl px-10 py-5 inline-flex cursor-pointer hover:bg-gray-100 transition-all duration-200 hover:shadow-lg transform hover:scale-105 active:scale-95" data-node-id="1715:706">
              <p className="font-montserrat font-bold text-lg text-black">Get Started</p>
            </a>
            <div className="flex items-center justify-center">
              <div className="scale-y-[-1]">
                <a href="/login" className="bg-white rounded-3xl px-6 py-5 inline-flex cursor-pointer hover:bg-gray-100 transition-all duration-200 hover:shadow-lg transform hover:scale-105 active:scale-95">
                  <img alt="Arrow" className="size-8" src={img2} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-black rounded-3xl mx-4 sm:mx-8 my-8 px-8 sm:px-16 py-12" data-node-id="1715:826">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24" data-node-id="1715:828">
          {/* Left Section */}
          <div className="flex flex-col gap-12 w-full lg:w-5/12" data-node-id="1715:830">
            <div className="relative size-16" data-node-id="1715:869">
              <img alt="Logo" className="w-full h-full" src={imgSubtract3} />
            </div>
            <div>
              <p className="font-montserrat font-semibold text-lg text-white leading-8 mb-0">Let's make your goals a reality.</p>
              <p className="font-montserrat font-semibold text-lg text-white leading-8">Start your journey to a more organized life today.</p>
            </div>
            <p className="font-montserrat font-normal text-base text-white/80 leading-7">
              © 2025 Seun Tracker - All Rights Reserved
            </p>
          </div>

          {/* Right Section */}
          <div className="flex flex-col sm:flex-row gap-12 sm:gap-16 w-full lg:w-7/12" data-node-id="1715:836">
            {/* Quick Links */}
            <div className="flex flex-col gap-6" data-node-id="1715:837">
              <p className="font-semibold text-xl text-white">QUICK LINKS</p>
              <div className="flex flex-col gap-4 font-montserrat font-medium text-lg text-white" data-node-id="1715:839">
                <button onClick={() => scrollToSection('hero')} className="cursor-pointer hover:text-gray-300 hover:translate-x-1 transition-all duration-200 text-left">Home</button>
                <button onClick={() => scrollToSection('features')} className="cursor-pointer hover:text-gray-300 hover:translate-x-1 transition-all duration-200 text-left">Features</button>
                <button onClick={() => scrollToSection('faqs')} className="cursor-pointer hover:text-gray-300 hover:translate-x-1 transition-all duration-200 text-left">FAQs</button>
                <a href="mailto:hello@seuntracker.com" className="cursor-pointer hover:text-gray-300 hover:translate-x-1 transition-all duration-200 block">Contact</a>
              </div>
            </div>

            {/* Contact Us */}
            <div className="flex flex-col gap-6" data-node-id="1715:844">
              <p className="font-semibold text-xl text-white">CONTACT US</p>
              <a href="mailto:hello@seuntracker.com" className="font-montserrat font-medium text-lg text-white hover:text-blue-300 hover:underline transition-all duration-200 cursor-pointer">hello@seuntracker.com</a>
            </div>

            {/* Legal */}
            <div className="flex flex-col gap-6" data-node-id="1715:854">
              <p className="font-semibold text-xl text-white">LEGAL</p>
              <div className="flex flex-col gap-4 font-montserrat font-medium text-lg text-white" data-node-id="1715:856">
                <p className="cursor-pointer hover:text-gray-300 hover:translate-x-1 transition-all duration-200">Terms of Service</p>
                <p className="cursor-pointer hover:text-gray-300 hover:translate-x-1 transition-all duration-200">Privacy Policy</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
