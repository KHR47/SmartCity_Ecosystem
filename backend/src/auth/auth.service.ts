import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { Role } from '../common/enums/role.enum';
import { SafeUser } from '../common/types/request-with-user.type';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const existingUser = await this.usersService.findByEmail(registerDto.email);

    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    const user = await this.usersService.create({
      name: registerDto.name,
      email: registerDto.email,
      password: hashedPassword,
      role: registerDto.role || Role.CITIZEN,
      phone: registerDto.phone,
      district: registerDto.district,
    });

    return {
      message: 'User registered successfully',
      user: this.toSafeUser(user),
    };
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      message: 'Login successful',
      accessToken,
      user: this.toSafeUser(user),
    };
  }

  async forgotPassword(email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      // Don't leak whether email exists or not
      return { message: 'If the email exists, a reset link has been sent.', mockToken: null };
    }

    const token = await this.jwtService.signAsync(
      { sub: user.id, purpose: 'reset-password' },
      { expiresIn: '15m' }
    );

    return {
      message: 'If the email exists, a reset link has been sent.',
      mockToken: token, // Sent back for MVP testing purposes
    };
  }

  async resetPassword(token: string, newPassword: string) {
    try {
      const payload = await this.jwtService.verifyAsync(token);
      if (payload.purpose !== 'reset-password') {
        throw new BadRequestException('Invalid token');
      }

      const user = await this.usersService.findById(payload.sub);
      if (!user) throw new BadRequestException('Invalid token');

      await this.usersService.update(user.id, { password: newPassword });

      return { message: 'Password reset successfully' };
    } catch (e) {
      throw new BadRequestException('Invalid or expired token');
    }
  }

  private toSafeUser(user: User): SafeUser {
    const { password, ...safeUser } = user;
    void password;

    return safeUser;
  }
}
