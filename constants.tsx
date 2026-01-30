
import { Pet } from './types';

export const COLORS = {
  primary: '#10B981', // Emerald 500
  secondary: '#D1FAE5', // Emerald 100
  accent: '#34D399',
  background: '#F0FDF4', // Mint white
  card: '#FFFFFF',
  text: '#064E3B', // Emerald 900
  muted: '#6B7280',
  danger: '#EF4444'
};

export const INITIAL_PETS: Pet[] = [
  {
    id: '1',
    name: 'Luna',
    type: 'dog',
    breed: 'Husky',
    age: 3,
    weight: 22,
    lastVaccinationDate: '2023-10-15',
    vaccinationType: 'Rabies',
    feedingTimes: ['08:00', '19:00'],
    imageUrl: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80&w=400&h=400'
  },
  {
    id: '2',
    name: 'Neko',
    type: 'cat',
    breed: 'Scottish Fold',
    age: 2,
    weight: 4.5,
    lastVaccinationDate: '2024-01-20',
    vaccinationType: 'FVRCP',
    feedingTimes: ['07:30', '12:30', '18:30'],
    imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=400&h=400'
  }
];

export const VACCINATION_INTERVALS: Record<string, number> = {
  'Rabies': 12, // months
  'DHPP': 36,
  'FVRCP': 12,
  'Bordetella': 6,
  'Other': 12
};
