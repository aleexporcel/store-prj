import {
  Controller,
  Post,
  Body,
  Param,
  NotFoundException,
  Put,
  Get,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/createOrder.dto';
import { UpdateOrderDto } from './dto/updateOrder.dto';
import { Order } from 'src/order/schemas/order.schema';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    return await this.orderService.create(createOrderDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateOrderDto: UpdateOrderDto,
  ) {
    const order = await this.orderService
      .update(id, updateOrderDto)
      .catch((err) => {
        if (!order) {
          throw new NotFoundException(
            `order with id: ${id} not found, can't update`,
          );
        }
        throw err;
      });
    return order;
  }

  @Get()
  async findAll() {
    return await this.orderService.findAll();
  }

  @Get('/lastmonthtotal')
  async getTotalSoldLastMonth(): Promise<{ totalSold: number }> {
    const totalSold = await this.orderService.getTotalSoldLastMonth();
    return { totalSold };
  }

  @Get('/ordermaxtotal')
  async getOrderWithMaxTotal(): Promise<{ order: Partial<Order> | null }> {
    const order = await this.orderService.getOrderWithMaxTotal();
    return { order };
  }
}
