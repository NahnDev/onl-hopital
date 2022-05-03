import { ApiProperty } from '@nestjs/swagger';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ExposeId } from 'src/decorators/export-id.decorator';
import { plainToClass } from 'class-transformer';
import { SchemaTypes } from 'mongoose';

@Schema()
export class Working {
  @ApiProperty()
  @Prop({ type: Number, required: true })
  date: number;

  @ApiProperty()
  @Prop({ type: Number, required: true })
  time: number;

  @ApiProperty()
  @ExposeId()
  @Prop({ type: SchemaTypes.ObjectId, required: true })
  doctor: string;
}

export type WorkingDoc = Document & Working;
export const WorkingSchema = SchemaFactory.createForClass(Working);
WorkingSchema.methods.toJSON = function () {
  return plainToClass(Working, this.toObject());
};
