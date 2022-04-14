import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule,
    // MulterModule.register({
    //   dest: 'static/images/',
    //   storage: {
    //     filename(req, file, cb) {
    //       console.log(file);
    //       return Date.now();
    //     },
    //   },
    // }),
  ],
  controllers: [ImagesController],
  providers: [ImagesService],
})
export class ImagesModule {}
