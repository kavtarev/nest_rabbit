import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUser1677918781513 implements MigrationInterface {
    name = 'CreateUser1677918781513';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'CREATE TABLE "user" ("id" text NOT NULL, "name" text NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))'
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE "user"');
    }
}
