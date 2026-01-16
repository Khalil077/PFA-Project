import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "./users/users.module";
import { ProductsModule } from "./products/products.module";
import { ProductPicturesModule } from "./product-pictures/product-pictures.module";
import { ProductCategoriesModule } from "./product-categories/product-categories.module";
import { OrdersModule } from "./orders/orders.module";
import * as dotenv from "dotenv";
import cloudinary from "cloudinary.config";
import { OrdModule } from "./ord/ord.module";
import { ProductEntity } from "./products/entities/product.entity";
import { OrderEntity } from "./orders/entities/order.entity";
import { UserEntity } from "./users/entities/user.entity";
import { ProductPictureEntity } from "./product-pictures/entities/product-picture.entity";
import { ProductCategoryEntity } from "./product-categories/entities/product-category.entity";
import { join } from "path";

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.APP_HOST,
      port: 3306,
      username: process.env.APP_USERNAME,
      password: process.env.APP_PWD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: false,
    }),
    UsersModule,
    ProductsModule,
    ProductPicturesModule,
    ProductCategoriesModule,
    OrdersModule,
    OrdModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
