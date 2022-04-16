import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Appointment, AppointmentDoc } from './schemas/appointment.schema';
import { Model } from 'mongoose';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectModel(Appointment.name)
    private readonly apModel: Model<AppointmentDoc>,
  ) {}
  async create(createAppointmentDto: CreateAppointmentDto, uId: string) {
    console.log(createAppointmentDto);
    const apDoc = new this.apModel({ ...createAppointmentDto, user: uId });
    await apDoc.save();
    return apDoc.toJSON();
  }

  async findAll(filter: Partial<Pick<Appointment, 'user'>> = {}) {
    return (
      await this.apModel.find({
        ...filter,
        time: { $gt: Date.now() - 60 * 60 * 1000 },
      })
    ).map((doc) => doc.toJSON());
  }

  async findOne(_id: string) {
    const apDoc = await this.apModel.findById(_id);
    if (!apDoc) return null;
    return apDoc.toJSON();
  }

  async update(_id: string, updateAppointmentDto: UpdateAppointmentDto) {
    await this.apModel.updateOne({ _id }, updateAppointmentDto);
  }

  async remove(_id: string) {
    await this.apModel.deleteOne({ _id });
  }
}
