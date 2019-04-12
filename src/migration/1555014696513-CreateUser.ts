import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateUser1555014696513 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> 
    {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> 
    {
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`);
    }

}
