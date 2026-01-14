import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateProductCategoryDto } from "./dto/create-product-category.dto";
import { UpdateProductCategoryDto } from "./dto/update-product-category.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductCategoryEntity } from "./entities/product-category.entity";
import { Repository } from "typeorm";
import cloudinary from "cloudinary.config";

@Injectable()
export class ProductCategoriesService {
  constructor(
    @InjectRepository(ProductCategoryEntity)
    private ProductCategoryRep: Repository<ProductCategoryEntity>,
  ) {}

  async create(dto: CreateProductCategoryDto, file: Express.Multer.File) {
    console.log("Uploaded file:", file);

    if (!file) {
      throw new BadRequestException("No file uploaded");
    }

    const uploaded = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "categories" }, (error, result) => {
          if (error) return reject(error);
          resolve(result);
        })
        .end(file.buffer);
    });

    const entity = this.ProductCategoryRep.create({
      ...dto,
      product_category_photo: uploaded.secure_url,
    });

    return this.ProductCategoryRep.save(entity);
  }

  findAll() {
    return this.ProductCategoryRep.find();
  }

  findOne(id: number) {
    return this.ProductCategoryRep.findOneBy({ id });
  }
  async update(
    id: number,
    dto: UpdateProductCategoryDto,
    file?: Express.Multer.File,
  ) {
    console.log("=== UPDATE METHOD ===");
    console.log("Update ID:", id);
    console.log("Update DTO:", dto);
    console.log("File received:", file?.originalname);

    // Find existing category first
    const existingCategory = await this.ProductCategoryRep.findOne({
      where: { id },
    });

    if (!existingCategory) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    // If file is provided, upload it and update the photo
    if (file) {
      console.log("Uploading new file to Cloudinary...");

      // Use the EXACT same upload pattern as create()
      const uploaded = await new Promise<any>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "categories" }, (error, result) => {
            if (error) return reject(error);
            resolve(result);
          })
          .end(file.buffer);
      });

      console.log("New photo URL:", uploaded.secure_url);

      // Optional: Delete old image from Cloudinary
      if (existingCategory.product_category_photo) {
        await this.deleteOldImage(existingCategory.product_category_photo);
      }

      // Update with new photo
      await this.ProductCategoryRep.update(id, {
        ...dto,
        product_category_photo: uploaded.secure_url,
      });
    } else {
      // If no file, just update other fields
      console.log("No file provided, updating other fields only");
      await this.ProductCategoryRep.update(id, dto);
    }

    // Return the updated category
    const updatedCategory = await this.ProductCategoryRep.findOne({
      where: { id },
    });

    console.log("Updated category:", updatedCategory);
    console.log("=== UPDATE COMPLETE ===");

    return updatedCategory;
  }

  // Helper method to delete old image (same pattern as before)
  private async deleteOldImage(url: string): Promise<void> {
    try {
      // Extract public_id from URL
      // Example: https://res.cloudinary.com/dal3ftrvw/image/upload/v1768399590/categories/te30mapxex3kweh993ii.jpg
      const parts = url.split("/");
      const filenameWithExt = parts[parts.length - 1]; // te30mapxex3kweh993ii.jpg
      const filename = filenameWithExt.split(".")[0]; // te30mapxex3kweh993ii
      const folder = parts[parts.length - 2]; // categories

      const publicId = `${folder}/${filename}`;

      console.log(`Deleting old image: ${publicId}`);
      await cloudinary.uploader.destroy(publicId);
    } catch (error) {
      console.warn("Could not delete old image:", error.message);
      // Don't throw - we don't want to fail the update if delete fails
    }
  }

  // Helper method to extract public_id from Cloudinary URL
  private extractPublicIdFromUrl(url: string): string | null {
    if (!url) return null;

    try {
      // Cloudinary URL pattern: .../v1234567890/folder/filename.jpg
      const urlParts = url.split("/");
      const filenameWithExtension = urlParts[urlParts.length - 1];
      const filename = filenameWithExtension.split(".")[0];
      const folder = urlParts[urlParts.length - 2];

      // Return public_id in format: folder/filename
      return `${folder}/${filename}`;
    } catch (error) {
      console.warn("Could not extract public_id from URL:", url);
      return null;
    }
  }

  remove(id: number) {
    return this.ProductCategoryRep.softDelete(id);
  }
}
