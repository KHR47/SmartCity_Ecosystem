import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Division } from './entities/division.entity';
import { District } from './entities/district.entity';
import { Upazila } from './entities/upazila.entity';
import { Thana } from './entities/thana.entity';

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Division)
    private divisionRepository: Repository<Division>,
    @InjectRepository(District)
    private districtRepository: Repository<District>,
    @InjectRepository(Upazila)
    private upazilaRepository: Repository<Upazila>,
    @InjectRepository(Thana)
    private thanaRepository: Repository<Thana>,
  ) {}

  findAllDivisions() {
    return this.divisionRepository.find();
  }

  findDistrictsByDivision(divisionId: number) {
    return this.districtRepository.find({
      where: { division: { id: divisionId } },
    });
  }

  findUpazilasByDistrict(districtId: number) {
    return this.upazilaRepository.find({
      where: { district: { id: districtId } },
    });
  }

  findThanasByUpazila(upazilaId: number) {
    return this.thanaRepository.find({
      where: { upazila: { id: upazilaId } },
    });
  }

  findAllDistricts() {
    return this.districtRepository.find({ relations: ['division'] });
  }

  async createDistrict(data: { name: string; divisionId: number }) {
    const division = await this.divisionRepository.findOne({ where: { id: data.divisionId } });
    if (!division) throw new Error('Division not found');
    const district = this.districtRepository.create({ name: data.name, division });
    return this.districtRepository.save(district);
  }

  async updateDistrict(id: number, data: { name?: string; divisionId?: number }) {
    const district = await this.districtRepository.findOne({ where: { id } });
    if (!district) throw new Error('District not found');
    
    if (data.name) district.name = data.name;
    if (data.divisionId) {
      const division = await this.divisionRepository.findOne({ where: { id: data.divisionId } });
      if (!division) throw new Error('Division not found');
      district.division = division;
    }
    return this.districtRepository.save(district);
  }

  async deleteDistrict(id: number) {
    return this.districtRepository.delete(id);
  }
}
