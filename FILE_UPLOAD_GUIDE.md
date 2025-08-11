# File Upload Implementation Guide

## Overview

This implementation provides secure user photo upload functionality using Cloudinary cloud storage service.

## Environment Configuration

Add the following environment variables to your `.env` file:

```env
# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLOUDINARY_FOLDER=user-photos

# File Upload Configuration
MAX_FILE_SIZE=5242880  # 5MB in bytes
ALLOWED_FILE_TYPES=image/jpeg,image/jpg,image/png,image/webp
```

## API Endpoints

### Upload User Photo

- **Method**: `POST`
- **Endpoint**: `/users/:id/photo`
- **Content-Type**: `multipart/form-data`
- **Authentication**: Required (JWT)
- **Authorization**: User can upload their own photo, or Super Admin can upload any user's photo
- **Form Field**: `photo` (file)

**Example Request:**

```bash
curl -X POST \
  http://localhost:3000/users/1/photo \
  -H 'Authorization: Bearer <jwt_token>' \
  -H 'Content-Type: multipart/form-data' \
  -F 'photo=@/path/to/image.jpg'
```

**Response:**

```json
{
  "message": "Photo uploaded successfully",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "photoUrl": "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/user-photos/user-1.jpg",
    "role": "ADMIN",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Remove User Photo

- **Method**: `DELETE`
- **Endpoint**: `/users/:id/photo`
- **Authentication**: Required (JWT)
- **Authorization**: User can remove their own photo, or Super Admin can remove any user's photo

**Example Request:**

```bash
curl -X DELETE \
  http://localhost:3000/users/1/photo \
  -H 'Authorization: Bearer <jwt_token>'
```

**Response:**

```json
{
  "message": "Photo removed successfully",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "photoUrl": null,
    "role": "ADMIN",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

## File Validation

The following validations are applied to uploaded files:

1. **File Size**: Maximum 5MB (configurable via `MAX_FILE_SIZE` environment variable)
2. **File Type**: Only image files are allowed:
   - JPEG (.jpg, .jpeg)
   - PNG (.png)
   - WebP (.webp)
3. **File Content**: Basic validation to ensure the file is actually an image

## Image Processing

Uploaded images are automatically processed by Cloudinary with the following transformations:

- **Resize**: Maximum dimensions of 500x500 pixels (maintains aspect ratio)
- **Quality**: Auto-optimized for good quality and smaller file size
- **Format**: Auto-format selection for optimal delivery

## Security Features

1. **Authentication**: All endpoints require valid JWT authentication
2. **Authorization**: Users can only manage their own photos (except Super Admins)
3. **File Validation**: Comprehensive validation of file type, size, and content
4. **Secure Storage**: Files are stored securely on Cloudinary with unique public IDs
5. **Cleanup**: Old photos are automatically deleted when new ones are uploaded or users are deleted

## Database Schema

The `users` table includes the following fields for photo management:

- `photoUrl` (string, nullable): The public URL of the user's photo on Cloudinary
- `photoPublicId` (string, nullable): The Cloudinary public ID for managing the photo (updates/deletions)

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- `400 Bad Request`: Invalid file type, size, or other validation errors
- `401 Unauthorized`: Missing or invalid JWT token
- `403 Forbidden`: User trying to access/modify another user's photo (except Super Admins)
- `404 Not Found`: User not found
- `422 Unprocessable Entity`: File validation failed

## Usage Examples

### Frontend JavaScript Example

```javascript
// Upload photo
const uploadPhoto = async (userId, file) => {
  const formData = new FormData();
  formData.append('photo', file);

  const response = await fetch(`/api/users/${userId}/photo`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
    body: formData,
  });

  return response.json();
};

// Remove photo
const removePhoto = async (userId) => {
  const response = await fetch(`/api/users/${userId}/photo`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  });

  return response.json();
};
```

## Testing

To test the file upload functionality:

1. Ensure Cloudinary credentials are properly set in the `.env` file
2. Start the development server: `npm run start:dev`
3. Use a tool like Postman or curl to test the endpoints
4. Verify that images are uploaded to your Cloudinary account
5. Check that the database contains the correct `photoUrl` and `photoPublicId` values

## Troubleshooting

### Common Issues

1. **"Failed to upload image to Cloudinary"**
   - Check Cloudinary credentials in `.env` file
   - Verify network connectivity to Cloudinary

2. **"File too large"**
   - Check the file size limit in `MAX_FILE_SIZE` environment variable
   - Ensure the file is under the configured limit

3. **"Invalid file type"**
   - Verify the file is a supported image format
   - Check the `ALLOWED_FILE_TYPES` environment variable

4. **"You can only update your own photo"**
   - Ensure the authenticated user is trying to update their own photo
   - Or use a Super Admin account for managing other users' photos
