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
import type { JwtUser } from '../auth/strategies/jwt.strategy';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  @Roles(Role.SUPER_ADMIN) // Only super admins can update users (including role changes)
  @UseInterceptors(
    FileInterceptor('photo', {
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          return callback(new Error('Only image files are allowed!'), false);
        }
        callback(null, true);
      },
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
      },
    }),
  )
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @GetUser() currentUser: JwtUser,
    @UploadedFile() photo?: Express.Multer.File,
  ): Promise<User> {
    try {
      const fullCurrentUser = await this.usersService.findOne(
        currentUser.userId,
      );
      return await this.usersService.update(
        +id,
        updateUserDto,
        fullCurrentUser,
        photo,
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
}
