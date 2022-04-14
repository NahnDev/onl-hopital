import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { ExposeId } from 'src/decorators/export-id.decorator';

@Schema()
export class Service {
  @ApiProperty()
  @ExposeId()
  _id: string;

  @ApiProperty()
  @Prop({ type: String, required: true, unique: true })
  name: string;
}

export type ServiceDoc = Document & Service;
export const ServiceSchema = SchemaFactory.createForClass(Service);
ServiceSchema.methods.toJSON = function () {
  return plainToClass(Service, this.toObject());
};
