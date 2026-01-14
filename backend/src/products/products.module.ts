import { Module } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductsController } from "./products.controller";
import { ProductEntity } from "./entities/product.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductCategoryEntity } from "src/product-categories/entities/product-category.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity, ProductCategoryEntity])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
