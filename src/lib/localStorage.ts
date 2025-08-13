import { AppData, Board, Contact } from '@/types';

const STORAGE_KEY = 'contact-manager-data';

// Sample data to preload on first app load
const sampleData: AppData = {
  boards: [
    {
      id: "1",
      name: "Tech Conference 2025",
      contacts: [
        {
          id: "c1",
          name: "John Doe",
          position: "Software Engineer",
          company: "OpenAI",
          location: "San Francisco, USA",
          interests: "AI, Machine Learning, Startups"
        },
        {
          id: "c2",
          name: "Jane Smith",
          position: "Product Manager",
          company: "Google",
          location: "New York, USA",
          interests: "UX, Product Design, Agile"
        }
      ]
    },
    {
      id: "2",
      name: "Startup Meetup",
      contacts: [
        {
          id: "c3",
          name: "Alex Brown",
          position: "CEO",
          company: "TechNova",
          location: "Berlin, Germany",
          interests: "Entrepreneurship, Networking"
        }
      ]
    }
  ]
};

// Get data from LocalStorage or return sample data if empty
export const getData = (): AppData => {
  if (typeof window === 'undefined') return sampleData;
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleData));
    return sampleData;
  }
  
  try {
    return JSON.parse(stored);
  } catch {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleData));
    return sampleData;
  }
};

// Save data to LocalStorage
export const saveData = (data: AppData): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

// Get all boards
export const getBoards = (): Board[] => {
  return getData().boards;
};

// Get board by ID
export const getBoard = (id: string): Board | undefined => {
  return getBoards().find(board => board.id === id);
};

// Add new board
export const addBoard = (name: string): Board => {
  const data = getData();
  const newBoard: Board = {
    id: Date.now().toString(),
    name,
    contacts: []
  };
  
  data.boards.push(newBoard);
  saveData(data);
  return newBoard;
};

// Delete board
export const deleteBoard = (id: string): void => {
  const data = getData();
  data.boards = data.boards.filter(board => board.id !== id);
  saveData(data);
};

// Add contact to board
export const addContact = (boardId: string, contact: Omit<Contact, 'id'>): Contact => {
  const data = getData();
  const board = data.boards.find(b => b.id === boardId);
  
  if (!board) throw new Error('Board not found');
  
  const newContact: Contact = {
    ...contact,
    id: `c${Date.now()}`
  };
  
  board.contacts.push(newContact);
  saveData(data);
  return newContact;
};

// Update contact
export const updateContact = (boardId: string, contactId: string, updates: Partial<Contact>): Contact => {
  const data = getData();
  const board = data.boards.find(b => b.id === boardId);
  
  if (!board) throw new Error('Board not found');
  
  const contactIndex = board.contacts.findIndex(c => c.id === contactId);
  if (contactIndex === -1) throw new Error('Contact not found');
  
  board.contacts[contactIndex] = { ...board.contacts[contactIndex], ...updates };
  saveData(data);
  return board.contacts[contactIndex];
};

// Delete contact
export const deleteContact = (boardId: string, contactId: string): void => {
  const data = getData();
  const board = data.boards.find(b => b.id === boardId);
  
  if (!board) throw new Error('Board not found');
  
  board.contacts = board.contacts.filter(c => c.id !== contactId);
  saveData(data);
};
