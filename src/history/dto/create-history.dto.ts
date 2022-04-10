import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateHistoryDto {
  @ApiProperty()
  @IsString()
  name: string;
}
