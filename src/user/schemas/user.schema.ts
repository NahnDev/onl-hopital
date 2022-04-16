import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, plainToClass } from 'class-transformer';
import { ExposeId } from 'src/decorators/export-id.decorator';
import { USER_ROLE } from 'src/enum/USER_ROLE';

@Schema()
export class User {
  @ExposeId()
  _id: string;

  @ApiProperty()
  @Prop({ type: String, required: true, unique: true })
  email: string;

  @ApiProperty()
  @Prop({ type: String })
  avatar: string;

  @ApiProperty()
  @Prop({ type: String, required: true })
  name: string;

  @Exclude({ toPlainOnly: true })
  @ApiProperty()
  @Prop({ type: String, required: true })
  password: string;

  @ApiProperty()
  @Prop({
    type: String,
    enum: USER_ROLE,
    required: true,
    default: USER_ROLE.BASIC,
  })
  role: USER_ROLE;
}

export type UserDoc = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.methods.toJSON = function (): User {
  return plainToClass(User, this.toObject());
};
