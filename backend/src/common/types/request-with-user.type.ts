import { Request } from 'express';
import { User } from '../../users/entities/user.entity';

export type SafeUser = Omit<User, 'password'>;

export type RequestWithUser = Request & {
  user: SafeUser;
};
