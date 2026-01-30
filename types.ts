
export type PetType = 'dog' | 'cat' | 'bird' | 'rabbit' | 'other';

export interface Pet {
  id: string;
  name: string;
  type: PetType;
  breed: string;
  age: number;
  weight: number;
  lastVaccinationDate: string;
  vaccinationType: string;
  feedingTimes: string[]; // e.g., ["08:00", "13:00", "19:00"]
  imageUrl: string;
}

export interface Reminder {
  id: string;
  petId: string;
  petName: string;
  type: 'feeding' | 'vaccination';
  title: string;
  time: string;
  date?: string;
  completed: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: number;
}

export enum AppScreen {
  REGISTER = 'REGISTER',
  LOGIN = 'LOGIN',
  HOME = 'HOME',
  PET_DETAILS = 'PET_DETAILS',
  CHAT = 'CHAT',
  REMINDERS = 'REMINDERS',
  ADD_PET = 'ADD_PET',
  PROFILE = 'PROFILE'
}
