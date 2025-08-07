import { IsNotEmpty, IsNumber, IsString, IsOptional, IsEmail, IsPhoneNumber, IsArray, ValidateNested, IsEnum, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';
import { PassengerType, Gender } from './booking.entity';

export class CreateConcernPersonDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  address: string;
}

export class CreatePassengerDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsEnum(PassengerType)
  type: PassengerType;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsDateString()
  dateOfBirth: string;

  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;

  @IsOptional()
  @IsString()
  passportNumber?: string;

  @IsOptional()
  @IsString()
  passportScanUrl?: string;

  @IsOptional()
  @IsString()
  tShirtSize?: string;

  @IsOptional()
  @IsString()
  foodRestrictions?: string;

  @IsOptional()
  @IsString()
  specialInstructions?: string;

  @IsOptional()
  @IsString()
  sicknessInformation?: string;

  @IsOptional()
  @IsString()
  pickupPoint?: string;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  adultAddonIds?: number[];

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  childAddonIds?: number[];

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  infantAddonIds?: number[];
}

export class CreateBookingDto {
  @IsNotEmpty()
  @IsNumber()
  packageId: number;

  @IsNotEmpty()
  @IsNumber()
  slotId: number;

  @IsOptional()
  @IsString()
  specialInstructions?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateConcernPersonDto)
  concernPerson: CreateConcernPersonDto;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePassengerDto)
  passengers: CreatePassengerDto[];
}
