import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Model } from 'mongoose';
import { Doctor, DoctorDoc } from './schemas/doctor.schema';

@Injectable()
export class DoctorService {
  constructor(
    @InjectModel(Doctor.name) private readonly doctorModel: Model<DoctorDoc>,
  ) {}
  async create(createDoctorDto: CreateDoctorDto) {
    const doctorDoc = new this.doctorModel(createDoctorDto);
    await doctorDoc.save();
    return doctorDoc.toJSON();
  }

  async findAll() {
    return (await this.doctorModel.find()).map((doc) => doc.toJSON());
  }

  async findOne(_id: string) {
    return (await this.doctorModel.findById(_id)).toJSON();
  }

  async update(_id: string, updateDoctorDto: UpdateDoctorDto) {
    await this.doctorModel.updateOne({ _id }, updateDoctorDto);
  }

  remove(_id: string) {
    this.doctorModel.deleteOne({ _id });
  }
}
