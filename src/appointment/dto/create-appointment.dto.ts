import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsMongoId, IsNumber, IsString } from 'class-validator';
import { SchemaTypes } from 'mongoose';

export class CreateAppointmentDto {
  @ApiProperty()
  @IsNumber()
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
