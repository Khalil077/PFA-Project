import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from "@nestjs/common";
import { ProductsService } from "./products.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { FilesInterceptor } from "@nestjs/platform-express";
import { AuthGuard } from "@nestjs/passport";
import { AdminGuard } from "src/users/admin.guard";

@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(AuthGuard("jwt"), AdminGuard)
  @Post("addproductwithimages")
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  @UseInterceptors(FilesInterceptor("pictures", 5))
  // NestJS uses an interceptor to catch files
  createProductWithimages(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() body: CreateProductDto,
  ) {
    return this.productsService.createWithImages(body, files);
  }

  @Get("getproducts")
  findAll() {
    return this.productsService.findAll();
  }
  @UseGuards(AuthGuard("jwt"))
  @Get("findone/:id")
  findOne(@Param("id", ParseIntPipe) id) {
    return this.productsService.findOne(id);
  }

  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  @UseGuards(AuthGuard("jwt"), AdminGuard)
  @Patch("update/:id")
  update(
    @Param("id", ParseIntPipe) id,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @UseGuards(AuthGuard("jwt"), AdminGuard)
  @Delete("delete/:id")
  remove(@Param("id", ParseIntPipe) id) {
    return this.productsService.softremove(id);
  }
}
