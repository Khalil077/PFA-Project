import { TimeStamp } from "src/generics/timestamp";
import { ProductEntity } from "src/products/entities/product.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("ProductPictures")
export class ProductPictureEntity extends TimeStamp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;
  @ManyToOne(() => ProductEntity, (Product) => Product.id)
  @JoinColumn({ name: "product_id" })
  product: ProductEntity;
}
