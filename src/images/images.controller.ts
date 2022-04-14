import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { Response } from 'express';
import { ApiFile } from 'src/decorators/api-file.decorator';
import { PublicApi } from 'src/decorators/public-api.decorator';
import { ImagesService } from './images.service';
import * as fs from 'fs';
import * as path from 'path';

@Controller('images')
@PublicApi()
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiFile('file')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 1024 * 1024 * 1024 },
      dest: 'static',
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const ext = file.originalname.match(/.\w+$/)[0];
    const fileName = Date.now().toString();
    const fileUri = fileName + ext;
    const filePath = path.join(file.destination, fileName + ext);
    fs.rename(file.path, filePath, () => {});
    return { path: fileName, uri: fileUri, _id: fileName };
  }
}
