import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCheckPassed1677920812623 implements MigrationInterface {
    name = 'AddCheckPassed1677920812623';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "public"."user" ADD "checkPassed" boolean NOT NULL');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "public"."user" DROP COLUMN "checkPassed"');
    }
}
