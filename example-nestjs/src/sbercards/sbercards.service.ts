// sbercards.service.ts
import { Injectable } from '@nestjs/common';
import { CreateSbercardDto } from './dto/create-sbercard.dto';
import { UpdateSbercardDto } from './dto/update-sbercard.dto';
import { FileService } from 'src/file.service';
import { Sbercard } from './entities/sbercard.entity';

@Injectable()
export class SbercardsService {
  constructor(private fileService: FileService<Sbercard[]>) {}

  findAll(title?: string): Sbercard[] {
    const sbercards = this.fileService.read();

    return title
      ? sbercards.filter((sbercard) =>
          sbercard.title.toLowerCase().includes(title.toLowerCase()),
        )
      : sbercards;
  }

  create(createSbercardDto: CreateSbercardDto) {
    const sbercards = this.fileService.read();
    const sbercard = { ...createSbercardDto, id: sbercards.length + 1 };
    this.fileService.add(sbercard);
  }

  findOne(id: number): Sbercard | null {
    const sbercards = this.fileService.read();
    return sbercards.find((sbercard) => sbercard.id === id) ?? null;
  }

  update(id: number, updateSbercardDto: UpdateSbercardDto): void {
    const sbercards = this.fileService.read();
    const updatedSbercards = sbercards.map((sbercard) =>
      sbercard.id === id ? { ...sbercard, ...updateSbercardDto } : sbercard,
    );
    this.fileService.write(updatedSbercards);
  }


  remove(id: number): void {
    const filteredSbercards = this.fileService
      .read()
      .filter((sbercard) => sbercard.id !== id);
    this.fileService.write(filteredSbercards);
  }
}