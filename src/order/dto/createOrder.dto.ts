import { IsArray, IsPositive, IsString } from 'class-validator';
import { ProductList } from './productList.dto';

export class CreateOrderDto {
  @IsString()
  clientName: string;

  @IsPositive()
  total: number;

  @IsArray()
  productList: ProductList[];
}
