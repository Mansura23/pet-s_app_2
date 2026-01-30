
import React, { useState } from 'react';

interface RegisterProps {
  onRegister: (name: string) => void;
  onSwitchToLogin: () => void;
}

const Register: React.FC<RegisterProps> = ({ onRegister, onSwitchToLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && email.trim() && password.trim()) {
      onRegister(name.trim());
    }
  };

  return (
    <div className="p-8 flex flex-col h-full justify-center bg-[#F0FDF4]">
      <div className="mb-10 text-center">
        <div className="w-32 h-32 mx-auto relative mb-6">
          <img 
            src="https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&q=80&w=400&h=400" 
            alt="Logo" 
            className="w-full h-full object-cover rounded-[2.5rem] shadow-xl border-4 border-white"
          />
          <div className="absolute -bottom-2 -right-2 bg-[#10B981] p-3 rounded-full text-white shadow-lg">
            <i className="fa-solid fa-shield-cat text-lg"></i>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-[#064E3B] mb-2">PawsGuard</h1>
        <p className="text-emerald-700/70">Secure your pet's health journey today.</p>
      </div>

      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-emerald-800 uppercase tracking-widest ml-1">Full Name</label>
          <input 
            type="text" 
            placeholder="Enter your name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-white text-black border-none p-5 rounded-2xl shadow-sm focus:ring-2 focus:ring-[#10B981] outline-none transition-all placeholder:text-gray-300"
            required
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-emerald-800 uppercase tracking-widest ml-1">Email Address</label>
          <input 
            type="email" 
            placeholder="hello@paws.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white text-black border-none p-5 rounded-2xl shadow-sm focus:ring-2 focus:ring-[#10B981] outline-none transition-all placeholder:text-gray-300"
            required
          />
        </div>
        
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-emerald-800 uppercase tracking-widest ml-1">Password</label>
          <input 
            type="password" 
            placeholder="Create password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white text-black border-none p-5 rounded-2xl shadow-sm focus:ring-2 focus:ring-[#10B981] outline-none transition-all placeholder:text-gray-300"
            required
          />
        </div>

        <button 
          type="submit"
          className="w-full bg-[#10B981] text-white py-5 rounded-2xl font-bold shadow-lg shadow-emerald-100 active:scale-95 transition-transform mt-2"
        >
          Create Account
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-sm text-emerald-900/60">
          Already have an account? {' '}
          <button 
            onClick={onSwitchToLogin}
            className="text-[#10B981] font-bold"
          >
            Log In
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
