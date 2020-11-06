export class User {
  public readonly id: number;
  public readonly name: string;
  public readonly email: string;

  constructor(user: any) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
  }
}
