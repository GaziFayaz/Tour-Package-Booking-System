import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FileValidationService {
  constructor(private configService: ConfigService) {}

  validateImageFile(file: Express.Multer.File): void {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    // Check file size
    const maxSize = this.configService.get('MAX_FILE_SIZE', 5242880); // Default 5MB
    if (file.size > maxSize) {
      throw new BadRequestException(
        `File too large. Maximum size is ${maxSize / 1024 / 1024}MB`,
      );
    }

    // Check file type
    const allowedTypes = this.configService
      .get('ALLOWED_FILE_TYPES', 'image/jpeg,image/jpg,image/png,image/webp')
      .split(',');

    if (!allowedTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        `Invalid file type. Allowed types: ${allowedTypes.join(', ')}`,
      );
    }

    // Check if file is actually an image (basic validation)
    if (!file.mimetype.startsWith('image/')) {
      throw new BadRequestException('File must be an image');
    }
  }
}
