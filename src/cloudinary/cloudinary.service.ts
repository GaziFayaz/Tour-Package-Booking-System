import { Injectable, BadRequestException } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';

export interface CloudinaryResponse {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
}

export enum CloudinaryFolders {
  USER_PHOTOS = 'users',
  // PACKAGE_IMAGES = 'packages',
  // BOOKING_DOCUMENTS = 'bookings',
  // GENERAL_ASSETS = 'assets',
}

@Injectable()
export class CloudinaryService {
  private readonly baseFolder: string;

  constructor(private configService: ConfigService) {
    this.baseFolder = this.configService.get(
      'CLOUDINARY_FOLDER',
      'tour-management-system',
    );
  }

  async uploadImage(
    file: Express.Multer.File,
    folderType: CloudinaryFolders,
    publicId?: string,
  ): Promise<CloudinaryResponse> {
    try {
      const fullFolderPath = `${this.baseFolder}/${folderType}`;

      const uploadOptions: any = {
        folder: fullFolderPath,
        resource_type: 'image',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        transformation: [
          { width: 500, height: 500, crop: 'limit', quality: 'auto:good' },
          { fetch_format: 'auto' },
        ],
      };

      if (publicId) {
        uploadOptions.public_id = `${fullFolderPath}/${publicId}`;
        uploadOptions.overwrite = true;
      }

      return new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(uploadOptions, (error, result) => {
            if (error) {
              reject(
                new BadRequestException('Failed to upload image to Cloudinary'),
              );
            } else {
              resolve(result as CloudinaryResponse);
            }
          })
          .end(file.buffer);
      });
    } catch (error) {
      throw new BadRequestException('Image upload failed');
    }
  }

  async deleteImage(publicId: string): Promise<void> {
    try {
      await cloudinary.uploader.destroy(publicId);
    } catch (error) {
      // Log error but don't throw - old image might already be deleted
      console.error('Failed to delete image from Cloudinary:', error);
    }
  }

  extractPublicIdFromUrl(url: string): string | null {
    try {
      const regex = /\/v\d+\/(.+)\./;
      const match = url.match(regex);
      return match ? match[1] : null;
    } catch {
      return null;
    }
  }

  // Helper method to get full folder path
  getFullFolderPath(folderType: CloudinaryFolders): string {
    return `${this.baseFolder}/${folderType}`;
  }
}
