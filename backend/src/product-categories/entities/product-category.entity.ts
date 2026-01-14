import { TimeStamp } from "src/generics/timestamp";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("product_categories")
export class ProductCategoryEntity extends TimeStamp {
  @PrimaryGeneratedColumn()
  id;

  @Column({
    unique: true,
  })
  product_category_name: string;

  @Column({ nullable: true })
  product_category_photo: string;
}
