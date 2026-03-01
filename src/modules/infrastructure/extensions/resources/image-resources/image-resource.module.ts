import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ImageResourceService } from './image-resource.service';

@Module({
  imports: [ConfigModule],
  providers: [ImageResourceService],
  exports: [ImageResourceService],
})
export class ImageResourceModule {}
