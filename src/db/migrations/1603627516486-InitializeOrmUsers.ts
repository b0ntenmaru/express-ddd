import {MigrationInterface, QueryRunner} from "typeorm";

export class InitializeOrmUsers1603627516486 implements MigrationInterface {
    name = 'InitializeOrmUsers1603627516486'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `orm_users` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `age` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `orm_users`");
    }

}
