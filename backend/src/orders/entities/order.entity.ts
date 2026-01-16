import { TimeStamp } from "src/generics/timestamp";
import { ProductEntity } from "src/products/entities/product.entity";
import { UserEntity } from "src/users/entities/user.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
@Entity("orders")
export class OrderEntity extends TimeStamp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: true })
  order_status: boolean;

  @ManyToOne(() => UserEntity, { eager: true })
  @JoinColumn({ name: "customer_id" })
  user: UserEntity;

  @ManyToOne(() => ProductEntity, { eager: true })
  @JoinColumn({ name: "product_id" })
  product: ProductEntity;
}
