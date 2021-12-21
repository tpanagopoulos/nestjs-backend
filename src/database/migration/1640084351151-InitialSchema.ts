import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialSchema1640084351151 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        CREATE TABLE user (
          id int(11) NOT NULL AUTO_INCREMENT,
          name varchar(100) NOT NULL,
          surname varchar(500) NOT NULL,
          PRIMARY KEY (id)
        ) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
        `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE user ;`);

    }

}
