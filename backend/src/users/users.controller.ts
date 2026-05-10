import {
  Body,
  BadRequestException,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { Role } from '../common/enums/role.enum';
import type { RequestWithUser } from '../common/types/request-with-user.type';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Roles(Role.ADMIN)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createByAdmin(createUserDto);
  }

  @Roles(Role.ADMIN, Role.AUTHORITY)
  @Get('officers')
  findOfficers() {
    return this.usersService.findOfficers();
  }

  @Roles(Role.ADMIN)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Roles(Role.ADMIN)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findOneForAdmin(id);
  }

  @Patch('me')
  updateProfile(
    @Request() req: RequestWithUser,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    // Only allow updating safe fields
    const safeUpdateDto: UpdateUserDto = {
      name: updateUserDto.name,
      password: updateUserDto.password,
      phone: updateUserDto.phone,
      district: updateUserDto.district,
    };
    return this.usersService.update(req.user.id, safeUpdateDto);
  }

  @Roles(Role.ADMIN)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  deactivate(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: RequestWithUser,
  ) {
    if (req.user.id === id) {
      throw new BadRequestException(
        'You cannot deactivate your own admin account',
      );
    }

    return this.usersService.deactivate(id);
  }
}
