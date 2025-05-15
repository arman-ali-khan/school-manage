import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';

// Mock user data - In a real application, this would be replaced with a database
const users = [
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

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = users.find(u => u.email === credentials.email);

        if (!user) {
          return null;
        }

        const isPasswordValid = await compare(credentials.password, user.password);

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          image: null,
          studentId: user.studentId,
          adminId: user.adminId,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.studentId = user.studentId;
        token.adminId = user.adminId;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.studentId = token.studentId as string | null;
        session.user.adminId = token.adminId as string | null;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
