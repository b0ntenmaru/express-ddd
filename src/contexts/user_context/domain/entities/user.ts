export class User {
  private readonly id: number;
  private readonly name: string;
  private readonly email: string;

  constructor(user: any) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
  }
}
