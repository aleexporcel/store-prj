import { Module } from '@nestjs/common';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { AuthModule } from './auth/auth.module';
import { ClientModule } from './client/client.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/store'),
    // MongooseModule.forRoot('mongodb://mongo:27017/store'),
    MulterModule.register({
      dest: './uploads',
    }),
    OrderModule,
    ProductModule,
    AuthModule,
    ClientModule,
  ],
})
export class AppModule {}
