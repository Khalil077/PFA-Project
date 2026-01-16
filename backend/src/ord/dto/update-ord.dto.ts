import { PartialType } from '@nestjs/mapped-types';
import { CreateOrdDto } from './create-ord.dto';

export class UpdateOrdDto extends PartialType(CreateOrdDto) {}
