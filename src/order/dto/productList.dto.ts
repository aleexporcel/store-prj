import { IsString, IsNotEmpty } from 'class-validator';

export class ProductList {
  @IsString()
  @IsNotEmpty()
  sku: string;
}
