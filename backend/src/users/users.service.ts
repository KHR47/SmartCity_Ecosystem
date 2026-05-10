import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Not, Repository } from 'typeorm';
import { Role } from '../common/enums/role.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  create(userData: Partial<User>) {
    const user = this.usersRepository.create(userData);
    return this.usersRepository.save(user);
  }

  async createByAdmin(createUserDto: CreateUserDto) {
    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    const password = await bcrypt.hash(createUserDto.password, 10);
    const user = this.usersRepository.create({
      ...createUserDto,
      password,
    });

    const savedUser = await this.usersRepository.save(user);
    return this.toSafeUser(savedUser);
  }

  findByEmail(email: string) {
    return this.usersRepository.findOne({
      where: { email, isActive: true },
    });
  }

  findById(id: number) {
    return this.usersRepository.findOne({
      where: { id, isActive: true },
    });
  }

  async findOneForAdmin(id: number) {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.toSafeUser(user);
  }

  async findAll() {
    const users = await this.usersRepository.find({
      order: {
        id: 'ASC',
      },
    });

    return users.map((user) => this.toSafeUser(user));
  }

  async findOfficers() {
    const users = await this.usersRepository.find({
      where: {
        role: Role.OFFICER,
        isActive: true,
      },
      order: {
        id: 'ASC',
      },
    });

    return users.map((user) => this.toSafeUser(user));
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingUser = await this.usersRepository.findOne({
        where: {
          email: updateUserDto.email,
          id: Not(id),
        },
      });

      if (existingUser) {
        throw new BadRequestException('Email already exists');
      }
    }

    if (updateUserDto.password) {
      user.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    user.name = updateUserDto.name ?? user.name;
    user.email = updateUserDto.email ?? user.email;
    user.role = updateUserDto.role ?? user.role;
    user.badgeNumber =
      updateUserDto.badgeNumber === undefined
        ? user.badgeNumber
        : updateUserDto.badgeNumber || null;
    user.zoneId =
      updateUserDto.zoneId === undefined ? user.zoneId : updateUserDto.zoneId;
    user.phone =
      updateUserDto.phone === undefined
        ? user.phone
        : updateUserDto.phone || null;
    user.district =
      updateUserDto.district === undefined
        ? user.district
        : updateUserDto.district || null;
    user.isActive = updateUserDto.isActive ?? user.isActive;

    const savedUser = await this.usersRepository.save(user);
    return this.toSafeUser(savedUser);
  }

  async deactivate(id: number) {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.isActive = false;
    const savedUser = await this.usersRepository.save(user);

    return {
      message: 'User deactivated successfully',
      user: this.toSafeUser(savedUser),
    };
  }

  private toSafeUser(user: User) {
    const { password, ...safeUser } = user;
    void password;

    return safeUser;
  }
}
