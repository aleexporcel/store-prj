import { IsString, IsArray, IsOptional } from 'class-validator';
import { ProductList } from './productList.dto';

export class UpdateOrderDto {
  @IsString()
  @IsOptional()
  clientName?: string;

  @IsOptional()
  picture: string;

  total: number;

  @IsArray()
  productList: ProductList[];
}
