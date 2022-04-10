import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { ExposeId } from 'src/decorators/export-id.decorator';

@Schema()
export class Doctor {
  @ApiProperty()
  @ExposeId()
  _id: string;

  @ApiProperty()
  @Prop({ type: String, required: true })
  name: string;

  @ApiProperty()
  @Prop({ type: String, required: true })
  avatar: string;

  @ApiProperty()
  @Prop({ type: String, required: true })
  introduce: string;

  @ApiProperty()
  @Prop({ type: [String], required: true, default: [] })
  info: string[];

  @ApiProperty()
  @Prop({ type: [String], required: true, default: [] })
  education: string[];

  @ApiProperty()
  @Prop({ type: String, required: true })
  phone: string;

  @ApiProperty()
  @Prop({ type: String, required: true })
  email: string;
}

export type DoctorDoc = Document & Doctor;
export const DoctorSchema = SchemaFactory.createForClass(Doctor);
DoctorSchema.methods.toJSON = function () {
  return plainToClass(Doctor, this.toObject());
};
