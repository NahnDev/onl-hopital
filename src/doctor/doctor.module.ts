import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { Doctor, DoctorSchema } from './schemas/doctor.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { WorkingService } from './working.service';
import { Working, WorkingSchema } from './schemas/woking.schema';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Doctor.name,
        useFactory: () => {
          const schema = DoctorSchema;

          // eslint-disable-next-line @typescript-eslint/no-var-requires
          schema.plugin(require('mongoose-autopopulate'));
          return schema;
        },
      },
      {
        name: Working.name,
        useFactory: () => {
          return WorkingSchema;
        },
      },
    ]),
  ],
  controllers: [DoctorController],
  providers: [DoctorService, WorkingService],
  exports: [WorkingService],
})
export class DoctorModule {}
