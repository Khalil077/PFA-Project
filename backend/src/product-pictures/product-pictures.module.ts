import { Module } from '@nestjs/common';
import { ProductPicturesService } from './product-pictures.service';
import { ProductPicturesController } from './product-pictures.controller';
import { ProductPictureEntity } from './entities/product-picture.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([ProductPictureEntity])], 
  controllers: [ProductPicturesController],
  providers: [ProductPicturesService],
})
export class ProductPicturesModule {}
