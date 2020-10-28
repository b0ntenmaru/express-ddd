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
  public async createUser(request: Request): Promise<void> {
    const user = new User({ name: request.body.name, email: request.body.email });
    const ormUser = new Orm.User();
    ormUser.name = user.name;
    ormUser.email = user.email;
    await Orm.User.save(ormUser);
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
