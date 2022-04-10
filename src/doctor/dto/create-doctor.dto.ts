import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsString } from 'class-validator';

export class CreateDoctorDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  avatar: string;

  @ApiProperty()
  @IsString()
  introduce: string;

  @ApiProperty()
  @IsArray()
  @Type(() => String)
  info: string[];

  @ApiProperty()
  @IsArray()
  @Type(() => String)
  education: string[];

  @ApiProperty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsString()
  email: string;
}
