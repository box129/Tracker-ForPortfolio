'use client';

import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

type Tab = 'account' | 'school' | 'notification';

interface AccountFormData {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  department: string;
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface SchoolFormData {
  schoolName: string;
  program: string;
  studentId: string;
  level: string;
  bio: string;
}

interface NotificationSettings {
  notificationFrequency: string;
  emailNotifications: boolean;
  activityUpdates: boolean;
  goalReminders: boolean;
  criticalAlertsOnly: boolean;
}

export default function SettingsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('account');
  const [showFrequencyDropdown, setShowFrequencyDropdown] = useState(false);
  
  const [accountForm, setAccountForm] = useState<AccountFormData>({
    firstName: 'Jeremiah',
    lastName: 'Alalade',
    email: 'jalalade@seuntracker.com',
    role: 'Student',
    department: 'Computer Science',
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [schoolForm, setSchoolForm] = useState<SchoolFormData>({
    schoolName: 'University of Lagos',
    program: 'Computer Science',
    studentId: '2021/123456',
    level: '300',
    bio: 'Passionate about coding using React.',
  });

  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    notificationFrequency: 'Daily',
    emailNotifications: true,
    activityUpdates: true,
    goalReminders: true,
    criticalAlertsOnly: false,
  });

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

  const handleSaveAccount = () => {
    console.log('Account form saved:', accountForm);
  };

  const handleSaveSchool = () => {
    console.log('School form saved:', schoolForm);
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* SIDEBAR */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* MAIN CONTENT */}
      <div className="flex-1 md:ml-80 w-full">
        {/* HEADER */}
        <Header title="Settings" onMenuClick={() => setSidebarOpen(true)} />

        {/* PAGE CONTENT */}
        <main className="p-4 md:p-10">
          {/* TABS */}
          <div className="border-b border-[#e6e6e6] mb-6 md:mb-8">
            <div className="flex gap-6 md:gap-10 overflow-x-auto">
              <button
                onClick={() => setActiveTab('account')}
                className={`pb-4 md:pb-5 font-montserrat font-normal text-base md:text-lg whitespace-nowrap ${
                  activeTab === 'account'
                    ? 'text-black border-b-2 border-black'
                    : 'text-gray-500 hover:text-black'
                }`}
              >
                Account Information
              </button>
              <button
                onClick={() => setActiveTab('school')}
                className={`pb-4 md:pb-5 font-montserrat font-normal text-base md:text-lg whitespace-nowrap ${
                  activeTab === 'school'
                    ? 'text-black border-b-2 border-black'
                    : 'text-gray-500 hover:text-black'
                }`}
              >
                School Information
              </button>
              <button
                onClick={() => setActiveTab('notification')}
                className={`pb-4 md:pb-5 font-montserrat font-normal text-base md:text-lg whitespace-nowrap ${
                  activeTab === 'notification'
                    ? 'text-black border-b-2 border-black'
                    : 'text-gray-500 hover:text-black'
                }`}
              >
                Notification Preference
              </button>
            </div>
          </div>

          {/* ACCOUNT INFORMATION TAB */}
          {activeTab === 'account' && (
            <div className="max-w-4xl">
              <h2 className="text-lg md:text-xl font-montserrat font-semibold text-black mb-6">Personal Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
                {/* First Name */}
                <div>
                  <label className="block text-sm font-montserrat font-medium text-black mb-2">First Name</label>
                  <input
                    type="text"
                    value={accountForm.firstName}
                    onChange={(e) => setAccountForm({ ...accountForm, firstName: e.target.value })}
                    className="w-full px-4 py-2.5 border border-[#e6e6e6] rounded-lg bg-[#f6f6f6] text-sm font-montserrat"
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-sm font-montserrat font-medium text-black mb-2">Last Name</label>
                  <input
                    type="text"
                    value={accountForm.lastName}
                    onChange={(e) => setAccountForm({ ...accountForm, lastName: e.target.value })}
                    className="w-full px-4 py-2.5 border border-[#e6e6e6] rounded-lg bg-[#f6f6f6] text-sm font-montserrat"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-montserrat font-medium text-black mb-2">Email</label>
                  <input
                    type="email"
                    value={accountForm.email}
                    onChange={(e) => setAccountForm({ ...accountForm, email: e.target.value })}
                    className="w-full px-4 py-2.5 border border-[#e6e6e6] rounded-lg bg-[#f6f6f6] text-sm font-montserrat"
                  />
                </div>

                {/* Role */}
                <div>
                  <label className="block text-sm font-montserrat font-medium text-black mb-2">Role</label>
                  <input
                    type="text"
                    value={accountForm.role}
                    onChange={(e) => setAccountForm({ ...accountForm, role: e.target.value })}
                    className="w-full px-4 py-2.5 border border-[#e6e6e6] rounded-lg bg-[#f6f6f6] text-sm font-montserrat"
                  />
                </div>

                {/* Department */}
                <div>
                  <label className="block text-sm font-montserrat font-medium text-black mb-2">Department</label>
                  <input
                    type="text"
                    value={accountForm.department}
                    onChange={(e) => setAccountForm({ ...accountForm, department: e.target.value })}
                    className="w-full px-4 py-2.5 border border-[#e6e6e6] rounded-lg bg-[#f6f6f6] text-sm font-montserrat"
                  />
                </div>
              </div>

              {/* Change Password */}
              <h2 className="text-lg md:text-xl font-montserrat font-semibold text-black mb-6 border-t border-[#e6e6e6] pt-6">Change Password</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
                {/* Old Password */}
                <div>
                  <label className="block text-sm font-montserrat font-medium text-black mb-2">Old Password</label>
                  <input
                    type="password"
                    value={accountForm.oldPassword}
                    onChange={(e) => setAccountForm({ ...accountForm, oldPassword: e.target.value })}
                    className="w-full px-4 py-2.5 border border-[#e6e6e6] rounded-lg bg-[#f6f6f6] text-sm font-montserrat"
                  />
                </div>

                {/* New Password */}
                <div>
                  <label className="block text-sm font-montserrat font-medium text-black mb-2">New Password</label>
                  <input
                    type="password"
                    value={accountForm.newPassword}
                    onChange={(e) => setAccountForm({ ...accountForm, newPassword: e.target.value })}
                    className="w-full px-4 py-2.5 border border-[#e6e6e6] rounded-lg bg-[#f6f6f6] text-sm font-montserrat"
                  />
                </div>

                {/* Confirm New Password */}
                <div>
                  <label className="block text-sm font-montserrat font-medium text-black mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    value={accountForm.confirmPassword}
                    onChange={(e) => setAccountForm({ ...accountForm, confirmPassword: e.target.value })}
                    className="w-full px-4 py-2.5 border border-[#e6e6e6] rounded-lg bg-[#f6f6f6] text-sm font-montserrat"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleSaveAccount}
                  className="px-8 md:px-10 py-2.5 md:py-3 bg-black text-white rounded-lg font-montserrat font-semibold text-base hover:bg-gray-900 transition"
                >
                  Save Changes
                </button>
                <button className="px-6 md:px-8 py-2.5 md:py-3 text-gray-500 font-montserrat font-medium text-base hover:text-black">
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* SCHOOL INFORMATION TAB */}
          {activeTab === 'school' && (
            <div className="max-w-4xl">
              <h2 className="text-lg md:text-xl font-montserrat font-semibold text-black mb-6">School Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8">
                {/* School Name */}
                <div>
                  <label className="block text-sm font-montserrat font-medium text-black mb-2">School Name</label>
                  <input
                    type="text"
                    value={schoolForm.schoolName}
                    onChange={(e) => setSchoolForm({ ...schoolForm, schoolName: e.target.value })}
                    className="w-full px-4 py-2.5 border border-[#e6e6e6] rounded-lg bg-[#f6f6f6] text-sm font-montserrat"
                  />
                </div>

                {/* Program / Major */}
                <div>
                  <label className="block text-sm font-montserrat font-medium text-black mb-2">Program / Major</label>
                  <input
                    type="text"
                    value={schoolForm.program}
                    onChange={(e) => setSchoolForm({ ...schoolForm, program: e.target.value })}
                    className="w-full px-4 py-2.5 border border-[#e6e6e6] rounded-lg bg-[#f6f6f6] text-sm font-montserrat"
                  />
                </div>

                {/* Student ID */}
                <div>
                  <label className="block text-sm font-montserrat font-medium text-black mb-2">Student ID / Matric No.</label>
                  <input
                    type="text"
                    value={schoolForm.studentId}
                    onChange={(e) => setSchoolForm({ ...schoolForm, studentId: e.target.value })}
                    className="w-full px-4 py-2.5 border border-[#e6e6e6] rounded-lg bg-[#f6f6f6] text-sm font-montserrat"
                  />
                </div>

                {/* Level */}
                <div>
                  <label className="block text-sm font-montserrat font-medium text-black mb-2">Level</label>
                  <select
                    value={schoolForm.level}
                    onChange={(e) => setSchoolForm({ ...schoolForm, level: e.target.value })}
                    className="w-full px-4 py-2.5 border border-[#e6e6e6] rounded-lg bg-white text-sm font-montserrat"
                  >
                    <option value="100">100 Level</option>
                    <option value="200">200 Level</option>
                    <option value="300">300 Level</option>
                    <option value="400">400 Level</option>
                    <option value="500">500 Level</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Bio */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-montserrat font-medium text-black mb-2">Bio</label>
                  <textarea
                    value={schoolForm.bio}
                    onChange={(e) => setSchoolForm({ ...schoolForm, bio: e.target.value })}
                    className="w-full px-4 py-2.5 border border-[#e6e6e6] rounded-lg bg-white text-sm font-montserrat"
                    rows={4}
                    placeholder="Tell us a bit about yourself..."
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleSaveSchool}
                  className="px-8 md:px-10 py-2.5 md:py-3 bg-black text-white rounded-lg font-montserrat font-semibold text-base hover:bg-gray-900 transition"
                >
                  Save Changes
                </button>
                <button className="px-6 md:px-8 py-2.5 md:py-3 text-gray-500 font-montserrat font-medium text-base hover:text-black">
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* NOTIFICATION PREFERENCE TAB */}
          {activeTab === 'notification' && (
            <div className="max-w-4xl">
              <h2 className="text-lg md:text-xl font-montserrat font-semibold text-black mb-6">Notification preferences</h2>

              {/* Notification Frequency */}
              <div className="mb-8 pb-8 border-b border-[#e6e6e6]">
                <h3 className="text-base md:text-lg font-montserrat font-medium text-black mb-1">Notification Frequency</h3>
                <p className="text-sm font-montserrat text-gray-500 mb-4">Choose how often you want to receive summaries.</p>

                <div className="relative w-full md:w-80">
                  <button
                    onClick={() => setShowFrequencyDropdown(!showFrequencyDropdown)}
                    className="w-full px-4 py-2.5 border border-[#e6e6e6] rounded-lg bg-[#f6f6f6] text-sm font-montserrat text-left flex items-center justify-between"
                  >
                    <span>{notificationSettings.notificationFrequency}</span>
                    <span className="text-gray-500">▼</span>
                  </button>

                  {showFrequencyDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#e6e6e6] rounded-lg shadow-lg z-20">
                      <button
                        onClick={() => {
                          setNotificationSettings({ ...notificationSettings, notificationFrequency: 'Daily' });
                          setShowFrequencyDropdown(false);
                        }}
                        className="block w-full text-left px-4 py-2.5 hover:bg-gray-50 font-montserrat text-sm border-b border-[#e6e6e6] last:border-0"
                      >
                        Daily
                      </button>
                      <button
                        onClick={() => {
                          setNotificationSettings({ ...notificationSettings, notificationFrequency: 'Weekly' });
                          setShowFrequencyDropdown(false);
                        }}
                        className="block w-full text-left px-4 py-2.5 hover:bg-gray-50 font-montserrat text-sm border-b border-[#e6e6e6] last:border-0"
                      >
                        Weekly
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Email Notifications & Toggles */}
              <div className="flex items-start justify-between mb-8 pb-8 border-b border-[#e6e6e6]">
                <div className="flex-1">
                  <h3 className="text-base md:text-lg font-montserrat font-medium text-black mb-1">Email Notifications</h3>
                  <p className="text-sm font-montserrat text-gray-500">Receive email alerts about your account and activities.</p>
                </div>
                <button
                  onClick={() => setNotificationSettings({ ...notificationSettings, emailNotifications: !notificationSettings.emailNotifications })}
                  className={`ml-4 relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notificationSettings.emailNotifications ? 'bg-black' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notificationSettings.emailNotifications ? 'translate-x-5' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Other Toggles */}
              <div className="flex items-start justify-between mb-8 pb-8 border-b border-[#e6e6e6]">
                <div className="flex-1">
                  <h3 className="text-base md:text-lg font-montserrat font-medium text-black mb-1">Goal Reminders</h3>
                  <p className="text-sm font-montserrat text-gray-500">Get reminders for your upcoming deadlines and goals.</p>
                </div>
                <button
                  onClick={() => setNotificationSettings({ ...notificationSettings, goalReminders: !notificationSettings.goalReminders })}
                  className={`ml-4 relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notificationSettings.goalReminders ? 'bg-black' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notificationSettings.goalReminders ? 'translate-x-5' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

               {/* Activity Updates */}
               <div className="flex items-start justify-between mb-8 pb-8 border-b border-[#e6e6e6]">
                <div className="flex-1">
                  <h3 className="text-base md:text-lg font-montserrat font-medium text-black mb-1">Activity Updates</h3>
                  <p className="text-sm font-montserrat text-gray-500">Stay informed about your progress and achievements.</p>
                </div>
                <button
                  onClick={() => setNotificationSettings({ ...notificationSettings, activityUpdates: !notificationSettings.activityUpdates })}
                  className={`ml-4 relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    notificationSettings.activityUpdates ? 'bg-black' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      notificationSettings.activityUpdates ? 'translate-x-5' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

            </div>
          )}
        </main>
      </div>
    </div>
  );
}
