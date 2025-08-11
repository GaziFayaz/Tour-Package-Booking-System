import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from './users.service';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { User } from './user.entity';
import { Role } from '../common/enums/role.enum';
import {
  ConflictException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';

describe('UsersService - Create User with Photo Upload', () => {
  let service: UsersService;
  let mockUserRepository: Partial<Repository<User>>;
  let mockCloudinaryService: Partial<CloudinaryService>;

  const mockSuperAdmin: User = {
    id: 1,
    name: 'Super Admin',
    email: 'admin@test.com',
    password: 'hashedpassword',
    phone: '+1234567890',
    photoUrl: null,
    photoPublicId: null,
    role: Role.SUPER_ADMIN,
    createdAt: new Date(),
    updatedAt: new Date(),
    bookings: [],
  };

  const mockFile: Express.Multer.File = {
    fieldname: 'photo',
    originalname: 'test.jpg',
    encoding: '7bit',
    mimetype: 'image/jpeg',
    size: 1024 * 1024, // 1MB
    buffer: Buffer.from('fake image data'),
    destination: '',
    filename: '',
    path: '',
    stream: null as any,
  };

  beforeEach(async () => {
    mockUserRepository = {
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      count: jest.fn(),
      find: jest.fn(),
    };

    mockCloudinaryService = {
      uploadImage: jest.fn(),
      deleteImage: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: CloudinaryService,
          useValue: mockCloudinaryService,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  describe('create user with photo upload', () => {
    const createUserDto = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      phone: '+1234567890',
      role: Role.ADMIN,
    };

    it('should create user with photo successfully', async () => {
      // Arrange
      const mockUploadResult = {
        public_id: 'user-photos/test123',
        secure_url: 'https://cloudinary.com/image.jpg',
        width: 500,
        height: 500,
        format: 'jpg',
        resource_type: 'image',
      };

      mockUserRepository.findOne = jest.fn().mockResolvedValue(null); // No existing user
      mockCloudinaryService.uploadImage = jest
        .fn()
        .mockResolvedValue(mockUploadResult);
      mockUserRepository.create = jest.fn().mockReturnValue({
        ...createUserDto,
        photoUrl: mockUploadResult.secure_url,
        photoPublicId: mockUploadResult.public_id,
      });
      mockUserRepository.save = jest.fn().mockResolvedValue({
        id: 1,
        ...createUserDto,
        photoUrl: mockUploadResult.secure_url,
        photoPublicId: mockUploadResult.public_id,
      });

      // Act
      const result = await service.create(
        createUserDto,
        mockSuperAdmin,
        mockFile,
      );

      // Assert
      expect(mockCloudinaryService.uploadImage).toHaveBeenCalledWith(
        mockFile,
        'user-photos',
      );
      expect(mockUserRepository.save).toHaveBeenCalled();
      expect(result.photoUrl).toBe(mockUploadResult.secure_url);
      expect(result.photoPublicId).toBe(mockUploadResult.public_id);
    });

    it('should rollback photo upload if database save fails', async () => {
      // Arrange
      const mockUploadResult = {
        public_id: 'user-photos/test123',
        secure_url: 'https://cloudinary.com/image.jpg',
        width: 500,
        height: 500,
        format: 'jpg',
        resource_type: 'image',
      };

      mockUserRepository.findOne = jest.fn().mockResolvedValue(null);
      mockCloudinaryService.uploadImage = jest
        .fn()
        .mockResolvedValue(mockUploadResult);
      mockUserRepository.create = jest.fn().mockReturnValue({});
      mockUserRepository.save = jest
        .fn()
        .mockRejectedValue(new Error('Database error'));
      mockCloudinaryService.deleteImage = jest
        .fn()
        .mockResolvedValue(undefined);

      // Act & Assert
      await expect(
        service.create(createUserDto, mockSuperAdmin, mockFile),
      ).rejects.toThrow('Database error');

      expect(mockCloudinaryService.uploadImage).toHaveBeenCalled();
      expect(mockCloudinaryService.deleteImage).toHaveBeenCalledWith(
        mockUploadResult.public_id,
      );
    });

    it('should reject invalid file types', async () => {
      // Arrange
      const invalidFile = {
        ...mockFile,
        mimetype: 'text/plain',
      };

      mockUserRepository.findOne = jest.fn().mockResolvedValue(null);

      // Act & Assert
      await expect(
        service.create(createUserDto, mockSuperAdmin, invalidFile),
      ).rejects.toThrow(BadRequestException);

      expect(mockCloudinaryService.uploadImage).not.toHaveBeenCalled();
    });

    it('should reject files that are too large', async () => {
      // Arrange
      const largeFile = {
        ...mockFile,
        size: 10 * 1024 * 1024, // 10MB (exceeds 5MB limit)
      };

      mockUserRepository.findOne = jest.fn().mockResolvedValue(null);

      // Act & Assert
      await expect(
        service.create(createUserDto, mockSuperAdmin, largeFile),
      ).rejects.toThrow(BadRequestException);

      expect(mockCloudinaryService.uploadImage).not.toHaveBeenCalled();
    });

    it('should create user without photo when no file is provided', async () => {
      // Arrange
      mockUserRepository.findOne = jest.fn().mockResolvedValue(null);
      mockUserRepository.create = jest.fn().mockReturnValue(createUserDto);
      mockUserRepository.save = jest.fn().mockResolvedValue({
        id: 1,
        ...createUserDto,
        photoUrl: undefined,
        photoPublicId: undefined,
      });

      // Act
      const result = await service.create(createUserDto, mockSuperAdmin);

      // Assert
      expect(mockCloudinaryService.uploadImage).not.toHaveBeenCalled();
      expect(result.photoUrl).toBeUndefined();
      expect(result.photoPublicId).toBeUndefined();
    });

    it('should handle cloudinary upload failure gracefully', async () => {
      // Arrange
      mockUserRepository.findOne = jest.fn().mockResolvedValue(null);
      mockCloudinaryService.uploadImage = jest
        .fn()
        .mockRejectedValue(
          new BadRequestException('Failed to upload image to Cloudinary'),
        );

      // Act & Assert
      await expect(
        service.create(createUserDto, mockSuperAdmin, mockFile),
      ).rejects.toThrow(BadRequestException);

      expect(mockUserRepository.save).not.toHaveBeenCalled();
    });
  });
});
