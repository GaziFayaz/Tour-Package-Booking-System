import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDto, LoginDto } from '../users/user.dto';
import {
  JwtPayload,
  LoginResponse,
  ValidatedUser,
  UserResponse,
} from './interfaces/auth.interface';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<ValidatedUser | null> {
    try {
      const user = await this.usersService.findByEmail(email);
      if (user) {
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
          const { password, ...result } = user;
          return result;
        }
      }
    } catch (error) {
      return null;
    }
    return null;
  }

  async login(user: ValidatedUser): Promise<LoginResponse> {
    const payload: JwtPayload = {
      email: user.email,
      sub: user.id,
      name: user.name,
    };

    const userResponse: UserResponse = {
      id: user.id,
      email: user.email,
      name: user.name,
      phone: user.phone,
      photoUrl: user.photoUrl,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: userResponse,
    };
  }

  async register(createUserDto: CreateUserDto): Promise<LoginResponse> {
    const user = await this.usersService.create(createUserDto);
    const { password, ...result } = user;
    return this.login(result);
  }

  async loginWithCredentials(loginDto: LoginDto): Promise<LoginResponse> {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.login(user);
  }
}
