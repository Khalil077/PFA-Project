import { TimeStamp } from "src/generics/timestamp";
import { ProductCategoryEntity } from "src/product-categories/entities/product-category.entity";
import { ProductPictureEntity } from "src/product-pictures/entities/product-picture.entity";
import { UserEntity } from "src/users/entities/user.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("products")
export class ProductEntity extends TimeStamp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product_name: string;

  @Column({
    type: "varchar",
    length: 100,
  })
  product_description: string;

  @Column("decimal")
  prix: number;

  @Column({ default: false })
  solde: boolean;

  @Column()
  stock: number;

  @ManyToOne(() => UserEntity, (user) => user.id)
  user: UserEntity;

  @OneToMany(() => ProductPictureEntity, (picture) => picture.product, {
    cascade: true,
    eager: true,
  })
  pictures: ProductPictureEntity[];

  @ManyToOne(() => ProductCategoryEntity, { eager: true })
  @JoinColumn({ name: "category_id" }) // this will store category ID
  category: ProductCategoryEntity;
}
