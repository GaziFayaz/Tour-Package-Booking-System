import {
  Injectable,
  NotFoundException,
  ConflictException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { Role } from '../common/enums/role.enum';
import {
  CloudinaryService,
  CloudinaryFolders,
} from '../cloudinary/cloudinary.service';
import * as bcrypt from 'bcryptjs';
import { ConfigService } from '@nestjs/config';
import type { JwtUser } from '../auth/strategies/jwt.strategy';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private cloudinaryService: CloudinaryService,
    private configService: ConfigService,
  ) {}

  async create(
    createUserDto: CreateUserDto,
    currentUser?: User,
    photo?: Express.Multer.File,
  ): Promise<User> {
    let uploadedPhotoPublicId: string | null = null;

    try {
      // Check if user already exists
      const existingUser = await this.usersRepository.findOne({
        where: { email: createUserDto.email },
      });

      if (existingUser) {
        throw new ConflictException('User with this email already exists');
      }

      // Role validation - only super admins can create users
      if (!currentUser || currentUser.role !== Role.SUPER_ADMIN) {
        throw new ForbiddenException('Only super admins can create users');
      }

      // Ensure role is provided and valid
      if (
        !createUserDto.role ||
        (createUserDto.role !== Role.ADMIN &&
          createUserDto.role !== Role.SUPER_ADMIN)
      ) {
        throw new ForbiddenException(
          'Role must be either ADMIN or SUPER_ADMIN',
        );
      }

      // Validate and upload photo if provided
      let photoUrl: string | null = null;
      let photoPublicId: string | null = null;

      if (photo) {
        // Validate the photo file
        this.validatePhotoFile(photo);

        // Upload to Cloudinary first
        const uploadResult = await this.cloudinaryService.uploadImage(
          photo,
          CloudinaryFolders.USER_PHOTOS,
        );

        photoUrl = uploadResult.secure_url;
        photoPublicId = uploadResult.public_id;
        uploadedPhotoPublicId = photoPublicId; // Store for potential rollback
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(createUserDto.password, 12);

      // Create user object
      const userData: any = {
        ...createUserDto,
        password: hashedPassword,
        role: createUserDto.role,
      };

      // Add photo data if uploaded
      if (photo && photoUrl && photoPublicId) {
        userData.photoUrl = photoUrl;
        userData.photoPublicId = photoPublicId;
      }

      const user = this.usersRepository.create(userData);

      // Save user to database
      const savedUser = await this.usersRepository.save(user);

      // Reset uploadedPhotoPublicId since operation succeeded
      uploadedPhotoPublicId = null;

      // Return the saved user - TypeORM save() returns the saved entity
      return Array.isArray(savedUser) ? savedUser[0] : savedUser;
    } catch (error) {
      // Rollback: Delete uploaded photo if database operation failed
      if (uploadedPhotoPublicId) {
        try {
          await this.cloudinaryService.deleteImage(uploadedPhotoPublicId);
        } catch (deleteError) {
          console.error('Failed to rollback uploaded photo:', deleteError);
        }
      }

      // Re-throw the original error
      throw error;
    }
  }

  private validatePhotoFile(file: Express.Multer.File): void {
    if (!file) {
      throw new BadRequestException('No photo file provided');
    }

    // Check file size (5MB default)
    const maxSize = this.configService.get('MAX_FILE_SIZE', 5242880);
    if (file.size > maxSize) {
      throw new BadRequestException(
        `Photo file too large. Maximum size is ${maxSize / 1024 / 1024}MB`,
      );
    }

    // Check file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        `Invalid photo file type. Allowed types: ${allowedTypes.join(', ')}`,
      );
    }

    // Check if file is actually an image
    if (!file.mimetype.startsWith('image/')) {
      throw new BadRequestException('Photo file must be an image');
    }
  }

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find({
      relations: ['bookings'],
    });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['bookings'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.findOne({
      where: { email },
      relations: ['bookings'],
    });
  }

  async update(
    id: number,
    updateUserDto: UpdateUserDto,
    currentUser?: User,
    photo?: Express.Multer.File,
  ): Promise<User> {
    let uploadedPhotoPublicId: string | null = null;
    let previousPhotoPublicId: string | null = null;

    try {
      const userToUpdate = await this.findOne(id);

      // Store previous photo for potential rollback
      previousPhotoPublicId = userToUpdate.photoPublicId;

      // Role validation - only super admins can change roles
      if (updateUserDto.role && updateUserDto.role !== userToUpdate.role) {
        if (!currentUser || currentUser.role !== Role.SUPER_ADMIN) {
          throw new ForbiddenException(
            'Only super admins can change user roles',
          );
        }

        // Prevent self-demotion of the last super admin
        if (
          userToUpdate.role === Role.SUPER_ADMIN &&
          updateUserDto.role !== Role.SUPER_ADMIN
        ) {
          const superAdminCount = await this.usersRepository.count({
            where: { role: Role.SUPER_ADMIN },
          });

          if (superAdminCount <= 1) {
            throw new ForbiddenException(
              'Cannot remove the role of the last super admin',
            );
          }
        }
      }

      // Handle photo update if provided
      let photoUrl: string | null =
        updateUserDto.photoUrl || userToUpdate.photoUrl;
      let photoPublicId: string | null = userToUpdate.photoPublicId;

      if (photo) {
        // Validate the photo file
        this.validatePhotoFile(photo);

        // Upload new photo to Cloudinary first
        const uploadResult = await this.cloudinaryService.uploadImage(
          photo,
          CloudinaryFolders.USER_PHOTOS,
          `user-${id}`,
        );

        photoUrl = uploadResult.secure_url;
        photoPublicId = uploadResult.public_id;
        uploadedPhotoPublicId = photoPublicId; // Store for potential rollback
      }

      // Prepare update data
      const updateData: any = {
        ...updateUserDto,
      };

      // Add photo data if photo was uploaded
      if (photo) {
        updateData.photoUrl = photoUrl;
        updateData.photoPublicId = photoPublicId;
      }

      // Perform database update
      await this.usersRepository.update(id, updateData);

      // Database operation succeeded - now safely delete the previous photo
      if (
        photo &&
        previousPhotoPublicId &&
        previousPhotoPublicId !== photoPublicId
      ) {
        try {
          await this.cloudinaryService.deleteImage(previousPhotoPublicId);
        } catch (deleteError) {
          // Log error but don't fail the operation since database update succeeded
          console.error(
            `Failed to delete previous photo ${previousPhotoPublicId} for user ${id}:`,
            deleteError,
          );
        }
      }

      // Reset uploadedPhotoPublicId since operation succeeded
      uploadedPhotoPublicId = null;

      return this.findOne(id);
    } catch (error) {
      // Rollback: Delete newly uploaded photo if database operation failed
      if (uploadedPhotoPublicId) {
        try {
          await this.cloudinaryService.deleteImage(uploadedPhotoPublicId);
        } catch (deleteError) {
          console.error(
            'Failed to rollback newly uploaded photo:',
            deleteError,
          );
        }
      }

      // Re-throw the original error
      throw error;
    }
  }

  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);

    // Delete photo from Cloudinary before deleting user
    if (user.photoPublicId) {
      await this.cloudinaryService.deleteImage(user.photoPublicId);
    }

    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
}
