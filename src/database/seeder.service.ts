import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';
import { Role } from '../common/enums/role.enum';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class SeederService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private configService: ConfigService,
  ) {}

  async onApplicationBootstrap() {
    await this.createSuperAdmin();
  }

  private async createSuperAdmin() {
    // Extract all configuration values at once
    const superAdminConfig = {
      email:
        this.configService.get('SUPER_ADMIN_EMAIL') || 'superadmin@example.com',
      password:
        this.configService.get('SUPER_ADMIN_PASSWORD') || 'SuperAdmin123!',
      name: this.configService.get('SUPER_ADMIN_NAME') || 'Super Administrator',
      phone: this.configService.get('SUPER_ADMIN_PHONE') || '+1234567890',
    };

    const existingSuperAdmin = await this.usersRepository.findOne({
      where: { email: superAdminConfig.email },
    });

    if (existingSuperAdmin) {
      console.log('Super admin already exists');
      return;
    }

    const hashedPassword = await bcrypt.hash(superAdminConfig.password, 12);

    const superAdmin = this.usersRepository.create({
      name: superAdminConfig.name,
      email: superAdminConfig.email,
      password: hashedPassword,
      phone: superAdminConfig.phone,
      role: Role.SUPER_ADMIN,
    });

    await this.usersRepository.save(superAdmin);
    console.log('Super admin created successfully');
    console.log(`Email: ${superAdminConfig.email}`);
    console.log(`Password: ${superAdminConfig.password}`);
  }
}
