import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  NotFoundException,
  UseInterceptors,
  UploadedFile,
  ValidationPipe,
  UsePipes,
} from "@nestjs/common";
import { ProductCategoriesService } from "./product-categories.service";
import { CreateProductCategoryDto } from "./dto/create-product-category.dto";
import { UpdateProductCategoryDto } from "./dto/update-product-category.dto";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller("product-categories")
export class ProductCategoriesController {
  constructor(
    private readonly productCategoriesService: ProductCategoriesService,
  ) {}

  @Post("add")
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  @UseInterceptors(FileInterceptor("product_category_photo"))
  async create(
    @Body() createProductCategoryDto: CreateProductCategoryDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      return await this.productCategoriesService.create(
        createProductCategoryDto,
        file,
      );
    } catch (error) {
      console.log("Error creating product category:", error);
    }
  }

  @Get("getall")
  async findAll() {
    try {
      return this.productCategoriesService.findAll();
    } catch (error) {
      console.log("Error fetching product categories:", error);
    }
  }

  @Get("category/:id")
  findOne(@Param("id", ParseIntPipe) id) {
    let res = this.productCategoriesService.findOne(id);
    if (!res) {
      throw new NotFoundException(`Product Category with ID ${id} not found`);
    }
    return res;
  }

  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  @Patch("update/:id")
  @UseInterceptors(FileInterceptor("product_category_photo"))
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() body: UpdateProductCategoryDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    console.log("RAW BODY RECEIVED:", body);
    console.log("FILE RECEIVED:", file?.originalname);

    // Manually extract the DTO fields from form-data
    const updateData: UpdateProductCategoryDto = {
      product_category_name: body.product_category_name,
      // Add other fields from your DTO
    };

    return this.productCategoriesService.update(id, updateData, file);
  }

  @Delete("delete/:id")
  remove(@Param("id", ParseIntPipe) id) {
    return this.productCategoriesService.remove(id);
  }
}
