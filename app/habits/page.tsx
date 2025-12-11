'use client';

import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

// Icons as SVG Data URIs
const iconSearch = "data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z' fill='%23666666'/%3E%3C/svg%3E";
const iconAdd = "data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z' fill='white'/%3E%3C/svg%3E";
const iconMoreVertical = "data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4C10.9 4 10 4.9 10 6C10 7.1 10.9 8 12 8ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10ZM12 16C10.9 16 10 16.9 10 18C10 19.1 10.9 20 12 20C13.1 20 14 19.1 14 18C14 16.9 13.1 16 12 16Z' fill='%23666666'/%3E%3C/svg%3E";

interface Habit {
  id: string;
  name: string;
  frequency: 'Daily' | 'Weekly' | 'Monthly';
  timeOfDay: 'Morning' | 'Afternoon' | 'Evening' | 'Anytime';
  streak: number;
  status: 'Active' | 'Paused' | 'Completed';
  lastCompleted?: string;
  motivation?: string;
}

const habitsData: Habit[] = [
  {
    id: '1',
    name: 'Morning Meditation',
    frequency: 'Daily',
    timeOfDay: 'Morning',
    streak: 12,
    status: 'Active',
    lastCompleted: '2025-05-15',
    motivation: 'Start the day with a clear mind.'
  },
  {
    id: '2',
    name: 'Drink 2L Water',
    frequency: 'Daily',
    timeOfDay: 'Anytime',
    streak: 5,
    status: 'Active',
    lastCompleted: '2025-05-15',
    motivation: 'Stay hydrated for energy.'
  },
  {
    id: '3',
    name: 'Read 30 Mins',
    frequency: 'Daily',
    timeOfDay: 'Evening',
    streak: 45,
    status: 'Active',
    lastCompleted: '2025-05-14',
    motivation: 'Continuous learning and relaxation.'
  },
  {
    id: '4',
    name: 'Weekly Review',
    frequency: 'Weekly',
    timeOfDay: 'Evening',
    streak: 4,
    status: 'Active',
    lastCompleted: '2025-05-11',
    motivation: 'Reflect on progress and plan ahead.'
  },
  {
    id: '5',
    name: 'Gym Workout',
    frequency: 'Daily',
    timeOfDay: 'Morning',
    streak: 0,
    status: 'Paused',
    lastCompleted: '2025-05-10',
    motivation: 'Physical strength and health.'
  },
];

type Modal = 'add' | 'edit' | 'delete' | 'view' | null;

interface FormData {
  name: string;
  frequency: string;
  timeOfDay: string;
  motivation: string;
  status: string;
}

export default function HabitsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModal, setActiveModal] = useState<Modal>(null);
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    frequency: 'Daily',
    timeOfDay: 'Morning',
    motivation: '',
    status: 'Active'
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

  const filteredHabits = habitsData.filter(habit =>
    habit.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openModal = (modal: Modal, habit?: Habit) => {
    setActiveModal(modal);
    if (habit) {
      setSelectedHabit(habit);
      if (modal === 'edit' || modal === 'view') {
        setFormData({
          name: habit.name,
          frequency: habit.frequency,
          timeOfDay: habit.timeOfDay,
          motivation: habit.motivation || '',
          status: habit.status
        });
      }
    } else if (modal === 'add') {
      setFormData({
        name: '',
        frequency: 'Daily',
        timeOfDay: 'Morning',
        motivation: '',
        status: 'Active'
      });
    }
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedHabit(null);
    setShowActionMenu(null);
  };

  const showSuccessToast = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleSaveHabit = () => {
    showSuccessToast(activeModal === 'add' ? 'New habit created successfully' : 'Habit updated successfully');
    closeModal();
  };

  const handleDeleteHabit = () => {
    showSuccessToast('Habit deleted successfully');
    closeModal();
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* SIDEBAR */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* MAIN CONTENT */}
      <div className="flex-1 md:ml-80 w-full">
        {/* HEADER */}
        <Header title="Habit Tracker" onMenuClick={() => setSidebarOpen(true)} />

        {/* PAGE CONTENT */}
        <main className="p-4 md:p-10">
          {/* Search and Add Button */}
          <div className="flex flex-col md:flex-row gap-4 mb-6 md:mb-8 items-start md:items-center justify-between flex-wrap">
            <div className="bg-white border border-[#e6e6e6] rounded-lg px-4 md:px-6 py-3 md:py-4 flex items-center gap-4 w-full md:w-80">
              <img src={iconSearch} alt="Search" className="w-6 md:w-8 h-6 md:h-8" />
              <input
                type="text"
                placeholder="Search habits..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 font-montserrat text-base text-gray-700 placeholder-gray-500 focus:outline-none"
              />
            </div>

            <button
              onClick={() => openModal('add')}
              className="bg-black text-white flex items-center gap-3 px-6 md:px-12 py-3 md:py-4 rounded-xl font-montserrat font-medium text-base hover:bg-gray-900 transition whitespace-nowrap"
            >
              <img src={iconAdd} alt="Add" className="w-5 md:w-6 h-5 md:h-6" />
              <span>Add New Habit</span>
            </button>
          </div>

          {/* Habits Table */}
          <div className="bg-white border-2 border-[rgba(0,0,0,0.2)] rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#f1f1f1] border-b border-[#e6e6e6]">
                    <th className="px-4 md:px-6 py-4 md:py-5 text-left">
                      <p className="font-montserrat font-normal text-lg md:text-xl text-black">Habit Name</p>
                    </th>
                    <th className="px-4 md:px-6 py-4 md:py-5 text-left">
                      <p className="font-montserrat font-normal text-lg md:text-xl text-black">Frequency</p>
                    </th>
                    <th className="px-4 md:px-6 py-4 md:py-5 text-left">
                      <p className="font-montserrat font-normal text-lg md:text-xl text-black">Time of Day</p>
                    </th>
                    <th className="px-4 md:px-6 py-4 md:py-5 text-left">
                      <p className="font-montserrat font-normal text-lg md:text-xl text-black">Streak 🔥</p>
                    </th>
                    <th className="px-4 md:px-6 py-4 md:py-5 text-left">
                      <p className="font-montserrat font-normal text-lg md:text-xl text-black">Status</p>
                    </th>
                    <th className="px-4 md:px-6 py-4 md:py-5 text-center">
                      <p className="font-montserrat font-medium text-lg md:text-xl text-black">Actions</p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredHabits.map((habit) => (
                    <tr key={habit.id} className="border-b border-[#e6e6e6] hover:bg-gray-50 transition">
                      <td className="px-4 md:px-6 py-4 md:py-5">
                        <p className="font-montserrat font-medium text-base md:text-lg text-black">
                          {habit.name}
                        </p>
                      </td>
                      <td className="px-4 md:px-6 py-4 md:py-5">
                        <div className="inline-block px-3 py-1 bg-gray-100 rounded-full font-montserrat text-sm text-black">
                          {habit.frequency}
                        </div>
                      </td>
                      <td className="px-4 md:px-6 py-4 md:py-5">
                        <p className="font-montserrat font-normal text-base md:text-lg text-black">{habit.timeOfDay}</p>
                      </td>
                      <td className="px-4 md:px-6 py-4 md:py-5">
                        <p className="font-montserrat font-bold text-base md:text-lg text-orange-600">
                          {habit.streak} Days
                        </p>
                      </td>
                      <td className="px-4 md:px-6 py-4 md:py-5">
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                          habit.status === 'Active' ? 'bg-green-100 text-green-700' : 
                          habit.status === 'Paused' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'
                        }`}>
                          {habit.status}
                        </span>
                      </td>
                      <td className="px-4 md:px-6 py-4 md:py-5 text-center relative">
                        <button
                          onClick={() => setShowActionMenu(showActionMenu === habit.id ? null : habit.id)}
                          className="hover:opacity-70 transition p-2"
                        >
                          <img src={iconMoreVertical} alt="Actions" className="w-6 md:w-8 h-6 md:h-8 mx-auto" />
                        </button>

                        {showActionMenu === habit.id && (
                          <div className="absolute right-0 top-full mt-2 w-40 bg-white border border-[#e6e6e6] rounded-lg shadow-lg z-20 overflow-hidden">
                            <button
                              onClick={() => {
                                openModal('view', habit);
                                setShowActionMenu(null);
                              }}
                              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 font-montserrat"
                            >
                              👁 View Details
                            </button>
                            <button
                              onClick={() => {
                                openModal('edit', habit);
                                setShowActionMenu(null);
                              }}
                              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 font-montserrat"
                            >
                              ✎ Edit
                            </button>
                            <button
                              onClick={() => {
                                openModal('delete', habit);
                                setShowActionMenu(null);
                              }}
                              className="block w-full text-left px-4 py-2 text-sm text-[#a30000] hover:bg-red-50 border-t border-[#e6e6e6] font-montserrat"
                            >
                              🗑️ Delete
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredHabits.length === 0 && (
                 <div className="p-8 text-center text-gray-500 font-montserrat">
                   No habits found. Start by adding a new habit!
                 </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Toast Notifications */}
      {showToast && (
        <div className="fixed top-6 right-6 bg-[#d4f5d4] border border-[#36743D] text-[#36743D] px-4 py-3 rounded-lg flex items-center gap-3 shadow-lg z-50 max-w-sm">
          <span className="text-lg">✓</span>
          <div>
            <p className="font-montserrat font-semibold text-sm">Success</p>
            <p className="font-montserrat text-sm">{toastMessage}</p>
          </div>
          <button onClick={() => setShowToast(false)} className="ml-auto text-[#36743D] text-lg">
            ✕
          </button>
        </div>
      )}

      {/* MODALS */}

      {/* Add / Edit Habit Modal */}
      {(activeModal === 'add' || activeModal === 'edit') && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-unbounded font-semibold text-black mb-6">
                {activeModal === 'add' ? 'Start New Habit' : 'Edit Habit'}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                
                {/* Habit Name */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-montserrat font-medium text-black mb-2">Habit Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Morning Run, Read 10 Pages"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-[#e6e6e6] rounded-lg text-sm font-montserrat"
                  />
                </div>

                {/* Frequency */}
                <div>
                  <label className="block text-sm font-montserrat font-medium text-black mb-2">Frequency</label>
                  <select
                    value={formData.frequency}
                    onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                    className="w-full px-4 py-2 border border-[#e6e6e6] rounded-lg text-sm font-montserrat bg-white"
                  >
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                  </select>
                </div>

                {/* Time of Day */}
                <div>
                  <label className="block text-sm font-montserrat font-medium text-black mb-2">Preferred Time</label>
                  <select
                    value={formData.timeOfDay}
                    onChange={(e) => setFormData({ ...formData, timeOfDay: e.target.value })}
                    className="w-full px-4 py-2 border border-[#e6e6e6] rounded-lg text-sm font-montserrat bg-white"
                  >
                    <option value="Morning">Morning</option>
                    <option value="Afternoon">Afternoon</option>
                    <option value="Evening">Evening</option>
                    <option value="Anytime">Anytime</option>
                  </select>
                </div>

                {/* Motivation */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-montserrat font-medium text-black mb-2">Motivation (Why?)</label>
                  <textarea
                    value={formData.motivation}
                    onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                    className="w-full px-4 py-2 border border-[#e6e6e6] rounded-lg text-sm font-montserrat"
                    rows={3}
                    placeholder="I want to build this habit because..."
                  />
                </div>
                
                {/* Status (Edit only) */}
                {activeModal === 'edit' && (
                  <div>
                     <label className="block text-sm font-montserrat font-medium text-black mb-2">Status</label>
                     <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-4 py-2 border border-[#e6e6e6] rounded-lg text-sm font-montserrat bg-white"
                    >
                      <option value="Active">Active</option>
                      <option value="Paused">Paused</option>
                    </select>
                  </div>
                )}
              </div>

              <div className="flex gap-3 justify-end mt-6">
                <button
                  onClick={closeModal}
                  className="px-6 py-2 border border-[#e6e6e6] rounded-lg text-sm font-montserrat font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveHabit}
                  className="px-6 py-2 bg-black text-white rounded-lg text-sm font-montserrat font-medium hover:bg-gray-900 transition"
                >
                  {activeModal === 'add' ? 'Create Habit' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Habit Modal */}
      {activeModal === 'view' && selectedHabit && (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-unbounded font-semibold text-black mb-2">{selectedHabit.name}</h2>
              <div className="flex gap-2 mb-6">
                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-700">{selectedHabit.frequency}</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${selectedHabit.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                  {selectedHabit.status}
                </span>
                <span className="px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-sm font-medium">🔥 {selectedHabit.streak} Day Streak</span>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs font-montserrat uppercase font-semibold text-gray-500 mb-1">Time of Day</p>
                  <p className="text-lg font-montserrat text-black">{selectedHabit.timeOfDay}</p>
                </div>
                
                {selectedHabit.motivation && (
                  <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                    <p className="text-xs font-montserrat uppercase font-semibold text-gray-500 mb-1">Motivation</p>
                    <p className="text-base font-montserrat italic text-gray-800">"{selectedHabit.motivation}"</p>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3 mt-8">
                <button onClick={closeModal} className="px-6 py-2 border border-gray-200 rounded-lg text-sm font-montserrat font-medium">Close</button>
                <button 
                  onClick={() => openModal('edit', selectedHabit)}
                  className="px-6 py-2 bg-black text-white rounded-lg text-sm font-montserrat font-medium"
                >
                  Edit Habit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {activeModal === 'delete' && selectedHabit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-8 max-w-sm text-center">
            <h2 className="text-xl font-montserrat font-semibold text-black mb-4">Delete Habit?</h2>
            <p className="text-gray-500 mb-6 text-sm">Are you sure you want to delete <span className="font-bold text-black">{selectedHabit.name}</span>?</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={closeModal}
                className="px-6 py-2 border border-[#e6e6e6] rounded-lg text-sm font-montserrat font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteHabit}
                className="px-6 py-2 bg-red-600 text-white rounded-lg text-sm font-montserrat font-medium hover:bg-red-700 transition"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
