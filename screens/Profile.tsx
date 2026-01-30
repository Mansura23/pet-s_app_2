
import React from 'react';

interface ProfileProps {
  user: { name: string; email: string };
  petCount: number;
  onLogout: () => void;
  onBack: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, petCount, onLogout, onBack }) => {
  return (
    <div className="p-6 bg-[#F0FDF4] min-h-full">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="bg-white w-10 h-10 rounded-xl shadow-sm flex items-center justify-center text-emerald-500">
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <h1 className="text-2xl font-bold text-[#064E3B]">User Profile</h1>
      </div>

      <div className="flex flex-col items-center mb-8">
        <div className="w-28 h-28 bg-white p-1 rounded-full shadow-lg mb-4 relative">
          <img 
            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} 
            alt="User avatar" 
            className="w-full h-full rounded-full bg-emerald-50"
          />
          <div className="absolute bottom-0 right-0 bg-emerald-500 text-white p-2 rounded-full border-4 border-[#F0FDF4]">
            <i className="fa-solid fa-camera text-xs"></i>
          </div>
        </div>
        <h2 className="text-xl font-bold text-[#064E3B]">{user.name}</h2>
        <p className="text-sm text-emerald-600 font-medium">{user.email}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-emerald-50">
          <p className="text-[10px] text-emerald-800/40 font-bold uppercase tracking-widest mb-1">Total Pets</p>
          <p className="text-2xl font-bold text-[#10B981]">{petCount}</p>
        </div>
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-emerald-50">
          <p className="text-[10px] text-emerald-800/40 font-bold uppercase tracking-widest mb-1">Status</p>
          <p className="text-sm font-bold text-[#064E3B]">Pro Member</p>
          <div className="h-1 bg-emerald-100 rounded-full mt-2">
            <div className="h-full bg-emerald-500 w-2/3 rounded-full"></div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {[
          { icon: 'fa-paw', label: 'My Pets Settings', color: 'text-emerald-500' },
          { icon: 'fa-bell', label: 'Notification Settings', color: 'text-emerald-500' },
          { icon: 'fa-shield-halved', label: 'Privacy & Security', color: 'text-emerald-500' },
          { icon: 'fa-circle-question', label: 'Help Center', color: 'text-emerald-500' }
        ].map((item, idx) => (
          <button key={idx} className="bg-white p-5 rounded-3xl shadow-sm flex items-center justify-between border border-emerald-50 group active:bg-emerald-50 transition-colors">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center ${item.color}`}>
                <i className={`fa-solid ${item.icon}`}></i>
              </div>
              <span className="text-sm font-bold text-[#064E3B]">{item.label}</span>
            </div>
            <i className="fa-solid fa-chevron-right text-emerald-200 group-hover:text-emerald-400 transition-colors"></i>
          </button>
        ))}
      </div>

      <button 
        onClick={onLogout}
        className="w-full mt-8 bg-white border-2 border-red-50 text-red-500 py-5 rounded-[2rem] font-bold shadow-sm active:bg-red-50 transition-colors flex items-center justify-center gap-2"
      >
        <i className="fa-solid fa-right-from-bracket"></i>
        Sign Out
      </button>

      <p className="text-center mt-8 text-[10px] text-emerald-800/30 font-bold uppercase tracking-widest">
        PawsGuard v2.0.26
      </p>
    </div>
  );
};

export default Profile;
