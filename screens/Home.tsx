
import React from 'react';
import { Pet, Reminder } from '../types';

interface HomeProps {
  userName: string;
  pets: Pet[];
  reminders: Reminder[];
  onSelectPet: (id: string) => void;
  onAddPet: () => void;
}

const Home: React.FC<HomeProps> = ({ userName, pets, reminders, onSelectPet, onAddPet }) => {
  const todayReminders = reminders
    .filter(r => r.type === 'feeding' || (r.date === new Date().toISOString().split('T')[0]))
    .sort((a, b) => a.time.localeCompare(b.time));

  return (
    <div className="p-6 bg-[#F0FDF4] min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#064E3B]">Hello, {userName}</h1>
          <p className="text-emerald-700/60 text-sm font-medium">Your pets are doing great today!</p>
        </div>
        <button onClick={onAddPet} className="bg-white p-3 rounded-2xl shadow-sm text-[#10B981] active:scale-90 transition-transform">
          <i className="fa-solid fa-plus-circle text-2xl"></i>
        </button>
      </div>

      {/* Hero Widget: Quick Stats */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-emerald-500 p-5 rounded-[2rem] text-white shadow-lg shadow-emerald-100 relative overflow-hidden">
          <i className="fa-solid fa-bowl-food absolute -right-2 -bottom-2 text-6xl text-emerald-400/30 rotate-12"></i>
          <p className="text-[10px] font-bold uppercase tracking-widest opacity-80 mb-1">Next Feeding</p>
          <p className="text-xl font-bold">12:30 PM</p>
          <p className="text-[10px] mt-2 bg-white/20 inline-block px-2 py-0.5 rounded-full">3 pets left</p>
        </div>
        <div className="bg-white p-5 rounded-[2rem] shadow-sm border border-emerald-50">
          <p className="text-[10px] text-emerald-800/40 font-bold uppercase tracking-widest mb-1">Vaccines Due</p>
          <p className="text-xl font-bold text-[#064E3B]">Oct 15</p>
          <p className="text-[10px] mt-2 text-emerald-600 font-bold">Luna • Rabies</p>
        </div>
      </div>

      {/* Pet List */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-[#064E3B]">My Family</h3>
        </div>
        <div className="flex gap-4 overflow-x-auto hide-scrollbar py-2">
          {pets.map(pet => (
            <div 
              key={pet.id} 
              onClick={() => onSelectPet(pet.id)}
              className="flex flex-col items-center gap-2 flex-shrink-0 cursor-pointer group"
            >
              <div className="w-20 h-20 rounded-[2rem] p-1 border-2 border-transparent group-hover:border-[#10B981] transition-all">
                <img src={pet.imageUrl} alt={pet.name} className="w-full h-full object-cover rounded-[1.8rem]" />
              </div>
              <span className="text-xs font-bold text-[#064E3B]">{pet.name}</span>
            </div>
          ))}
          <button onClick={onAddPet} className="flex flex-col items-center gap-2 flex-shrink-0">
             <div className="w-20 h-20 rounded-[2rem] bg-emerald-50 border-2 border-dashed border-emerald-200 flex items-center justify-center text-emerald-300">
               <i className="fa-solid fa-plus"></i>
             </div>
             <span className="text-xs font-bold text-emerald-300">New</span>
          </button>
        </div>
      </div>

      {/* Schedule Feed & Vaccines */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-[#064E3B] mb-4">Daily Routine</h3>
        <div className="flex flex-col gap-4">
          {todayReminders.slice(0, 4).map(reminder => (
            <div key={reminder.id} className="bg-white p-5 rounded-3xl shadow-sm flex items-center gap-4 group active:scale-[0.98] transition-all">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl ${reminder.type === 'feeding' ? 'bg-orange-50 text-orange-400' : 'bg-emerald-50 text-emerald-500'}`}>
                <i className={`fa-solid ${reminder.type === 'feeding' ? 'fa-bowl-food' : 'fa-syringe'}`}></i>
              </div>
              <div className="flex-1">
                <p className="text-[10px] text-emerald-800/40 font-bold uppercase tracking-widest">{reminder.time}</p>
                <h4 className="text-sm font-bold text-[#064E3B]">{reminder.title}</h4>
                <p className="text-[10px] text-emerald-600 font-bold">{reminder.petName}</p>
              </div>
              <button className="w-8 h-8 rounded-full border-2 border-emerald-100 flex items-center justify-center group-hover:bg-[#10B981] group-hover:border-[#10B981] transition-all">
                <i className="fa-solid fa-check text-[10px] text-white"></i>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
