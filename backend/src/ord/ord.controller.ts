import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrdService } from './ord.service';
import { CreateOrdDto } from './dto/create-ord.dto';
import { UpdateOrdDto } from './dto/update-ord.dto';

@Controller('ord')
export class OrdController {
  constructor(private readonly ordService: OrdService) {}

  @Post()
  create(@Body() createOrdDto: CreateOrdDto) {
    return this.ordService.create(createOrdDto);
  }

  @Get()
  findAll() {
    return this.ordService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrdDto: UpdateOrdDto) {
    return this.ordService.update(+id, updateOrdDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordService.remove(+id);
  }
}
