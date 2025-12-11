'use client';

import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';


// Page icons (SVG Data URIs)

// Page icons (SVG Data URIs)
const iconSearch = "data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E";
const iconAdd = "data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M12 5v14M5 12h14' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E";
const iconUser = "data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E";
const iconMoreVertical = "data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='12' cy='12' r='1' fill='black'/%3E%3Ccircle cx='12' cy='5' r='1' fill='black'/%3E%3Ccircle cx='12' cy='19' r='1' fill='black'/%3E%3C/svg%3E";

interface Goal {
  id: string;
  name: string;
  category: string;
  priority: 'High' | 'Medium' | 'Low';
  daysRemaining: number;
  status: 'In Progress' | 'Completed' | 'Overdue';
  targetValue?: string;
  startDate?: string;
  targetDate?: string;
  motivation?: string;
  milestones?: string;
}

// Sample goals data
const goalsData: Goal[] = [
  {
    id: '1',
    name: 'Read 24 Books',
    category: 'Personal Development',
    priority: 'High',
    daysRemaining: 180,
    status: 'In Progress',
    targetValue: '24 Books',
    startDate: '2024-01-01',
    targetDate: '2024-12-31',
    motivation: 'Expand knowledge base',
  },
  { id: '2', name: 'Run a Marathon', category: 'Health & Fitness', priority: 'High', daysRemaining: 45, status: 'In Progress', targetValue: '42.2 km', startDate: '2024-03-01', targetDate: '2024-08-15' },
  { id: '3', name: 'Learn Spanish', category: 'Education', priority: 'Medium', daysRemaining: 365, status: 'In Progress', targetValue: 'B2 Level', startDate: '2024-01-01', targetDate: '2024-12-31' },
  { id: '4', name: 'Save $10,000', category: 'Finance', priority: 'High', daysRemaining: 200, status: 'In Progress', targetValue: '$10,000', startDate: '2024-01-01', targetDate: '2024-12-31' },
  { id: '5', name: 'Complete React Course', category: 'Career', priority: 'Medium', daysRemaining: 0, status: 'Overdue', targetValue: '100% Completion', startDate: '2024-05-01', targetDate: '2024-06-01' },
  { id: '6', name: 'Meditation Habit', category: 'Wellness', priority: 'Low', daysRemaining: 30, status: 'Completed', targetValue: '30 Days Streak', startDate: '2024-01-01', targetDate: '2024-02-01' },
];

type Modal = 'add' | 'edit' | 'view' | 'delete' | 'createOwner' | 'createType' | null;

interface FormData {
  goalType: string;
  targetValue: string;
  startDate: string;
  targetDate: string;
  category: string;
  motivation: string;
  milestones: string;
  priority: 'High' | 'Medium' | 'Low';
  additionalNotes: string;
}

export default function GoalsPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [activeModal, setActiveModal] = useState<Modal>(null);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [, setToastType] = useState<'success' | 'error'>('success');
  const [showActionMenu, setShowActionMenu] = useState<string | null>(null);

  const [formData, setFormData] = useState<FormData>({
    goalType: '',
    targetValue: '',
    startDate: '',
    targetDate: '',
    category: '',
    motivation: '',
    milestones: '',
    priority: 'Medium',
    additionalNotes: '',
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



  const filteredGoals = goalsData.filter(goal => {
    const matchesSearch = goal.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All Status' || goal.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const openModal = (modal: Modal, goal?: Goal) => {
    setActiveModal(modal);
    if (goal) {
      setSelectedGoal(goal);
      if (modal === 'edit') {
        setFormData({
          goalType: goal.name,
          targetValue: goal.targetValue || '',
          startDate: goal.startDate || '',
          targetDate: goal.targetDate || '',
          category: goal.category,
          motivation: goal.motivation || '',
          milestones: goal.milestones || '',
          priority: goal.priority,
          additionalNotes: '',
        });
      }
    }
  };

  const closeModal = () => {
    setActiveModal(null);
    setSelectedGoal(null);
    setShowActionMenu(null);
    setFormData({
      goalType: '',
      targetValue: '',
      startDate: '',
      targetDate: '',
      category: '',
      motivation: '',
      milestones: '',
      priority: 'Medium',
      additionalNotes: '',
    });
  };

  const showSuccessToast = (message: string) => {
    setToastMessage(message);
    setToastType('success');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleSaveCredential = () => {
    showSuccessToast('Credential saved successfully');
    closeModal();
  };

  const handleDeleteCredential = () => {
    showSuccessToast('Credential deleted successfully');
    closeModal();
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* SIDEBAR */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* MAIN CONTENT */}
      <div className="flex-1 md:ml-80 w-full">
        {/* HEADER */}
        <Header title="Goal Management" onMenuClick={() => setSidebarOpen(true)} />

        {/* PAGE CONTENT */}
        <main className="p-4 md:p-10">
          {/* Search and Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start md:items-center justify-between mb-6 md:mb-8 flex-wrap">
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              {/* Search Input */}
              <div className="bg-white border border-[#e6e6e6] rounded-lg px-4 md:px-6 py-3 md:py-4 flex items-center gap-4 w-full md:w-80">
                <img src={iconSearch} alt="Search" className="w-6 md:w-8 h-6 md:h-8" />
                <input
                  type="text"
                  placeholder="Search for credentials"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 font-montserrat text-base text-gray-700 placeholder-gray-500 focus:outline-none"
                />
              </div>

              {/* Status Filter */}
              <div className="relative w-full md:w-auto">
                <button
                  onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                  className="bg-white border border-[#e6e6e6] rounded-lg px-4 md:px-6 py-3 md:py-4 flex items-center gap-3 w-full md:w-auto font-montserrat text-base text-black"
                >
                  {statusFilter}
                  <span>▼</span>
                </button>

                {showStatusDropdown && (
                  <div className="absolute top-full mt-2 w-full md:w-48 bg-white border border-[#e6e6e6] rounded-lg shadow-lg z-10">
                    {['All Status', 'In Progress', 'Completed', 'Overdue'].map((status) => (
                      <button
                        key={status}
                        onClick={() => {
                          setStatusFilter(status);
                          setShowStatusDropdown(false);
                        }}
                        className={`block w-full text-left px-4 md:px-6 py-2 md:py-3 text-sm ${
                          statusFilter === status ? 'bg-gray-100 font-semibold' : 'hover:bg-gray-50'
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Add New Credentials Button */}
            <button
              onClick={() => openModal('add')}
              className="bg-black text-white flex items-center gap-3 px-6 md:px-12 py-3 md:py-4 rounded-xl font-montserrat font-medium text-base hover:bg-gray-900 transition whitespace-nowrap"
            >
              <img src={iconAdd} alt="Add" className="w-5 md:w-6 h-5 md:h-6" />
              <span>Set New Goal</span>
            </button>
          </div>

          {/* Credentials Table */}
          <div className="bg-white border-2 border-[rgba(0,0,0,0.2)] rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#f1f1f1] border-b border-[#e6e6e6]">
                    <th className="px-4 md:px-6 py-4 md:py-5 text-left">
                      <div className="flex items-center gap-2">
                        <p className="font-montserrat font-normal text-lg md:text-xl text-black">Goal Name</p>
                      </div>
                    </th>
                    <th className="px-4 md:px-6 py-4 md:py-5 text-left">
                      <div className="flex items-center gap-2">
                        <p className="font-montserrat font-normal text-lg md:text-xl text-black">Category & Priority</p>
                      </div>
                    </th>
                    <th className="px-4 md:px-6 py-4 md:py-5 text-left">
                      <p className="font-montserrat font-normal text-lg md:text-xl text-black">Target Value</p>
                    </th>
                    <th className="px-4 md:px-6 py-4 md:py-5 text-left">
                      <p className="font-geist font-normal text-lg md:text-xl text-black">Status</p>
                    </th>
                    <th className="px-4 md:px-6 py-4 md:py-5 text-center">
                      <p className="font-montserrat font-medium text-lg md:text-xl text-black">Actions</p>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredGoals.map((goal) => (
                    <tr key={goal.id} className="border-b border-[#e6e6e6] hover:bg-gray-50 transition">
                      <td className="px-4 md:px-6 py-4 md:py-5">
                        <p className="font-montserrat font-medium text-base md:text-lg text-black">{goal.name}</p>
                        <p className="text-sm text-gray-500">{goal.daysRemaining} days left</p>
                      </td>
                      <td className="px-4 md:px-6 py-4 md:py-5">
                        <div className="flex items-center gap-3">
                          <img src={iconUser} alt="User" className="w-8 md:w-9 h-8 md:h-9" />
                          <div className="font-montserrat font-normal text-base md:text-lg text-black">
                            <p>{goal.category}</p>
                            <p className="text-sm text-gray-600">({goal.priority})</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 md:px-6 py-4 md:py-5 text-center">
                        <p className="font-geist font-normal text-base md:text-lg text-black">{goal.targetValue}</p>
                      </td>
                      <td className="px-4 md:px-6 py-4 md:py-5">
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-montserrat font-medium text-sm md:text-base ${
                          goal.status === 'Completed'
                            ? 'bg-[#f1fef1] text-[#006500]'
                            : goal.status === 'Overdue' ? 'bg-[#ffdddd] text-[#a30000]' : 'bg-blue-50 text-blue-700'
                        }`}>
                          <div className={`w-3 h-3 rounded-full ${goal.status === 'Completed' ? 'bg-[#006500]' : goal.status === 'Overdue' ? 'bg-[#a30000]' : 'bg-blue-700'}`}></div>
                          {goal.status}
                        </div>
                      </td>
                      <td className="px-4 md:px-6 py-4 md:py-5 text-center relative">
                        <button
                          onClick={() => setShowActionMenu(showActionMenu === goal.id ? null : goal.id)}
                          className="hover:opacity-70 transition"
                        >
                          <img src={iconMoreVertical} alt="Actions" className="w-6 md:w-8 h-6 md:h-8 mx-auto" />
                        </button>

                        {showActionMenu === goal.id && (
                          <div className="absolute right-0 top-full mt-2 w-40 bg-white border border-[#e6e6e6] rounded-lg shadow-lg z-20">
                            <button
                              onClick={() => {
                                openModal('view', goal);
                                setShowActionMenu(null);
                              }}
                              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 font-montserrat"
                            >
                              👁️ View Details
                            </button>
                            <button
                              onClick={() => {
                                openModal('edit', goal);
                                setShowActionMenu(null);
                              }}
                              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-50 border-t border-[#e6e6e6] font-montserrat"
                            >
                              ✎ Edit
                            </button>
                            <button
                              onClick={() => {
                                openModal('delete', goal);
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
            </div>

            {/* Pagination Footer */}
            <div className="bg-white border-t border-[#e6e6e6] px-4 md:px-6 py-3 md:py-4 flex items-center justify-between flex-wrap gap-4">
              <p className="font-montserrat font-semibold text-sm md:text-base text-gray-700">
                {filteredGoals.length} results
              </p>
              <div className="flex items-center gap-4">
                <p className="font-montserrat font-medium text-sm md:text-base text-gray-700">
                  1-2 of 2 entries
                </p>
              </div>
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

      {/* Add New Credentials Modal */}
      {/* Add New Goal Modal */}
      {activeModal === 'add' && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-unbounded font-semibold text-black mb-6">Set New Goal</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {/* Goal Name */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-montserrat font-medium text-black mb-2">
                    Goal Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Read 24 Books"
                    value={formData.goalType}
                    onChange={(e) => setFormData({ ...formData, goalType: e.target.value })}
                    className="w-full px-4 py-2 border border-[#e6e6e6] rounded-lg text-sm font-montserrat"
                  />
                </div>

                {/* Target Value */}
                <div>
                  <label className="block text-sm font-montserrat font-medium text-black mb-2">
                    Target Value
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 24 Books / 10kg"
                    value={formData.targetValue}
                    onChange={(e) => setFormData({ ...formData, targetValue: e.target.value })}
                    className="w-full px-4 py-2 border border-[#e6e6e6] rounded-lg text-sm font-montserrat"
                  />
                </div>

                {/* Priority */}
                <div>
                  <label className="block text-sm font-montserrat font-medium text-black mb-2">
                    Priority
                  </label>
                  <select 
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                    className="w-full px-4 py-2 border border-[#e6e6e6] rounded-lg text-sm font-montserrat bg-white"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                {/* Start Date */}
                <div>
                  <label className="block text-sm font-montserrat font-medium text-black mb-2">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-4 py-2 border border-[#e6e6e6] rounded-lg text-sm font-montserrat"
                  />
                </div>

                {/* Target Date */}
                <div>
                  <label className="block text-sm font-montserrat font-medium text-black mb-2">
                    Target Date *
                  </label>
                  <input
                    type="date"
                    value={formData.targetDate}
                    onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
                    className="w-full px-4 py-2 border border-[#e6e6e6] rounded-lg text-sm font-montserrat"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-montserrat font-medium text-black mb-2">
                    Category
                  </label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 border border-[#e6e6e6] rounded-lg text-sm font-montserrat bg-white"
                  >
                    <option value="">Select Category</option>
                    <option value="Personal Development">Personal Development</option>
                    <option value="Health & Fitness">Health & Fitness</option>
                    <option value="Finance">Finance</option>
                    <option value="Career">Career</option>
                    <option value="Education">Education</option>
                  </select>
                </div>

                {/* Motivation */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-montserrat font-medium text-black mb-2">
                    Why is this important? (Motivation)
                  </label>
                  <textarea
                    value={formData.motivation}
                    onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                    className="w-full px-4 py-2 border border-[#e6e6e6] rounded-lg text-sm font-montserrat"
                    rows={2}
                    placeholder="This goal matters because..."
                  />
                </div>

                {/* Additional Notes / Milestones */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-montserrat font-medium text-black mb-2">
                    Milestones / Notes
                  </label>
                  <textarea
                    value={formData.additionalNotes}
                    onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                    className="w-full px-4 py-2 border border-[#e6e6e6] rounded-lg text-sm font-montserrat"
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex gap-3 justify-end mt-6">
                <button
                  onClick={closeModal}
                  className="px-6 py-2 border border-[#e6e6e6] rounded-lg text-sm font-montserrat font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveCredential}
                  className="px-6 py-2 bg-black text-white rounded-lg text-sm font-montserrat font-medium hover:bg-gray-900 transition"
                >
                  Save Goal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Credentials Modal */}
      {/* Edit Goal Modal */}
      {activeModal === 'edit' && selectedGoal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-unbounded font-semibold text-black mb-6">Edit Goal</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {/* Goal Name */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-montserrat font-medium text-black mb-2">
                    Goal Name *
                  </label>
                  <input
                    type="text"
                    value={formData.goalType}
                    onChange={(e) => setFormData({ ...formData, goalType: e.target.value })}
                    className="w-full px-4 py-2 border border-[#e6e6e6] rounded-lg text-sm font-montserrat"
                  />
                </div>

                {/* Target Value */}
                <div>
                  <label className="block text-sm font-montserrat font-medium text-black mb-2">
                    Target Value
                  </label>
                  <input
                    type="text"
                    value={formData.targetValue}
                    onChange={(e) => setFormData({ ...formData, targetValue: e.target.value })}
                    className="w-full px-4 py-2 border border-[#e6e6e6] rounded-lg text-sm font-montserrat"
                  />
                </div>

                {/* Priority */}
                <div>
                  <label className="block text-sm font-montserrat font-medium text-black mb-2">
                    Priority
                  </label>
                  <select 
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                    className="w-full px-4 py-2 border border-[#e6e6e6] rounded-lg text-sm font-montserrat bg-white"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                {/* Start Date */}
                <div>
                  <label className="block text-sm font-montserrat font-medium text-black mb-2">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-4 py-2 border border-[#e6e6e6] rounded-lg text-sm font-montserrat"
                  />
                </div>

                {/* Target Date */}
                <div>
                  <label className="block text-sm font-montserrat font-medium text-black mb-2">
                    Target Date *
                  </label>
                  <input
                    type="date"
                    value={formData.targetDate}
                    onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
                    className="w-full px-4 py-2 border border-[#e6e6e6] rounded-lg text-sm font-montserrat"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-montserrat font-medium text-black mb-2">
                    Category
                  </label>
                  <select 
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 border border-[#e6e6e6] rounded-lg text-sm font-montserrat bg-white"
                  >
                    <option value="">Select Category</option>
                    <option value="Personal Development">Personal Development</option>
                    <option value="Health & Fitness">Health & Fitness</option>
                    <option value="Finance">Finance</option>
                    <option value="Career">Career</option>
                    <option value="Education">Education</option>
                  </select>
                </div>

                {/* Motivation */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-montserrat font-medium text-black mb-2">
                    Why is this important? (Motivation)
                  </label>
                  <textarea
                    value={formData.motivation}
                    onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                    className="w-full px-4 py-2 border border-[#e6e6e6] rounded-lg text-sm font-montserrat"
                    rows={2}
                  />
                </div>

                {/* Additional Notes / Milestones */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-montserrat font-medium text-black mb-2">
                    Milestones / Notes
                  </label>
                  <textarea
                    value={formData.additionalNotes}
                    onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                    className="w-full px-4 py-2 border border-[#e6e6e6] rounded-lg text-sm font-montserrat"
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex gap-3 justify-end mt-6">
                <button
                  onClick={closeModal}
                  className="px-6 py-2 border border-[#e6e6e6] rounded-lg text-sm font-montserrat font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveCredential}
                  className="px-6 py-2 bg-black text-white rounded-lg text-sm font-montserrat font-medium hover:bg-gray-900 transition"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Goal Details Modal */}
      {activeModal === 'view' && selectedGoal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 md:p-8">
              <button
                onClick={closeModal}
                className="text-black font-montserrat font-semibold mb-4 flex items-center gap-1 hover:opacity-70"
              >
                ← Back
              </button>

              <h2 className="text-2xl font-unbounded font-semibold text-black mb-2">
                {selectedGoal.name}
              </h2>
              <div className="flex gap-3 mb-6">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  selectedGoal.priority === 'High' ? 'bg-red-100 text-red-700' :
                  selectedGoal.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {selectedGoal.priority} Priority
                </span>
                <span className="inline-block px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm font-medium">
                  {selectedGoal.category}
                </span>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                   selectedGoal.status === 'Completed' ? 'bg-green-50 text-green-700' :
                   selectedGoal.status === 'Overdue' ? 'bg-red-50 text-red-700' :
                   'bg-blue-50 text-blue-700'
                }`}>
                  {selectedGoal.status}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs font-montserrat font-semibold text-gray-500 mb-1 uppercase tracking-wider">Target Value</p>
                  <p className="text-lg font-montserrat font-medium text-black">{selectedGoal.targetValue || 'N/A'}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                   <p className="text-xs font-montserrat font-semibold text-gray-500 mb-1 uppercase tracking-wider">Days Remaining</p>
                   <p className="text-lg font-montserrat font-medium text-black">{selectedGoal.daysRemaining} Days</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                   <p className="text-xs font-montserrat font-semibold text-gray-500 mb-1 uppercase tracking-wider">Start Date</p>
                   <p className="text-lg font-montserrat font-medium text-black">{selectedGoal.startDate}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                   <p className="text-xs font-montserrat font-semibold text-gray-500 mb-1 uppercase tracking-wider">Target Date</p>
                   <p className="text-lg font-montserrat font-medium text-black">{selectedGoal.targetDate}</p>
                </div>
              </div>

              {selectedGoal.motivation && (
                <div className="mb-6">
                  <p className="text-xs font-montserrat font-semibold text-gray-500 mb-2 uppercase tracking-wider">Motivation</p>
                  <div className="p-4 bg-yellow-50 border border-yellow-100 rounded-lg text-gray-800 italic">
                    "{selectedGoal.motivation}"
                  </div>
                </div>
              )}

              {selectedGoal.milestones && (
                <div className="mb-6">
                  <p className="text-xs font-montserrat font-semibold text-gray-500 mb-2 uppercase tracking-wider">Milestones / Notes</p>
                  <p className="text-sm font-montserrat text-gray-700 whitespace-pre-wrap">{selectedGoal.milestones}</p>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
                <button
                  onClick={closeModal}
                  className="px-6 py-2 border border-[#e6e6e6] rounded-lg text-sm font-montserrat font-medium hover:bg-gray-50"
                >
                  Close
                </button>
                <button 
                  onClick={() => openModal('edit', selectedGoal)}
                  className="px-6 py-2 bg-black text-white rounded-lg text-sm font-montserrat font-medium hover:bg-gray-900"
                >
                  Edit Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {activeModal === 'delete' && selectedGoal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-8 max-w-sm text-center">
            <h2 className="text-xl font-montserrat font-semibold text-black mb-4">Delete this goal?</h2>
            <p className="text-gray-500 mb-6 text-sm">This action cannot be undone.</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={closeModal}
                className="px-6 py-2 border border-[#e6e6e6] rounded-lg text-sm font-montserrat font-medium"
              >
                No
              </button>
              <button
                onClick={handleDeleteCredential}
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
