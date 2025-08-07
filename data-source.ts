import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

// Load environment variables
config();

const configService = new ConfigService();

export default new DataSource({
  type: 'mysql',
  host: configService.get('DB_HOST') || 'localhost',
  port: +configService.get('DB_PORT') || 3306,
  username: configService.get('DB_USERNAME') || 'root',
  password: configService.get('DB_PASSWORD') || 'password',
  database: configService.get('DB_DATABASE') || 'nestjs_app',
  entities: [__dirname + '/src/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/src/migrations/*{.ts,.js}'],
  synchronize: false, // Always false for migrations
});
