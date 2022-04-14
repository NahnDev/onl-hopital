import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Service, ServiceDoc } from './schemas/service.schema';

@Injectable()
export class ServiceService {
  constructor(
    @InjectModel(Service.name) private readonly serviceModel: Model<ServiceDoc>,
  ) {}

  async create(createServiceDto: CreateServiceDto) {
    const serviceDoc = new this.serviceModel(createServiceDto);
    await serviceDoc.save();
    return serviceDoc.toJSON();
  }

  async findAll() {
    return (await this.serviceModel.find({})).map((el) => el.toJSON());
  }

  async findOne(_id: string) {
    const serviceDoc = await this.serviceModel.findById(_id);
    if (serviceDoc) return serviceDoc.toJSON();
    return null;
  }

  async update(_id: string, updateServiceDto: UpdateServiceDto) {
    await this.serviceModel.updateOne({ _id }, updateServiceDto);
    return this.findOne(_id);
  }

  async remove(_id: string) {
    this.serviceModel.deleteOne({ _id });
  }
}
