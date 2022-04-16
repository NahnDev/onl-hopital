import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile, ProfileDoc } from './schemas/profile.schema';
import { Model } from 'mongoose';
import { CreateHistoryDto } from 'src/history/dto/create-history.dto';
import { HistoryService } from 'src/history/history.service';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name) private readonly profileModel: Model<ProfileDoc>,
    private readonly historyService: HistoryService,
  ) {}
  async create(createProfileDto: CreateProfileDto, actor: string) {
    const profileDoc = new this.profileModel({
      ...createProfileDto,
      user: actor,
    });
    await profileDoc.save();
    return profileDoc.toJSON();
  }

  async findAll(filter: Partial<Pick<Profile, 'user'>> & {} = {}) {
    return (await this.profileModel.find(filter)).map((doc) => doc.toJSON());
  }

  async findOne(_id: string) {
    return (await this.profileModel.findById(_id)).toJSON();
  }

  async update(_id: string, updateProfileDto: UpdateProfileDto) {
    await this.profileModel.updateOne({ _id }, updateProfileDto);
  }

  async remove(_id: string) {
    this.profileModel.remove({ _id });
  }

  async addHistory(_id: string, createHistoryDto: CreateHistoryDto) {
    const historyDocument = await this.historyService.create(createHistoryDto);
    await this.profileModel.updateOne(
      { _id },
      { $push: { histories: historyDocument._id } },
    );
  }
}
