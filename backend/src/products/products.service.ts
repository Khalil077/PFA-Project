import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';
import cloudinary from 'cloudinary.config';
@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity) private productRepo: Repository<ProductEntity>,
  ) { }
  create(createProductDto: CreateProductDto) {
    const product = this.productRepo.create(createProductDto);
    return this.productRepo.save(product)
  }

  findAll() {
    return `This action returns all products`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
  async createWithImages(dto, files: Express.Multer.File[]) {
    console.log('Uploaded files:', files);

    const pictures: { url: string }[] = [];

    if (!files || files.length === 0) {
      throw new BadRequestException('No files uploaded');
    }

    for (const file of files) {
      const uploaded = await new Promise<any>((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: 'products' },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          },
        ).end(file.buffer);  //Cloudinary does NOT understand Multer files.
        /*1. Create upload stream
          2. Send file.buffer into stream (.end)
          3. Cloudinary receives bytes
          4. Cloudinary processes image
          5. Cloudinary calls callback with result*/
      });

      pictures.push({ url: uploaded.secure_url });
    }

    const product = this.productRepo.create({
      ...dto,
      pictures,
    });

    return this.productRepo.save(product);
  }
}
