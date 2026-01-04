import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductPicturesService } from './product-pictures.service';
import { CreateProductPictureDto } from './dto/create-product-picture.dto';
import { UpdateProductPictureDto } from './dto/update-product-picture.dto';

@Controller('product-pictures')
export class ProductPicturesController {
  constructor(private readonly productPicturesService: ProductPicturesService) {}

  @Post()
  create(@Body() createProductPictureDto: CreateProductPictureDto) {
    return this.productPicturesService.create(createProductPictureDto);
  }

  @Get()
  findAll() {
    return this.productPicturesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productPicturesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductPictureDto: UpdateProductPictureDto) {
    return this.productPicturesService.update(+id, updateProductPictureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productPicturesService.remove(+id);
  }
}
