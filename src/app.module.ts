import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { DoctorModule } from './doctor/doctor.module';
import { AppointmentModule } from './appointment/appointment.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './configuration/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { HistoryModule } from './history/history.module';
import { AuthModule } from './auth/auth.module';
import { ImagesModule } from './images/images.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ServiceModule } from './service/service.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const uri = config.get<string>('database.uri');
        return { uri };
      },
    }),
    ServeStaticModule.forRoot({ rootPath: 'static', renderPath: 'static' }),
    UserModule,
    ProfileModule,
    DoctorModule,
    AppointmentModule,
    HistoryModule,
    AuthModule,
    ImagesModule,
    ServiceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
