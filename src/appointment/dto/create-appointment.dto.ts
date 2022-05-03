import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsMongoId,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { SchemaTypes } from 'mongoose';

export class CreateAppointmentDto {
  @ApiProperty()
  @IsNumber()
  date: number;

  @ApiProperty()
  @IsNumber()
  @Min(9)
  @Max(19)
  time: number;

  @ApiProperty()
  @IsString()
  note: string;

  @ApiProperty()
  @IsMongoId()
  profile: string;

  @ApiProperty()
  @IsMongoId()
  doctor: string;

  @ApiProperty()
  @IsArray()
  @Type(() => SchemaTypes.ObjectId)
  services: string[];
}
