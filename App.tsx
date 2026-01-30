
import React, { useState, useEffect, useMemo } from 'react';
import { Pet, AppScreen, Reminder, ChatMessage } from './types';
import { INITIAL_PETS, VACCINATION_INTERVALS } from './constants';
import Home from './screens/Home';
import PetDetails from './screens/PetDetails';
import Chat from './screens/Chat';
import Reminders from './screens/Reminders';
import AddPet from './screens/AddPet';
import Login from './screens/Login';
import Register from './screens/Register';
import Profile from './screens/Profile';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>(AppScreen.REGISTER);
  const [user, setUser] = useState({ name: '', email: '' });
  const [pets, setPets] = useState<Pet[]>(INITIAL_PETS);
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

  useEffect(() => {
    const newReminders: Reminder[] = [];
    pets.forEach(pet => {
      pet.feedingTimes.forEach((time, index) => {
        newReminders.push({
          id: `feeding-${pet.id}-${index}`,
          petId: pet.id,
          petName: pet.name,
          type: 'feeding',
          title: `Feeding Time for ${pet.name}`,
          time,
          completed: false
        });
      });

      const lastDate = new Date(pet.lastVaccinationDate);
      const interval = VACCINATION_INTERVALS[pet.vaccinationType] || 12;
      const nextDate = new Date(lastDate);
      nextDate.setMonth(nextDate.getMonth() + interval);

      newReminders.push({
        id: `vaccine-${pet.id}`,
        petId: pet.id,
        petName: pet.name,
        type: 'vaccination',
        title: `${pet.vaccinationType} Booster`,
        time: '09:00',
        date: nextDate.toISOString().split('T')[0],
        completed: false
      });
    });
    setReminders(newReminders);
  }, [pets]);

  const handleAuthSuccess = (name: string, email: string = '') => {
    setUser({ name, email: email || `${name.toLowerCase()}@example.com` });
    setCurrentScreen(AppScreen.HOME);
  };

  const handleAddPet = (newPet: Pet) => {
    setPets([...pets, newPet]);
    setCurrentScreen(AppScreen.HOME);
  };

  const selectedPet = useMemo(() => 
    pets.find(p => p.id === selectedPetId), [pets, selectedPetId]
  );

  const isAuthScreen = currentScreen === AppScreen.LOGIN || currentScreen === AppScreen.REGISTER;

  const renderScreen = () => {
    switch (currentScreen) {
      case AppScreen.REGISTER:
        return <Register 
          onRegister={(name) => handleAuthSuccess(name)} 
          onSwitchToLogin={() => setCurrentScreen(AppScreen.LOGIN)} 
        />;
      case AppScreen.LOGIN:
        return <Login 
          onLogin={(name) => handleAuthSuccess(name)} 
          onSwitchToRegister={() => setCurrentScreen(AppScreen.REGISTER)} 
        />;
      case AppScreen.HOME:
        return (
          <Home 
            userName={user.name} 
            pets={pets} 
            reminders={reminders}
            onSelectPet={(id) => { setSelectedPetId(id); setCurrentScreen(AppScreen.PET_DETAILS); }}
            onAddPet={() => setCurrentScreen(AppScreen.ADD_PET)}
          />
        );
      case AppScreen.PET_DETAILS:
        return selectedPet ? (
          <PetDetails 
            pet={selectedPet} 
            onBack={() => setCurrentScreen(AppScreen.HOME)} 
            onChat={() => setCurrentScreen(AppScreen.CHAT)}
          />
        ) : null;
      case AppScreen.CHAT:
        return <Chat history={chatHistory} setHistory={setChatHistory} onBack={() => setCurrentScreen(AppScreen.HOME)} />;
      case AppScreen.REMINDERS:
        return <Reminders reminders={reminders} onBack={() => setCurrentScreen(AppScreen.HOME)} />;
      case AppScreen.ADD_PET:
        return <AddPet onAdd={handleAddPet} onCancel={() => setCurrentScreen(AppScreen.HOME)} />;
      case AppScreen.PROFILE:
        return <Profile user={user} petCount={pets.length} onLogout={() => setCurrentScreen(AppScreen.LOGIN)} onBack={() => setCurrentScreen(AppScreen.HOME)} />;
      default:
        return <Home userName={user.name} pets={pets} reminders={reminders} onSelectPet={() => {}} onAddPet={() => {}} />;
    }
  };

  return (
    <div className="max-w-md mx-auto h-screen bg-[#F0FDF4] shadow-xl overflow-hidden flex flex-col relative font-['Outfit']">
      <div className="flex-1 overflow-y-auto hide-scrollbar pb-24">
        {renderScreen()}
      </div>

      {!isAuthScreen && (
        <nav className="absolute bottom-0 w-full bg-white border-t border-emerald-50 flex justify-around items-center py-5 px-6 rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(16,185,129,0.08)] z-50">
          <button onClick={() => setCurrentScreen(AppScreen.HOME)} className={`p-2 transition-all ${currentScreen === AppScreen.HOME ? 'text-[#10B981] scale-110' : 'text-emerald-200'}`}>
            <i className="fa-solid fa-house text-xl"></i>
          </button>
          <button onClick={() => setCurrentScreen(AppScreen.REMINDERS)} className={`p-2 transition-all ${currentScreen === AppScreen.REMINDERS ? 'text-[#10B981] scale-110' : 'text-emerald-200'}`}>
            <i className="fa-solid fa-calendar-check text-xl"></i>
          </button>
          <button onClick={() => setCurrentScreen(AppScreen.CHAT)} className={`p-2 transition-all ${currentScreen === AppScreen.CHAT ? 'text-[#10B981] scale-110' : 'text-emerald-200'}`}>
            <i className="fa-solid fa-stethoscope text-xl"></i>
          </button>
          <button onClick={() => setCurrentScreen(AppScreen.PROFILE)} className={`p-2 transition-all ${currentScreen === AppScreen.PROFILE ? 'text-[#10B981] scale-110' : 'text-emerald-200'}`}>
            <i className="fa-solid fa-user text-xl"></i>
          </button>
        </nav>
      )}
    </div>
  );
};

export default App;
