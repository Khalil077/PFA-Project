import { Module } from "@nestjs/common";
import { ProductCategoriesService } from "./product-categories.service";
import { ProductCategoriesController } from "./product-categories.controller";
import { ProductCategoryEntity } from "./entities/product-category.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([ProductCategoryEntity])],
  controllers: [ProductCategoriesController],
  providers: [ProductCategoriesService],
})
export class ProductCategoriesModule {}
