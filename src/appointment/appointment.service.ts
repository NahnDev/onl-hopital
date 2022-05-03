import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Appointment, AppointmentDoc } from './schemas/appointment.schema';
import { Model } from 'mongoose';
import { WorkingService } from 'src/doctor/working.service';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectModel(Appointment.name)
    private readonly apModel: Model<AppointmentDoc>,
    private readonly workingService: WorkingService,
  ) {}
  async create(createAppointmentDto: CreateAppointmentDto, uId: string) {
    console.log(createAppointmentDto);
    const apDoc = new this.apModel({ ...createAppointmentDto, user: uId });
    await apDoc.save();
    this.workingService.add(
      createAppointmentDto.doctor,
      createAppointmentDto.date,
      createAppointmentDto.time,
    );
    return apDoc.toJSON();
  }

  async findAll(filter: Partial<Pick<Appointment, 'user'>> = {}) {
    return (
      await this.apModel.find({
        ...filter,
        date: {
          $gt:
            Math.floor(Date.now() / (24 * 60 * 60 * 1000)) *
            (24 * 60 * 60 * 1000),
        },
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
    const ap = await this.findOne(_id);
    this.workingService.remove(ap.doctor._id, ap.date, ap.time);
    await this.apModel.deleteOne({ _id });
  }

  async getFreeTimes(dId: string, date: number) {
    const timeStartDate =
      Math.floor(date / (24 * 60 * 60 * 1000)) * (24 * 60 * 60 * 1000);
    const timeEndDate = timeStartDate + 24 * 60 * 60 * 1000;
    const workingTime = (
      await this.apModel.find({
        doctor: dId,
        date: { $and: [{ $gt: timeStartDate }, { $lt: timeEndDate }] },
      })
    ).map((item) => item.toJSON().time);
    return workingTime;
  }
}
