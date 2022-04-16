import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { CreateHistoryDto } from 'src/history/dto/create-history.dto';
import { HistoryService } from 'src/history/history.service';
import { RequestUser } from 'src/decorators/request-user.decorator';
import { User } from 'src/user/schemas/user.schema';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  create(
    @Body() createProfileDto: CreateProfileDto,
    @RequestUser() user: User,
  ) {
    return this.profileService.create(createProfileDto, user._id);
  }

  @Get()
  findAll(@RequestUser() user: User) {
    return this.profileService.findAll({ user: user._id });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profileService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(id, updateProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profileService.remove(id);
  }

  @Post(':id/histories')
  async addHistory(
    @Param('id') id: string,
    @Body() createHistoryDto: CreateHistoryDto,
  ) {
    await this.profileService.addHistory(id, createHistoryDto);
  }
}
