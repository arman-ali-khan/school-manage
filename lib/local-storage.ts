import { User } from '@/types/user';

// Mock user data
const defaultUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    password: '$2a$10$IiUB8DfU3QDH9EMB3RXBwOeSXZk2o9bxwOqxNG9Af0dxzXlh.qZ6W', // "password123"
    role: 'ADMIN',
    studentId: null,
    adminId: '1',
  },
  {
    id: '2',
    name: 'Student User',
    email: 'student@example.com',
    password: '$2a$10$IiUB8DfU3QDH9EMB3RXBwOeSXZk2o9bxwOqxNG9Af0dxzXlh.qZ6W', // "password123"
    role: 'STUDENT',
    studentId: '1',
    adminId: null,
  },
];

// Initialize localStorage with default users if empty
export function initializeStorage() {
  if (typeof window !== 'undefined') {
    const users = localStorage.getItem('users');
    if (!users) {
      localStorage.setItem('users', JSON.stringify(defaultUsers));
    }
  }
}

// Get all users
export function getUsers(): User[] {
  if (typeof window !== 'undefined') {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : defaultUsers;
  }
  return defaultUsers;
}

// Get user by email
export function getUserByEmail(email: string): User | null {
  const users = getUsers();
  return users.find(user => user.email === email) || null;
}

// Add new user
export function addUser(user: Omit<User, 'id'>): User {
  const users = getUsers();
  const newUser = {
    ...user,
    id: String(users.length + 1),
  };
  users.push(newUser);
  localStorage.setItem('users', JSON.stringify(users));
  return newUser;
}

// Update user
export function updateUser(id: string, userData: Partial<User>): User | null {
  const users = getUsers();
  const index = users.findIndex(user => user.id === id);
  if (index === -1) return null;

  const updatedUser = { ...users[index], ...userData };
  users[index] = updatedUser;
  localStorage.setItem('users', JSON.stringify(users));
  return updatedUser;
}

// Delete user
export function deleteUser(id: string): boolean {
  const users = getUsers();
  const filteredUsers = users.filter(user => user.id !== id);
  if (filteredUsers.length === users.length) return false;
  
  localStorage.setItem('users', JSON.stringify(filteredUsers));
  return true;
}