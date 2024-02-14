import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/createOrder.dto';
import { UpdateOrderDto } from './dto/updateOrder.dto';
import { ProductService } from 'src/product/product.service';
import { Order } from 'src/order/schemas/order.schema';
import { ProductList } from './dto/productList.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
    private readonly productService: ProductService,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    await this.validateProductSkusExist(createOrderDto.productList);

    const newOrder = new this.orderModel(createOrderDto);
    return newOrder.save();
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    return this.orderModel.findByIdAndUpdate(id, updateOrderDto);
  }

  async findAll() {
    return await this.orderModel.find();
  }

  async getTotalSoldLastMonth(): Promise<number> {
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 1);

    const endDate = new Date();

    const totalSold = await this.orderModel
      .aggregate([
        {
          $match: {
            createdAt: {
              $gte: startDate,
              $lte: endDate,
            },
          },
        },
        {
          $group: {
            _id: null,
            total: {
              $sum: '$total',
            },
          },
        },
      ])
      .exec();

    return totalSold.length > 0 ? totalSold[0].total : 0;
  }

  async getOrderWithMaxTotal(): Promise<Order | null> {
    const orderWithMaxTotal = await this.orderModel
      .findOne()
      .sort({ total: -1 })
      .exec();

    if (!orderWithMaxTotal) {
      return null;
    }
    const completeOrder = await this.orderModel
      .findById(orderWithMaxTotal.id)
      .exec();
    return completeOrder;
  }

  private async validateProductSkusExist(
    productList: ProductList[],
  ): Promise<void> {
    const skusToCheck = productList.map((product) => product.sku);
    const existingProducts =
      await this.productService.findProductsBySkus(skusToCheck);

    const missingSkus = skusToCheck.filter(
      (sku) => !existingProducts.find((product) => product.sku === sku),
    );

    if (missingSkus.length > 0) {
      throw new NotFoundException(
        `Los siguientes SKU no existen: ${missingSkus.join(', ')}`,
      );
    }
  }
}
