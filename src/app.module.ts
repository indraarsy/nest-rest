import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './products/product.module';

@Module({
  imports: [ProductModule, MongooseModule.forRoot('mongodb+srv://indraarsy:pyzym2BhmALsQmLh@cluster0.rrmqh.mongodb.net/nest-rest?retryWrites=true&w=majority')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
