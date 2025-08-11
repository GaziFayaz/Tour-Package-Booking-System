// Common types used across the authentication system

export interface JwtPayload {
  email: string;
  sub: number; // user ID
  name: string;
  role: string;
  iat?: number; // issued at
  exp?: number; // expiration
}

export interface UserResponse {
  id: number;
  email: string;
  name: string;
  phone: string;
  photoUrl?: string;
  role: string;
}

export interface LoginResponse {
  access_token: string;
  user: UserResponse;
}

export interface ValidatedUser {
  id: number;
  email: string;
  name: string;
  phone: string;
  photoUrl?: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface JwtUser {
  userId: number;
  email: string;
  name: string;
  role: string;
}
