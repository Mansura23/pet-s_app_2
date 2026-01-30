
import React, { useState } from 'react';
import { Reminder } from '../types';

interface RemindersProps {
  reminders: Reminder[];
  onBack: () => void;
}

const Reminders: React.FC<RemindersProps> = ({ reminders, onBack }) => {
  const [activeTab, setActiveTab] = useState<'Upcoming' | 'Past'>('Upcoming');

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="bg-white w-10 h-10 rounded-xl shadow-sm flex items-center justify-center">
          <i className="fa-solid fa-chevron-left text-gray-400"></i>
        </button>
        <h1 className="text-2xl font-bold text-[#2D3142]">Schedule</h1>
      </div>

      {/* Tabs */}
      <div className="flex bg-white p-1 rounded-2xl shadow-sm mb-8">
        {(['Upcoming', 'Past'] as const).map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === tab ? 'bg-[#FF9933] text-white shadow-md' : 'text-gray-400'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="flex flex-col gap-4">
        {reminders.length > 0 ? (
          reminders.map(reminder => (
            <div key={reminder.id} className="bg-white p-5 rounded-3xl shadow-sm border-l-4 border-[#FF9933]">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-bold text-[#2D3142]">{reminder.title}</h4>
                  <p className="text-xs text-[#FF9933] font-semibold">{reminder.petName}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${reminder.type === 'feeding' ? 'bg-orange-50 text-orange-500' : 'bg-green-50 text-green-500'}`}>
                  {reminder.type}
                </div>
              </div>
              <div className="flex items-center gap-4 text-gray-400 text-xs mt-4">
                <div className="flex items-center gap-1">
                  <i className="fa-regular fa-clock"></i>
                  <span>{reminder.time}</span>
                </div>
                {reminder.date && (
                  <div className="flex items-center gap-1">
                    <i className="fa-regular fa-calendar"></i>
                    <span>{reminder.date}</span>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400">No upcoming reminders</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Reminders;
