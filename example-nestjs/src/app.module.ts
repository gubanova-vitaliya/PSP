// app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SbercardsModule } from './sbercards/sbercards.module';

@Module({
  imports: [SbercardsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}