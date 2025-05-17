export type UserRole = 'ADMIN' | 'STUDENT';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  studentId: string | null;
  adminId: string | null;
}