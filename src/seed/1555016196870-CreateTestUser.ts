import { MigrationInterface, QueryRunner } from "typeorm";
import { User } from '../entity/User';

export class CreateTestUser1555016196870 implements MigrationInterface 
{
    private getTestUser(): User
    {
        let user = new User();
        user.email = "user@test.com";
        user.password = "password";
        user.hashPassword();

        return user;
    }

    public async up(queryRunner: QueryRunner): Promise<any> 
    {
        const userRepository = queryRunner.connection.getRepository(User);
        await userRepository.save(this.getTestUser());
    }

    public async down(queryRunner: QueryRunner): Promise<any> 
    {
        const userRepository = queryRunner.connection.getRepository(User);
        await userRepository.delete(this.getTestUser());
    }
}
