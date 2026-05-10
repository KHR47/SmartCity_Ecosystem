import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { CreateZoneDto } from './dto/create-zone.dto';
import { UpdateZoneDto } from './dto/update-zone.dto';
import { Zone } from './entities/zone.entity';

@Injectable()
export class ZonesService {
  constructor(
    @InjectRepository(Zone)
    private readonly zonesRepository: Repository<Zone>,
  ) {}

  async create(createZoneDto: CreateZoneDto) {
    await this.ensureUniqueName(createZoneDto.name);

    const zone = this.zonesRepository.create(createZoneDto);
    return this.zonesRepository.save(zone);
  }

  findAll() {
    return this.zonesRepository.find({
      order: {
        id: 'ASC',
      },
    });
  }

  async findOne(id: number) {
    const zone = await this.zonesRepository.findOne({
      where: { id },
    });

    if (!zone) {
      throw new NotFoundException('Zone not found');
    }

    return zone;
  }

  async update(id: number, updateZoneDto: UpdateZoneDto) {
    const zone = await this.findOne(id);

    if (updateZoneDto.name && updateZoneDto.name !== zone.name) {
      await this.ensureUniqueName(updateZoneDto.name, id);
    }

    Object.assign(zone, updateZoneDto);
    return this.zonesRepository.save(zone);
  }

  async remove(id: number) {
    const zone = await this.findOne(id);
    await this.zonesRepository.remove(zone);

    return { message: 'Zone deleted successfully' };
  }

  private async ensureUniqueName(name: string, excludeId?: number) {
    const existingZone = await this.zonesRepository.findOne({
      where: {
        name,
        ...(excludeId ? { id: Not(excludeId) } : {}),
      },
    });

    if (existingZone) {
      throw new ConflictException('Zone name already exists');
    }
  }
}
