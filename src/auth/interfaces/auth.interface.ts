export interface JwtPayload {
  email: string;
  sub: number; // user ID
  name: string;
  iat?: number; // issued at
  exp?: number; // expiration
}

export interface UserResponse {
  id: number;
  email: string;
  name: string;
  phone: string;
  photoUrl?: string;
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
  createdAt: Date;
  updatedAt: Date;
  // Note: password is excluded from this type
}
