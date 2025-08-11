# Postman Collections Guide

This guide explains how to use the Postman collections for testing the Tour Package Booking System APIs.

## Collections Overview

### 1. **Auth APIs Collection** (`auth_api_postman_collection.json`)

- User Registration
- User Login
- Get User Profile
- Automatic JWT token management

### 2. **Users APIs Collection** (`users_api_postman_collection_v2.json`)

- Create User (Admin function)
- Get All Users
- Get User by ID
- Get User by Email
- Update User
- Delete User
- All endpoints require JWT authentication

### 3. **Environment File** (`tour_booking_postman_environment.json`)

- Base URL configuration
- JWT token storage
- Test credentials
- Environment variables

## Setup Instructions

### 1. Import Collections

1. Open Postman
2. Click "Import" button
3. Select and import these files:
   - `auth_api_postman_collection.json`
   - `users_api_postman_collection_v2.json`
   - `tour_booking_postman_environment.json`

### 2. Set Environment

1. Click the environment dropdown (top right)
2. Select "Tour Booking System - Local Development"

### 3. Start Development Server

```bash
npm run start:dev
```

Server should be running on `http://localhost:3000`

## Testing Workflow

### Step 1: Authentication

Use the **Auth APIs** collection first:

#### Register New User

```http
POST /auth/register
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123",
  "phone": "+1234567890",
  "photoUrl": "https://example.com/photo.jpg"
}
```

- ✅ Automatically saves JWT token
- ✅ Returns user data (password excluded)

#### OR Login Existing User

```http
POST /auth/login
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```

- ✅ Automatically saves JWT token
- ✅ Returns user data and token

#### Verify Authentication

```http
GET /auth/profile
Authorization: Bearer {{access_token}}
```

- ✅ Returns current user from JWT token

### Step 2: User Management

Use the **Users APIs** collection with saved JWT token:

#### Get All Users

```http
GET /users
Authorization: Bearer {{access_token}}
```

#### Get Specific User

```http
GET /users/1
Authorization: Bearer {{access_token}}
```

#### Update User

```http
PATCH /users/1
Authorization: Bearer {{access_token}}
{
  "name": "Updated Name",
  "phone": "+9876543210"
}
```

## Features

### Automatic Token Management

- JWT tokens are automatically saved after login/register
- All protected endpoints use the saved token
- No need to manually copy/paste tokens

### Pre-request Scripts

- Checks for valid JWT token before requests
- Warns if authentication is missing

### Test Scripts

- Automatically saves JWT tokens from responses
- Logs response status and errors
- Handles authentication errors gracefully

### Response Examples

- Each endpoint includes sample responses
- Shows expected data structure
- Demonstrates error scenarios

## Environment Variables

| Variable        | Description              | Example                                   |
| --------------- | ------------------------ | ----------------------------------------- |
| `baseUrl`       | API base URL             | `http://localhost:3000`                   |
| `access_token`  | JWT token (auto-managed) | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` |
| `user_id`       | Test user ID             | `1`                                       |
| `test_email`    | Test email address       | `test@example.com`                        |
| `test_password` | Test password            | `password123`                             |

## Error Handling

### Common Errors

#### 401 Unauthorized

```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

**Solution**: Login first to get a valid JWT token

#### 404 Not Found

```json
{
  "statusCode": 404,
  "message": "User with ID 999 not found"
}
```

**Solution**: Check if user exists or use correct ID

#### 409 Conflict (Registration)

```json
{
  "statusCode": 409,
  "message": "User with this email already exists"
}
```

**Solution**: Use different email or login instead

#### 400 Bad Request (Validation)

```json
{
  "statusCode": 400,
  "message": ["Password must be at least 6 characters long"],
  "error": "Bad Request"
}
```

**Solution**: Fix validation errors in request body

## Security Features

### Password Security

- Passwords are automatically hashed with bcryptjs
- Passwords never appear in API responses
- Class serializer excludes sensitive fields

### JWT Token Security

- Tokens expire after 24 hours (configurable)
- Cryptographically secure secret key
- Stateless authentication

### Input Validation

- Email format validation
- Password minimum length (6 characters)
- Required field validation
- Phone number validation

## Testing Best Practices

### 1. Test Authentication First

Always start with login/register before testing protected endpoints

### 2. Use Environment Variables

Leverage variables for:

- Base URLs (dev/staging/prod)
- User IDs for testing
- Test credentials

### 3. Check Response Structure

Verify that:

- Passwords are excluded from responses
- Required fields are present
- Data types match expectations

### 4. Test Error Scenarios

- Invalid credentials
- Missing authentication
- Validation errors
- Non-existent resources

### 5. Monitor Token Expiration

- JWT tokens expire after 24 hours
- Re-authenticate when tokens expire
- Check console for token status

## Extending Collections

### Adding New Endpoints

1. Create new request in appropriate collection
2. Set proper authentication headers
3. Add test scripts for response handling
4. Include example responses

### Environment Configurations

Create separate environments for:

- Local Development (`http://localhost:3000`)
- Staging (`https://staging-api.example.com`)
- Production (`https://api.example.com`)

## Troubleshooting

### Server Not Responding

1. Check if development server is running: `npm run start:dev`
2. Verify port 3000 is available
3. Check console for errors

### Authentication Issues

1. Clear saved `access_token` variable
2. Login again to get fresh token
3. Check if token has expired

### Collection Import Issues

1. Ensure JSON files are valid
2. Use latest Postman version
3. Import one file at a time

The collections provide a complete testing environment for the Tour Package Booking System APIs with enterprise-level security and user experience!
