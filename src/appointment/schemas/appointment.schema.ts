import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { ExposeId } from 'src/decorators/export-id.decorator';
import { plainToClass, Type } from 'class-transformer';
import { Profile } from 'src/profile/schemas/profile.schema';
import { Doctor } from 'src/doctor/schemas/doctor.schema';

@Schema()
export class Appointment {
  @ApiProperty()
  @ExposeId()
  _id: string;

  @ApiProperty()
  @Prop({ type: Number, required: true })
  date: number;

  @ApiProperty()
  @Prop({ type: Number, required: true })
  timePeriod: number;

  @ApiProperty()
  @Prop({ type: String })
  note: string;

  @ApiProperty()
  @Type(() => Profile)
  @Prop({
    type: SchemaTypes.ObjectId,
    required: true,
    ref: 'Profile',
    autopopulate: true,
  })
  profile: Profile;

  @ApiProperty()
  @Type(() => Doctor)
  @Prop({
    type: SchemaTypes.ObjectId,
    required: true,
    ref: 'Doctor',
    autopopulate: true,
  })
  doctor: Doctor;
}

export type AppointmentDoc = Document & Appointment;
export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
AppointmentSchema.methods.toJSON = function () {
  return plainToClass(Appointment, this.toObject());
};
