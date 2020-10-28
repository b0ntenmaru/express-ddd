import { Request } from 'express';
import { Connection } from 'mysql';
import { User } from '../domain/entities/user';
import { UserIRepository } from '../domain/userIRepository';
import Orm from '../../../entities/User';
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
  public async findAll(): Promise<User[]> {
    const users = await Orm.User.find();

    const results = users.map((user) => {
      return this.mapToUser(user);
    });

    return results;
  }

  /**
   * ユーザーを作成する
   * @param request ユーザーが入力した値
   */
  public createUser(request: Request): Promise<User> {
    return new Promise((resolve, reject) => {
      const sql: string = 'INSERT INTO users SET ?';
      this.dbConnecter.query(sql, { name: request.body.name, email: request.body.email }, (error, result) => {
        if (error) reject(error);

        console.log(result);
        resolve(result);
      });
    });
  }

  /**
   * DBに保存されたレコートをドメインオブジェクトに変換する
   * @param ormUser DB内に保存されたUserオブジェクト
   */
  private mapToUser(ormUser: any): User {
    const user = new User(ormUser);
    return user;
  }
}
