import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop({ required: true })
  fullName: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: false })
  age?: number;

  @Prop({ required: false })
  country?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
