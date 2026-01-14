import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("product_categories")
export class ProductCategory {
  @PrimaryGeneratedColumn()
  id;

  @Column()
  product_category_name: string;

  @Column()
  product_category_photo: string;
}
