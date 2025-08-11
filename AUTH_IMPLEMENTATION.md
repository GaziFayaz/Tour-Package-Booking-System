# Authentication Implementation

This document describes the JWT-based authentication system implemented for the Tour Package Booking System with **strong TypeScript typing**.

## Features

- ✅ JWT-based authentication with proper TypeScript types
- ✅ Password hashing with bcryptjs
- ✅ User registration and login with typed responses
- ✅ Protected routes with JWT guards
- ✅ Password validation (minimum 6 characters)
- ✅ Email uniqueness validation
- ✅ Class serializer to hide sensitive data
- ✅ Environment-based configuration
- ✅ **Strong TypeScript typing throughout**

## API Endpoints

### Authentication

| Method | Endpoint         | Description              | Protected |
| ------ | ---------------- | ------------------------ | --------- |
| POST   | `/auth/register` | Register a new user      | No        |
| POST   | `/auth/login`    | Login user               | No        |
| GET    | `/auth/profile`  | Get current user profile | Yes       |

### Users

| Method | Endpoint              | Description       | Protected |
| ------ | --------------------- | ----------------- | --------- |
| GET    | `/users`              | Get all users     | Yes       |
| GET    | `/users/:id`          | Get user by ID    | Yes       |
| GET    | `/users/email/:email` | Get user by email | Yes       |
| PATCH  | `/users/:id`          | Update user       | Yes       |
| DELETE | `/users/:id`          | Delete user       | Yes       |

### Bookings

| Method | Endpoint        | Description         | Protected |
| ------ | --------------- | ------------------- | --------- |
| POST   | `/bookings`     | Create booking      | Yes       |
| GET    | `/bookings/:id` | Get booking details | Yes       |

### Packages

All GET endpoints are public, while POST/PATCH/DELETE operations require authentication.

## Authentication Flow

### Registration

```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "+1234567890",
  "photoUrl": "https://example.com/photo.jpg" // optional
}
```

Response:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "john@example.com",
    "name": "John Doe",
    "phone": "+1234567890",
    "photoUrl": "https://example.com/photo.jpg"
  }
}
```

### Login

```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

Response:

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "john@example.com",
    "name": "John Doe",
    "phone": "+1234567890",
    "photoUrl": "https://example.com/photo.jpg"
  }
}
```

### Protected Requests

Include the JWT token in the Authorization header:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Environment Variables

Add these to your `.env` file:

```env
# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
JWT_EXPIRES_IN=1d
```

## Security Features

1. **Password Hashing**: Passwords are hashed using bcryptjs with salt rounds of 12
2. **JWT Tokens**: Stateless authentication using JSON Web Tokens
3. **Class Serializer**: Automatically excludes password field from responses
4. **Input Validation**: Email format and password length validation
5. **Unique Constraints**: Email uniqueness enforced at database level
6. **Environment Configuration**: Secure configuration management

## Implementation Details

### Modules Structure

```
src/auth/
├── decorators/
│   └── get-user.decorator.ts     # Custom decorator to extract user from JWT
├── guards/
│   ├── jwt-auth.guard.ts         # JWT authentication guard
│   └── local-auth.guard.ts       # Local authentication guard
├── strategies/
│   ├── jwt.strategy.ts           # JWT strategy for Passport
│   └── local.strategy.ts         # Local strategy for Passport
├── auth.controller.ts            # Authentication endpoints
├── auth.module.ts               # Auth module configuration
└── auth.service.ts              # Authentication business logic
```

### Guards Usage

```typescript
// Protect single endpoint
@UseGuards(JwtAuthGuard)
@Get('protected')
getProtectedData() {
  return { message: 'This is protected' };
}

// Protect entire controller
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  // All routes protected
}

// Get current user
@Get('profile')
@UseGuards(JwtAuthGuard)
getProfile(@GetUser() user: any) {
  return user;
}
```

### TypeScript Type Safety

The authentication system now uses comprehensive TypeScript types for better developer experience and runtime safety:

### Core Types

```typescript
// JWT payload structure
interface JwtPayload {
  email: string;
  sub: number; // user ID
  name: string;
  iat?: number; // issued at
  exp?: number; // expiration
}

// API response for login/register
interface LoginResponse {
  access_token: string;
  user: UserResponse;
}

// User data returned to client (no password)
interface UserResponse {
  id: number;
  email: string;
  name: string;
  phone: string;
  photoUrl?: string;
}

// Validated user from strategies
interface ValidatedUser {
  id: number;
  email: string;
  name: string;
  phone: string;
  photoUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

// User object in JWT context
interface JwtUser {
  userId: number;
  email: string;
  name: string;
}
```

### Type-Safe Controllers

```typescript
@Controller('auth')
export class AuthController {
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<LoginResponse> {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<LoginResponse> {
    return this.authService.loginWithCredentials(loginDto);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@GetUser() user: JwtUser): JwtUser {
    return user;
  }
}
```

### Type-Safe Services

```typescript
@Injectable()
export class AuthService {
  async validateUser(
    email: string,
    password: string,
  ): Promise<ValidatedUser | null> {
    // Implementation with proper return typing
  }

  async login(user: ValidatedUser): Promise<LoginResponse> {
    // Implementation with typed payload and response
  }
}
```

## Error Handling

The system handles common authentication errors:

- `ConflictException`: Email already exists during registration
- `UnauthorizedException`: Invalid credentials during login
- `NotFoundException`: User not found
- Automatic JWT validation errors

## Testing

### Test Registration

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "phone": "+1234567890"
  }'
```

### Test Login

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Test Protected Route

```bash
curl -X GET http://localhost:3000/auth/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN_HERE"
```

## Best Practices Implemented

1. **Separation of Concerns**: Auth logic separated from user management
2. **Configuration Management**: Environment-based JWT configuration
3. **Error Handling**: Proper HTTP status codes and error messages
4. **Data Security**: Sensitive data exclusion from responses
5. **Validation**: Input validation with class-validator
6. **Modular Architecture**: Clean module structure with proper exports
7. **Type Safety**: Full TypeScript support with proper typing

## Next Steps

Consider implementing these additional features:

1. **Role-based Authorization**: Add user roles (admin, user, etc.)
2. **Refresh Tokens**: Implement token refresh mechanism
3. **Password Reset**: Email-based password reset functionality
4. **Account Verification**: Email verification for new accounts
5. **Rate Limiting**: Protect against brute force attacks
6. **Audit Logging**: Track authentication events
7. **Session Management**: Optional session-based auth for admin panel
