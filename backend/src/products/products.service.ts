import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductEntity } from "./entities/product.entity";
import { Repository } from "typeorm";
import cloudinary from "cloudinary.config";
@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private productRepo: Repository<ProductEntity>,
  ) {}
  create(dto: CreateProductDto) {
    const product = this.productRepo.create(dto);
    return this.productRepo.save(product);
  }

  async findAll() {
    return await this.productRepo.find();
  }

  async findOne(id) {
    return await this.productRepo.findOne({ where: { id } });
  }

  async update(id, updateProductDto) {
    let product = await this.productRepo.preload({
      id: id,
      ...updateProductDto,
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return this.productRepo.save(product);
  }

  async softremove(id: number) {
    let product = await this.productRepo.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return this.productRepo.softRemove(product);
  }
  async createWithImages(dto, files: Express.Multer.File[]) {
    console.log("Uploaded files:", files);

    const pictures: { url: string }[] = [];

    if (!files || files.length === 0) {
      throw new BadRequestException("No files uploaded");
    }

    for (const file of files) {
      const uploaded = await new Promise<any>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "products" }, (error, result) => {
            if (error) return reject(error);
            resolve(result);
          })
          .end(file.buffer); //Cloudinary does NOT understand Multer files.
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
