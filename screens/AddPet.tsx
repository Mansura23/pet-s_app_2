
import React, { useState } from 'react';
import { Pet, PetType } from '../types';

interface AddPetProps {
  onAdd: (pet: Pet) => void;
  onCancel: () => void;
}

const AddPet: React.FC<AddPetProps> = ({ onAdd, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: 'dog' as PetType,
    breed: '',
    age: '',
    weight: '',
    lastVaccination: '',
    vaccineType: 'Rabies',
    morning: '08:00',
    evening: '19:00'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPet: Pet = {
      id: Date.now().toString(),
      name: formData.name,
      type: formData.type,
      breed: formData.breed,
      age: Number(formData.age),
      weight: Number(formData.weight),
      lastVaccinationDate: formData.lastVaccination || new Date().toISOString().split('T')[0],
      vaccinationType: formData.vaccineType,
      feedingTimes: [formData.morning, formData.evening],
      imageUrl: `https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=400&h=400`
    };
    onAdd(newPet);
  };

  return (
    <div className="p-6 bg-[#F0FDF4] min-h-screen">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onCancel} className="bg-white w-10 h-10 rounded-xl shadow-sm flex items-center justify-center text-emerald-500">
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <h1 className="text-2xl font-bold text-[#064E3B]">New Pet Profile</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Main Info Card */}
        <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-emerald-50">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold text-emerald-800/40 uppercase tracking-widest ml-1">Pet Name</label>
              <input 
                required
                type="text" 
                placeholder="e.g. Buddy" 
                className="bg-emerald-50/50 text-black p-5 rounded-3xl outline-none border-none focus:ring-2 focus:ring-[#10B981] placeholder:text-emerald-200 font-bold"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-emerald-800/40 uppercase tracking-widest ml-1">Breed</label>
                <input 
                  required
                  type="text" 
                  placeholder="Husky" 
                  className="bg-emerald-50/50 text-black p-5 rounded-3xl outline-none border-none focus:ring-2 focus:ring-[#10B981] placeholder:text-emerald-200 font-bold"
                  value={formData.breed}
                  onChange={e => setFormData({...formData, breed: e.target.value})}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-emerald-800/40 uppercase tracking-widest ml-1">Type</label>
                <select 
                  className="bg-emerald-50/50 text-black p-5 rounded-3xl outline-none border-none font-bold"
                  value={formData.type}
                  onChange={e => setFormData({...formData, type: e.target.value as PetType})}
                >
                  <option value="dog">Dog 🐕</option>
                  <option value="cat">Cat 🐈</option>
                  <option value="bird">Bird 🦜</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Vital Stats Card - Prominent Age & Weight */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-emerald-50 flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500">
              <i className="fa-solid fa-calendar-days text-xl"></i>
            </div>
            <label className="text-[10px] font-bold text-emerald-800/40 uppercase tracking-widest">Age (Years)</label>
            <input 
              required
              type="number" 
              placeholder="0"
              className="w-full text-center text-xl font-bold bg-transparent outline-none text-[#064E3B]"
              value={formData.age}
              onChange={e => setFormData({...formData, age: e.target.value})}
            />
          </div>
          <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-emerald-50 flex flex-col items-center gap-2">
            <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500">
              <i className="fa-solid fa-weight-scale text-xl"></i>
            </div>
            <label className="text-[10px] font-bold text-emerald-800/40 uppercase tracking-widest">Weight (kg)</label>
            <input 
              required
              type="number" 
              placeholder="0"
              className="w-full text-center text-xl font-bold bg-transparent outline-none text-[#064E3B]"
              value={formData.weight}
              onChange={e => setFormData({...formData, weight: e.target.value})}
            />
          </div>
        </div>

        {/* Schedule & Health Action Card */}
        <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-emerald-50 flex flex-col gap-6">
          <div>
            <h3 className="text-sm font-bold text-[#064E3B] mb-4 flex items-center gap-2">
              <i className="fa-solid fa-clock-rotate-left text-[#10B981]"></i> Feeding & Vaccination
            </h3>
            
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between p-4 bg-emerald-50/50 rounded-3xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-500">
                    <i className="fa-solid fa-sun"></i>
                  </div>
                  <span className="text-xs font-bold text-[#064E3B]">Morning Feed</span>
                </div>
                <input 
                  type="time" 
                  className="bg-transparent text-sm font-bold text-[#064E3B] outline-none"
                  value={formData.morning}
                  onChange={e => setFormData({...formData, morning: e.target.value})}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-emerald-50/50 rounded-3xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-500">
                    <i className="fa-solid fa-moon"></i>
                  </div>
                  <span className="text-xs font-bold text-[#064E3B]">Evening Feed</span>
                </div>
                <input 
                  type="time" 
                  className="bg-transparent text-sm font-bold text-[#064E3B] outline-none"
                  value={formData.evening}
                  onChange={e => setFormData({...formData, evening: e.target.value})}
                />
              </div>

              <div className="h-px bg-emerald-50 my-2"></div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3 ml-1 mb-1">
                  <i className="fa-solid fa-syringe text-[#10B981] text-xs"></i>
                  <span className="text-[10px] font-bold text-emerald-800/40 uppercase tracking-widest">Last Vaccination Record</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input 
                    type="date" 
                    className="bg-emerald-50/50 text-xs font-bold text-[#064E3B] p-4 rounded-2xl outline-none"
                    value={formData.lastVaccination}
                    onChange={e => setFormData({...formData, lastVaccination: e.target.value})}
                  />
                  <select 
                    className="bg-emerald-50/50 text-xs font-bold text-[#064E3B] p-4 rounded-2xl outline-none"
                    value={formData.vaccineType}
                    onChange={e => setFormData({...formData, vaccineType: e.target.value})}
                  >
                    <option value="Rabies">Rabies</option>
                    <option value="DHPP">DHPP</option>
                    <option value="FVRCP">FVRCP</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button 
          type="submit"
          className="bg-[#10B981] text-white py-6 rounded-[2.5rem] font-bold shadow-lg shadow-emerald-200 mb-8 active:scale-95 transition-transform flex items-center justify-center gap-3 text-lg"
        >
          <i className="fa-solid fa-check-circle"></i>
          Register Profile
        </button>
      </form>
    </div>
  );
};

export default AddPet;
