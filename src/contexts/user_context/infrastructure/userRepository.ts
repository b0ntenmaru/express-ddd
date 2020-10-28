import { Request } from 'express';
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
  
  /**
   * ユーザーを作成する
   * @param request ユーザーが入力した値
   */
  public createUser(request: Request): Promise<User> {
    return new Promise((resolve, reject) => {
      const sql: string = 'INSERT INTO users SET ?';
      this.dbConnecter.query(sql, { name: request.body.name, email: request.body.email}, (error, result) => {
        if (error) reject(error);
        
        console.log(result);
        resolve(result);
      });
    });
  }

  private mapToUser(userParams: any): User {
    const user = new User(userParams);
    return user;
  }
}
