// update-sbercard.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateSbercardDto } from './create-sbercard.dto';

export class UpdateSbercardDto extends PartialType(CreateSbercardDto) {}