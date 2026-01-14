import { IsNotEmpty, IsString } from "class-validator";

export class CreateProductCategoryDto {
  @IsString()
  @IsNotEmpty()
  product_category_name: string;
}
