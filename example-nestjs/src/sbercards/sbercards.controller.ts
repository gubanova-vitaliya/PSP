// sbercards.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SbercardsService } from './sbercards.service';
import { CreateSbercardDto } from './dto/create-sbercard.dto';
import { UpdateSbercardDto } from './dto/update-sbercard.dto';
import { Sbercard } from './entities/sbercard.entity';

@Controller('sbercards')
export class SbercardsController {
  constructor(private readonly sbercardsService: SbercardsService) {}

  @Post()
  create(@Body() createSbercardDto: CreateSbercardDto) {
    return this.sbercardsService.create(createSbercardDto);
  }

  @Get()
  findAll(@Query('title') title?: string): Sbercard[] {
    return this.sbercardsService.findAll(title);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sbercardsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSbercardDto: UpdateSbercardDto) {
    return this.sbercardsService.update(+id, updateSbercardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sbercardsService.remove(+id);
  }
}