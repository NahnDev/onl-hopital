import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDoc } from './schemas/user.schema';
import { Model } from 'mongoose';
import { compare, hash } from 'bcryptjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDoc>,
    private readonly config: ConfigService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const userDoc = new this.userModel({});
    await userDoc.save();
    const user = userDoc.toJSON();
    return user;
  }

  async findAll() {
    return (await this.userModel.find()).map((doc) => doc.toJSON());
  }

  async findOne(_id: string) {
    const userDoc = await this.userModel.findById(_id);
    if (userDoc) return null;
    return userDoc.toJSON();
  }

  async update(_id: string, updateUserDto: UpdateUserDto) {
    await this.userModel.updateOne({ _id }, updateUserDto);
  }

  async remove(_id: string) {
    await this.userModel.remove({ _id });
  }

  async findWithEmail(email: string) {
    const userDoc = await this.userModel.findOne({ email });
    if (!userDoc) return null;
    return userDoc.toJSON();
  }
  async hash(password) {
    return await hash(password, 1);
  }
  async validAccount(email: string, password: string) {
    const user = await this.findWithEmail(email);
    if (!user) return false;
    return await compare(password, user.password);
  }
}
