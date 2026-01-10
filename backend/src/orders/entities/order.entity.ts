import { TimeStamp } from "src/generics/timestamp";
import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Order extends TimeStamp {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  Price: number;
}
