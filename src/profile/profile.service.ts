import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile, ProfileDoc } from './schemas/profile.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name) private readonly profileModel: Model<ProfileDoc>,
  ) {}
  async create(createProfileDto: CreateProfileDto) {
    const profileDoc = new this.profileModel(createProfileDto);
    await profileDoc.save();
    return profileDoc.toJSON();
  }

  async findAll() {
    return (await this.profileModel.find()).map((doc) => doc.toJSON());
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
}
