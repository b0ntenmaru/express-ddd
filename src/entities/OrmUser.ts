import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number

  @Column()
  public name: string = ''

  @Column()
  public age: number = 0
}

export default User