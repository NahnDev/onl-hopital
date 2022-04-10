import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNumber, IsString } from 'class-validator';

export class CreateAppointmentDto {
  @ApiProperty()
  @IsNumber()
  date: number;

  @ApiProperty()
  @IsNumber()
  timePeriod: number;

  @ApiProperty()
  @IsString()
  note: string;

  @ApiProperty()
  @IsMongoId()
  profile: string;

  @ApiProperty()
  @IsMongoId()
  doctor: string;
}
