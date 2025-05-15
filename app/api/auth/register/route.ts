import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcryptjs';

// Mock users array - In a real application, this would be a database
let users = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    password: '$2a$10$IiUB8DfU3QDH9EMB3RXBwOeSXZk2o9bxwOqxNG9Af0dxzXlh.qZ6W',
    role: 'ADMIN',
  },
  {
    id: '2',
    name: 'Student User',
    email: 'student@example.com',
    password: '$2a$10$IiUB8DfU3QDH9EMB3RXBwOeSXZk2o9bxwOqxNG9Af0dxzXlh.qZ6W',
    role: 'STUDENT',
  },
];

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = users.find(user => user.email === email);

    if (existingUser) {
      return NextResponse.json(
        { message: 'User with this email already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await hash(password, 10);

    // Create user
    const newUser = {
      id: String(users.length + 1),
      name,
      email,
      password: hashedPassword,
      role: 'STUDENT',
    };

    users.push(newUser);

    // Return user without password
    return NextResponse.json(
      {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'Error creating user' },
      { status: 500 }
    );
  }
}