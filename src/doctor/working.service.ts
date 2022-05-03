import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Model } from 'mongoose';
import { Working, WorkingDoc } from './schemas/woking.schema';

@Injectable()
export class WorkingService {
  constructor(
    @InjectModel(Working.name) private readonly workingModel: Model<WorkingDoc>,
  ) {}
  async add(doctor: string, date: number, time: number) {
    const workingDoc = new this.workingModel({
      doctor,
      date: this.dateToDateID(date),
      time,
    });
    await workingDoc.save();
    return workingDoc.toJSON();
  }
  async remove(doctor: string, date: number, time: number) {
    this.workingModel.deleteOne({
      doctor,
      date: this.dateToDateID(date),
      time,
    });
  }
  async getFreeTimes(doctor: string, date: number) {
    const times = (
      await this.workingModel.find({
        doctor,
        date: this.dateToDateID(date),
      })
    ).map((doc) => doc.toJSON().time);
    return [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19].reduce(
      (value, curItem) => {
        if (times.includes(curItem)) return value;
        return [...value, curItem];
      },
      [],
    );
  }

  dateToDateID(date: number) {
    const y = new Date(date).getFullYear();
    const m = new Date(date).getMonth();
    const d = new Date(date).getDate();
    return d + m * 40 + y * 480;
  }
}
