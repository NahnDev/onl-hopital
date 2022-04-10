import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { plainToClass, Type } from 'class-transformer';
import { ExposeId } from 'src/decorators/export-id.decorator';

@Schema()
export class Profile {
  @ApiProperty()
  @ExposeId()
  _id: string;

  @ApiProperty()
  @Prop({ type: String, required: true })
  name: string;

  @ApiProperty()
  @Prop({ type: String, required: true })
  image: string;

  @ApiProperty()
  @Prop({ type: String, required: true, default: '' })
  phone?: string;

  @ApiProperty()
  @Prop({ type: Number, required: true, default: 0 })
  age?: number;

  @ApiProperty()
  @Prop({ type: String, enum: ['MALE', 'FEMALE'], required: true })
  sex: 'MALE' | 'FEMALE';

  @ApiProperty()
  @Prop({ type: String, required: true })
  address?: string;

  @ApiProperty()
  @Type(() => History)
  @Prop({
    type: [String],
    required: true,
    ref: 'History',
    autopopulate: true,
    default: [],
  })
  histories: History[];
}

export type ProfileDoc = Document & Profile;
export const ProfileSchema = SchemaFactory.createForClass(Profile);
ProfileSchema.methods.toJSON = function () {
  return plainToClass(Profile, this.toObject());
};
