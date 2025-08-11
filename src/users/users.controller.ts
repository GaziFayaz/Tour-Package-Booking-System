import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpException,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
  UploadedFile,
  ParseFilePipeBuilder,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { User } from './user.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { Role } from '../common/enums/role.enum';
import { FileValidationService } from '../files/file-validation.service';
import type { JwtUser } from '../auth/strategies/jwt.strategy';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly fileValidationService: FileValidationService,
  ) {}

  @Post()
  @Roles(Role.SUPER_ADMIN) // Only super admins can create users with roles
  @UseInterceptors(FileInterceptor('photo'))
  async create(
    @Body() createUserDto: CreateUserDto,
    @GetUser() currentUser: JwtUser,
    @UploadedFile()
    photo?: Express.Multer.File,
  ): Promise<User> {
    try {
      const fullCurrentUser = await this.usersService.findOne(
        currentUser.userId,
      );
      return await this.usersService.create(
        createUserDto,
        fullCurrentUser,
        photo,
      );
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to create user',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  @Roles(Role.SUPER_ADMIN, Role.ADMIN) // Only admins and super admins can view all users
  async findAll(): Promise<User[]> {
    try {
      return await this.usersService.findAll();
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to fetch users',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN) // Only admins and super admins can view specific users
  async findOne(@Param('id') id: string): Promise<User> {
    try {
      return await this.usersService.findOne(+id);
    } catch (error) {
      throw new HttpException(
        error.message || 'User not found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Get('email/:email')
  @Roles(Role.SUPER_ADMIN, Role.ADMIN) // Only admins and super admins can search by email
  async findByEmail(@Param('email') email: string): Promise<User> {
    try {
      const user = await this.usersService.findByEmail(email);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return user;
    } catch (error) {
      throw new HttpException(
        error.message || 'User not found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Patch(':id')
  @Roles(Role.SUPER_ADMIN) // Only super admins can update users (including role changes)
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @GetUser() currentUser: JwtUser,
  ): Promise<User> {
    try {
      const fullCurrentUser = await this.usersService.findOne(
        currentUser.userId,
      );
      return await this.usersService.update(
        +id,
        updateUserDto,
        fullCurrentUser,
      );
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to update user',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  @Roles(Role.SUPER_ADMIN) // Only super admins can delete users
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    try {
      await this.usersService.remove(+id);
      return { message: 'User deleted successfully' };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to delete user',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Post(':id/photo')
  @UseInterceptors(FileInterceptor('photo'))
  async uploadPhoto(
    @Param('id') id: string,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jpg|jpeg|png|webp)$/,
        })
        .addMaxSizeValidator({
          maxSize: 5 * 1024 * 1024, // 5MB
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
    @GetUser() currentUser: JwtUser,
  ): Promise<{ message: string; user: User }> {
    try {
      this.fileValidationService.validateImageFile(file);

      const fullCurrentUser = await this.usersService.findOne(
        currentUser.userId,
      );

      const user = await this.usersService.updatePhoto(
        +id,
        file,
        fullCurrentUser,
      );

      return {
        message: 'Photo uploaded successfully',
        user,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to upload photo',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id/photo')
  async removePhoto(
    @Param('id') id: string,
    @GetUser() currentUser: JwtUser,
  ): Promise<{ message: string; user: User }> {
    try {
      const fullCurrentUser = await this.usersService.findOne(
        currentUser.userId,
      );

      const user = await this.usersService.removePhoto(+id, fullCurrentUser);

      return {
        message: 'Photo removed successfully',
        user,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Failed to remove photo',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
