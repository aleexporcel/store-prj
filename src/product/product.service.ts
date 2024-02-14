import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './schemas/product.schema';
import { Model } from 'mongoose';
import { CreateProductDto } from './dto/createProduct.dto';
import { extname } from 'path';
import { writeFile } from 'fs/promises';
import { PictureUpload } from './picture.upload';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async create(
    createProduct: CreateProductDto,
    picture: PictureUpload,
  ): Promise<Product> {
    const { sku, name, price } = createProduct;
    let filename: string = 'product-no-image.png';

    if (picture) {
      const allowedExtensions = ['.jpg', '.jpeg', '.png'];
      const extension = extname(picture.originalname).toLowerCase();

      if (!allowedExtensions.includes(extension)) {
        throw new BadRequestException('Invalid file extension');
      }

      const maxSize = 5 * 1024 * 1024;
      if (picture.size > maxSize) {
        throw new BadRequestException('File size exceeds the limit (5MB)');
      }

      filename = `${uuidv4()}${extension}`;
      const destinationPath = `./uploads/${filename}`;
      await writeFile(destinationPath, picture.buffer);
    }

    const newProduct = new this.productModel({
      sku,
      name,
      picture: filename,
      price,
    });
    return newProduct.save();
  }

  async findOne(sku: string) {
    const product = await this.productModel.findById(sku);
    if (!product) {
      throw new NotFoundException(`product with sku: ${sku} not found`);
    }
  }

  async findAll() {
    return await this.productModel.find();
  }

  async findProductsBySkus(skus: string[]): Promise<Product[]> {
    return this.productModel.find({ sku: { $in: skus } }).exec();
  }
}
