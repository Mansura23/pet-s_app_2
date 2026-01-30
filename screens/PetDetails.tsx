
import React from 'react';
import { Pet } from '../types';

interface PetDetailsProps {
  pet: Pet;
  onBack: () => void;
  onChat: () => void;
}

const PetDetails: React.FC<PetDetailsProps> = ({ pet, onBack, onChat }) => {
  return (
    <div className="relative min-h-full">
      {/* Background Image Header */}
      <div className="h-[45vh] relative">
        <img 
          src={pet.imageUrl} 
          alt={pet.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center">
          <button onClick={onBack} className="bg-white/30 backdrop-blur-md text-white w-10 h-10 rounded-xl flex items-center justify-center">
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <button className="bg-white/30 backdrop-blur-md text-white w-10 h-10 rounded-xl flex items-center justify-center">
            <i className="fa-regular fa-heart"></i>
          </button>
        </div>
      </div>

      {/* Content Card */}
      <div className="bg-white rounded-t-[3rem] -mt-10 p-8 min-h-[60vh] relative z-10 shadow-2xl">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-[#2D3142] mb-1">{pet.name}</h1>
            <p className="text-gray-400 flex items-center gap-1 text-sm">
              <i className="fa-solid fa-location-dot text-[#FF9933]"></i> Home Sweet Home
            </p>
          </div>
          <div className={`p-3 rounded-2xl ${pet.type === 'dog' ? 'bg-blue-50 text-blue-500' : 'bg-orange-50 text-orange-500'}`}>
            <i className={`fa-solid fa-${pet.type === 'dog' ? 'dog' : 'cat'} text-xl`}></i>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          <div className="bg-blue-50 p-4 rounded-3xl text-center">
            <p className="text-[10px] text-blue-500 font-bold uppercase tracking-wider mb-1">Sex</p>
            <p className="font-bold text-[#2D3142]">Male</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-3xl text-center">
            <p className="text-[10px] text-orange-500 font-bold uppercase tracking-wider mb-1">Age</p>
            <p className="font-bold text-[#2D3142]">{pet.age} yrs</p>
          </div>
          <div className="bg-green-50 p-4 rounded-3xl text-center">
            <p className="text-[10px] text-green-500 font-bold uppercase tracking-wider mb-1">Weight</p>
            <p className="font-bold text-[#2D3142]">{pet.weight}kg</p>
          </div>
        </div>

        <div className="mb-8">
          <h3 className="text-lg font-bold text-[#2D3142] mb-3">About {pet.name}</h3>
          <p className="text-gray-500 text-sm leading-relaxed">
            {pet.name} is a healthy {pet.breed} who loves outdoors and long walks. 
            Keep track of his vaccinations and feeding schedule below to ensure his well-being.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 sticky bottom-4">
          <button className="flex-1 bg-gray-100 p-5 rounded-2xl flex items-center justify-center gap-2">
            <i className="fa-solid fa-phone text-[#2D3142]"></i>
          </button>
          <button 
            onClick={onChat}
            className="flex-1 bg-gray-100 p-5 rounded-2xl flex items-center justify-center gap-2"
          >
            <i className="fa-solid fa-comment text-[#2D3142]"></i>
          </button>
          <button className="flex-[3] bg-[#FF9933] text-white p-5 rounded-2xl font-bold shadow-lg shadow-orange-100">
            Health Journal
          </button>
        </div>
      </div>
    </div>
  );
};

export default PetDetails;
