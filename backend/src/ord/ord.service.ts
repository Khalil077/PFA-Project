import { Injectable } from '@nestjs/common';
import { CreateOrdDto } from './dto/create-ord.dto';
import { UpdateOrdDto } from './dto/update-ord.dto';

@Injectable()
export class OrdService {
  create(createOrdDto: CreateOrdDto) {
    return 'This action adds a new ord';
  }

  findAll() {
    return `This action returns all ord`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ord`;
  }

  update(id: number, updateOrdDto: UpdateOrdDto) {
    return `This action updates a #${id} ord`;
  }

  remove(id: number) {
    return `This action removes a #${id} ord`;
  }
}
