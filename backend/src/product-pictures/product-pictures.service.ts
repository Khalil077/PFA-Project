import { Injectable } from '@nestjs/common';
import { CreateProductPictureDto } from './dto/create-product-picture.dto';
import { UpdateProductPictureDto } from './dto/update-product-picture.dto';

@Injectable()
export class ProductPicturesService {

  create(createProductPictureDto) {
    return 'This action adds a new productPicture';
  }

  findAll() {
    return `This action returns all productPictures`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productPicture`;
  }

  update(id: number, updateProductPictureDto) {
    return `This action updates a #${id} productPicture`;
  }

  remove(id: number) {
    return `This action removes a #${id} productPicture`;
  }
}
