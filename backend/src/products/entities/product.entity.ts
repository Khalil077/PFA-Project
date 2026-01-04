import { TimeStamp } from "src/generics/timestamp";
import { ProductPictureEntity } from "src/product-pictures/entities/product-picture.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('products')
export class ProductEntity extends TimeStamp {
  @PrimaryGeneratedColumn()
  id;
  @Column({

  })
  name: string;
  @Column({
    type: 'varchar',
    length: 100,
  })
  designation;
  @Column({ type: 'varchar', length: 20 })
  prix: string;
  @Column()
  solde: boolean;

  @Column()
  stock: number;
  
  @ManyToOne(() => UserEntity, (user) => user.id)
  user: UserEntity;

  @OneToMany(() => ProductPictureEntity, (picture) => picture.product, { cascade: true })
  pictures: ProductPictureEntity[];



 
}