import { Module } from "@nestjs/common";
import { OrdService } from "./ord.service";
import { OrdController } from "./ord.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrdEntity } from "./entities/ord.entity";

@Module({
  imports: [TypeOrmModule.forFeature([OrdEntity])],
  controllers: [OrdController],
  providers: [OrdService],
})
export class OrdModule {}
