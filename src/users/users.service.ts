import {
  Injectable,
  NotFoundException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { Role } from '../common/enums/role.enum';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(
    createUserDto: CreateUserDto,
    currentUser?: User,
  ): Promise<User> {
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
      throw new ForbiddenException('Role must be either ADMIN or SUPER_ADMIN');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(createUserDto.password, 12);

    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
      role: createUserDto.role,
    });

    return await this.usersRepository.save(user);
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
  ): Promise<User> {
    const userToUpdate = await this.findOne(id);

    // Role validation - only super admins can change roles
    if (updateUserDto.role && updateUserDto.role !== userToUpdate.role) {
      if (!currentUser || currentUser.role !== Role.SUPER_ADMIN) {
        throw new ForbiddenException('Only super admins can change user roles');
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

    await this.usersRepository.update(id, updateUserDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
}
