import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1677919599044 implements MigrationInterface {
    name = 'Init1677919599044';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'CREATE TABLE "check_users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" text NOT NULL, CONSTRAINT "PK_cefde39b4fdadb724416e7682da" PRIMARY KEY ("id"))'
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE "check_users"');
    }
}
