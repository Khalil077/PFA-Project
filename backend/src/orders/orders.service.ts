import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { OrderEntity } from "./entities/order.entity";
import { ProductEntity } from "src/products/entities/product.entity";
import { UserEntity } from "src/users/entities/user.entity";

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderEntity)
    private Orderrep: Repository<OrderEntity>,
    @InjectRepository(ProductEntity)
    private Productrep: Repository<ProductEntity>,
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
  ) {}
  async CreateOrder(order, userId: number) {
    const product0 = await this.Productrep.findOneBy({ id: order.productId });

    if (!product0) {
      throw new BadRequestException("Product not found");
    }
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (!user) throw new BadRequestException("User not found");
    const dto = this.Orderrep.create({
      order_status: true,
      product: order.productId,
      user,
    });
    return this.Orderrep.save(dto);
  }
  async findAll(userId: number) {
    // Find all orders for this user
    return this.Orderrep.find({
      where: { user: { id: userId } },
      relations: ["product"], // include product details
      order: { createdAt: "DESC" },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
