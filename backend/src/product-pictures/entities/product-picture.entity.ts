import { TimeStamp } from "src/generics/timestamp";
import { ProductEntity } from "src/products/entities/product.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('ProductPictures')
export class ProductPictureEntity extends TimeStamp{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;
  @ManyToOne(() => ProductEntity, (Product) => Product.id)
  product: ProductEntity;
}
