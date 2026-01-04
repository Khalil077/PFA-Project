import { RoleEnum } from "src/generics/role.enum";
import { TimeStamp } from "src/generics/timestamp";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class UserEntity extends TimeStamp {
  @PrimaryGeneratedColumn()
  id;
  @Column({
  unique: true,
  })
  email: string;
  @Column({
    type: 'varchar',
    length: 50,
  })
  firstName;
    @Column({
    type: 'varchar',
    length: 50,
  })
  lastName;
  @Column({ type: 'varchar', length: 20 })
  phone: string;
  @Column()
  salt: string;
  @Column()
  password: string;
  @Column({
    type: 'enum',
    enum: RoleEnum,//ykhalik matnajm takhtar kn wahda ml caset li 7athom
    // default : RoleEnum.ROLE_USER

  })
  role;
 
}
