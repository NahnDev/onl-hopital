import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { ExposeId } from 'src/decorators/export-id.decorator';

@Schema()
export class History {
  @ApiProperty()
  @ExposeId()
  _id: string;

  @ApiProperty()
  @Prop({ type: String, required: true })
  name: string;
}

export type HistoryDoc = Document & History;
export const HistorySchema = SchemaFactory.createForClass(History);
HistorySchema.methods.toJSON = function () {
  return plainToClass(History, this.toObject());
};
