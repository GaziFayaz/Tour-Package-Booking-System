# Create User with Photo Upload Implementation

## Overview

The create user endpoint has been enhanced to support optional photo upload during user creation with automatic rollback functionality.

## Endpoint Details

### Create User with Optional Photo

- **Method**: `POST`
- **Endpoint**: `/users`
- **Content-Type**: `multipart/form-data`
- **Authentication**: Required (JWT)
- **Authorization**: Only Super Admin can create users

## Request Format

### Form Data Fields

- `name` (string, required): User's full name
- `email` (string, required): User's email address
- `password` (string, required): User's password (min 6 characters)
- `phone` (string, required): User's phone number
- `role` (string, required): User's role (ADMIN or SUPER_ADMIN)
- `photo` (file, optional): User's profile photo

## Example Requests

### 1. Create User Without Photo

```bash
curl -X POST \
  http://localhost:3000/users \
  -H 'Authorization: Bearer <jwt_token>' \
  -H 'Content-Type: multipart/form-data' \
  -F 'name=John Doe' \
  -F 'email=john@example.com' \
  -F 'password=password123' \
  -F 'phone=+1234567890' \
  -F 'role=ADMIN'
```

### 2. Create User With Photo

```bash
curl -X POST \
  http://localhost:3000/users \
  -H 'Authorization: Bearer <jwt_token>' \
  -H 'Content-Type: multipart/form-data' \
  -F 'name=John Doe' \
  -F 'email=john@example.com' \
  -F 'password=password123' \
  -F 'phone=+1234567890' \
  -F 'role=ADMIN' \
  -F 'photo=@/path/to/profile.jpg'
```

## Response Format

### Success Response

```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "photoUrl": "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/user-photos/user-1.jpg",
  "role": "ADMIN",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### Error Responses

#### 1. Validation Error (400 Bad Request)

```json
{
  "statusCode": 400,
  "message": "Photo file too large. Maximum size is 5MB"
}
```

#### 2. Authentication Error (401 Unauthorized)

```json
{
  "statusCode": 401,
  "message": "Unauthorized"
}
```

#### 3. Authorization Error (403 Forbidden)

```json
{
  "statusCode": 403,
  "message": "Only super admins can create users"
}
```

#### 4. Conflict Error (409 Conflict)

```json
{
  "statusCode": 409,
  "message": "User with this email already exists"
}
```

## File Upload Validation

### Supported File Types

- JPEG (.jpg, .jpeg)
- PNG (.png)
- WebP (.webp)

### File Size Limits

- Maximum file size: 5MB
- Configurable via `MAX_FILE_SIZE` environment variable

### Image Processing

When a photo is uploaded, it's automatically processed by Cloudinary:

- Resized to maximum 500x500 pixels (maintains aspect ratio)
- Quality optimized for web delivery
- Format optimization for better performance

## Rollback Mechanism

The implementation includes a robust rollback mechanism to ensure data consistency:

### Rollback Triggers

1. **Database Save Failure**: If user creation fails after photo upload
2. **Validation Failure**: If any validation fails after photo upload
3. **System Error**: If any unexpected error occurs after photo upload

### Rollback Process

1. Photo is uploaded to Cloudinary first
2. User data is saved to database
3. If database operation fails:
   - Uploaded photo is automatically deleted from Cloudinary
   - Original error is re-thrown
   - No orphaned files remain

### Error Handling Flow

```
1. Validate request data
2. Check user doesn't exist
3. Validate photo file (if provided)
4. Upload photo to Cloudinary → Store public_id for rollback
5. Hash password
6. Create user object
7. Save to database
   ├─ Success → Clear rollback flag → Return user
   └─ Failure → Delete uploaded photo → Throw error
```

## Security Features

### Authentication & Authorization

- JWT authentication required
- Only Super Admins can create users
- Role validation enforced

### File Security

- File type validation (whitelist approach)
- File size limits
- Content validation to ensure files are actual images
- Secure upload to Cloudinary with unique identifiers

### Data Protection

- Password hashing with bcrypt (12 rounds)
- Email uniqueness enforcement
- Input sanitization and validation

## Frontend Integration

### JavaScript Example

```javascript
const createUserWithPhoto = async (userData, photoFile) => {
  const formData = new FormData();

  // Add user data
  formData.append('name', userData.name);
  formData.append('email', userData.email);
  formData.append('password', userData.password);
  formData.append('phone', userData.phone);
  formData.append('role', userData.role);

  // Add photo if provided
  if (photoFile) {
    formData.append('photo', photoFile);
  }

  try {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }

    return await response.json();
  } catch (error) {
    console.error('Failed to create user:', error);
    throw error;
  }
};
```

### React Component Example

```jsx
import React, { useState } from 'react';

const CreateUserForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'ADMIN',
  });
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = await createUserWithPhoto(formData, photo);
      console.log('User created successfully:', user);
      // Handle success (redirect, show message, etc.)
    } catch (error) {
      console.error('Error creating user:', error);
      // Handle error (show error message)
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        required
      />
      <input
        type="tel"
        placeholder="Phone"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        required
      />
      <select
        value={formData.role}
        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
        required
      >
        <option value="ADMIN">Admin</option>
        <option value="SUPER_ADMIN">Super Admin</option>
      </select>
      <input
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        onChange={(e) => setPhoto(e.target.files[0])}
      />
      <button type="submit" disabled={loading}>
        {loading ? 'Creating...' : 'Create User'}
      </button>
    </form>
  );
};
```

## Testing

### Manual Testing

1. Test user creation without photo
2. Test user creation with valid photo
3. Test photo file type validation
4. Test photo file size validation
5. Test rollback mechanism (simulate database error)
6. Test authentication/authorization

### Unit Testing

The implementation includes comprehensive unit tests covering:

- Successful user creation with and without photos
- File validation scenarios
- Rollback mechanism functionality
- Error handling paths

## Environment Configuration

Ensure these environment variables are set:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_FOLDER=user-photos
MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES=image/jpeg,image/jpg,image/png,image/webp
```

## Troubleshooting

### Common Issues

1. **"Failed to upload image to Cloudinary"**
   - Check Cloudinary credentials
   - Verify network connectivity
   - Check file format and size

2. **"Photo file too large"**
   - Reduce image file size
   - Check MAX_FILE_SIZE configuration

3. **"Invalid photo file type"**
   - Ensure file is in supported format (JPEG, PNG, WebP)
   - Check file extension and MIME type

4. **"Only super admins can create users"**
   - Ensure the requesting user has SUPER_ADMIN role
   - Check JWT token validity

5. **Rollback not working**
   - Check Cloudinary connection for delete operations
   - Verify error handling logic
   - Check logs for rollback attempt messages

This implementation provides a robust, secure, and user-friendly way to create users with optional photo uploads while maintaining data consistency through automatic rollback mechanisms.
