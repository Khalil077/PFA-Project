import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreateProductDto {
  @IsNotEmpty()
  product_name: string;

  @IsNotEmpty()
  product_description: string;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  prix: number;

  @Type(() => Number)
  @IsNumber()
  @Min(0)
  stock: number;

  @IsString()
  @IsNotEmpty()
  category_id: number;
}
