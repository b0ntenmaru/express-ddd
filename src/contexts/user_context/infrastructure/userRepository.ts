import { Connection } from 'mysql';
import { User } from '../domain/entities/user';
import { UserIRepository } from '../domain/userIRepository';

/**
 * UserのCRUDを実行するRepository
 */
export class UserRepository implements UserIRepository {
  private readonly dbConnecter: Connection;

  constructor(dbConnecter: Connection) {
    this.dbConnecter = dbConnecter;
  }

  /**
   * 全ユーザーを取得する
   */
  public findAll(): Promise<User[]> {
    return new Promise((resolve, reject) => {
      this.dbConnecter.query('select * from users', (error: any, results: any) => {
        if (error) reject(error);

        const users = results.map((result: any) => {
          return this.mapToUser(result);
        });

        resolve(users);
      });
    });
  }

  private mapToUser(userParams: any): User {
    const user = new User(userParams);
    return user;
  }
}
