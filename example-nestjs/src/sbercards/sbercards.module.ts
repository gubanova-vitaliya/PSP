// sbercards.module.ts
import { Module } from '@nestjs/common';
import { SbercardsService } from './sbercards.service';
import { SbercardsController } from './sbercards.controller';
import { FileAccessor, FileService } from 'src/file.service';
import { Sbercard } from './entities/sbercard.entity';

@Module({
  controllers: [SbercardsController],
  providers: [
    SbercardsService,
    {
      provide: FileService,
      useFactory: (sbercards: SbercardsModule) =>
        new FileService<Sbercard[]>(sbercards.filePath),
      inject: [SbercardsModule],
    },
  ],
})
export class SbercardsModule implements FileAccessor {
  public readonly filePath = 'assets/sbercards.json';
}