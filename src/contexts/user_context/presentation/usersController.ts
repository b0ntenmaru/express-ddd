import { Request } from 'express';
import { UserIRepository } from '../domain/userIRepository';
import { User } from '../domain/entities/user';

/**
 * /usersリクエストの処理を行うコントローラー
 */
export class UsersController {
  private readonly userRepository: UserIRepository;

  constructor(userRepository: UserIRepository) {
    this.userRepository = userRepository;
  }

  /**
   * 全てのユーザーを取得する
   */
  async findAll(): Promise<User[]> {
    const results = await this.userRepository.findAll();
    return results
  }

  /**
   * ユーザーを作成
   * @param request  
   */
  async createUser(request: Request): Promise<User> {
    const result = await this.userRepository.createUser(request);
    return result;
  }
}
