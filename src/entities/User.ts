import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
namespace Orm {
  @Entity('users')
  export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string = '';

    @Column()
    public email: string = '';
  }
}

export default Orm;
