import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
  versionKey: false,
})
export class Product {
  @Prop({
    unique: true,
    trim: true,
  })
  sku: string;
  @Prop()
  name: string;
  @Prop()
  picture: string;
  @Prop()
  price: string;
}
export const productSchema = SchemaFactory.createForClass(Product);
