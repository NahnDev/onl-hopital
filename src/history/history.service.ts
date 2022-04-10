import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { HistoryDoc, History } from './schemas/history.schema';
import { Model } from 'mongoose';

@Injectable()
export class HistoryService {
  constructor(
    @InjectModel(History.name) private readonly historyModel: Model<HistoryDoc>,
  ) {}
  async create(createHistoryDto: CreateHistoryDto) {
    const historyDoc = new this.historyModel(createHistoryDto);
    await historyDoc.save();
    return historyDoc.toJSON();
  }

  async findAll() {
    return (await this.historyModel.find()).map((doc) => doc.toJSON());
  }

  async findOne(_id: string) {
    return (await this.historyModel.findById(_id)).toJSON();
  }

  async update(_id: string, updateHistoryDto: UpdateHistoryDto) {
    await this.historyModel.updateOne({ _id }, updateHistoryDto);
  }

  remove(_id: string) {
    return "Can't delete a history";
  }
}
