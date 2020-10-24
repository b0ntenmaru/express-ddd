import { User } from "./entities/user";

export interface UserIRepository {
  findAll(): Promise<User[]>;
}
