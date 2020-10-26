import { User } from "./entities/user";
import { Request } from 'express';

export interface UserIRepository {
  findAll(): Promise<User[]>;
  createUser(request: Request): Promise<User>;
}
