import {
  Controller,
  Post,
  UseGuards,
  Body,
  Get,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { Roles } from './decorators/roles.decorator';
import { CreateUserDto, LoginDto } from '../users/user.dto';
import { LoginResponse } from './interfaces/auth.interface';
import { GetUser } from './decorators/get-user.decorator';
import { Role } from '../common/enums/role.enum';
import type { JwtUser } from './strategies/jwt.strategy';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<LoginResponse> {
    return this.authService.loginWithCredentials(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@GetUser() user: JwtUser): JwtUser {
    return user;
  }
}
