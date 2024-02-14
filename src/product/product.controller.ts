import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UploadedFile,
  BadRequestException,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/createProduct.dto';
import { PictureUpload } from './picture.upload';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseInterceptors(FileInterceptor('picture'))
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() picture: PictureUpload,
  ) {
    parseInt(createProductDto.price, 10);

    return await this.productService
      .create(createProductDto, picture)
      .catch((err) => {
        if (err.code === 11000) {
          throw new BadRequestException(
            `The product with sku: ${createProductDto.sku} already exists`,
          );
        }
        throw err;
      });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.productService.findOne(id);
  }

  @Get()
  async findAll() {
    return await this.productService.findAll();
  }
}
