import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Order {
  @Prop({
    unique: true,
    trim: true,
    default: () => uuidv4(),
  })
  id: string;

  @Prop()
  clientName: string;

  @Prop()
  total: number;

  @Prop([String])
  productList: string[];
}

export const orderSchema = SchemaFactory.createForClass(Order);
